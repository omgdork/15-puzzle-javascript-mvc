import TileView from '../tile/tile-view.js';
import { boardEvents } from './board-constants.js';

export default class BoardView {
  constructor(model) {
    this.model = model;
    this.tiles = [];
    this.clickHandler = clickHandler.bind(this);
    this.element = generateElement.call(this);
    this.finishGame = finishGame.bind(this);
    this.moveTile = moveTile.bind(this);
  }
}

/**
 * Generates the board element.
 * @returns {HTMLElement} The board element.
 */
function generateElement() {
  const { rows, columns, tileWidth, tiles } = this.model;
  const element = document.createElement('div');
  const range = document.createRange();
  const template = `
    <div class="board" style="height: ${tileWidth * rows}px; width: ${tileWidth * columns}px;"></div>
    <p class="message"></p>
  `;
  const frag = range.createContextualFragment(template);
  const board = frag.querySelector('.board');

  board.addEventListener('click', this.clickHandler);
  element.classList.add('board-container');
  tiles.forEach((tile) => {
    const tileView = new TileView(tile);

    this.tiles.push(tileView);
    board.appendChild(tileView.element);
  });
  element.appendChild(frag);

  return element;
}

/**
 * Moves a tile if possible.
 * @param {EventObject} e - The event object.
 */
function clickHandler(e) {
  const target = e.target;

  if (target.classList.contains('tile')) {
    const value = parseInt(target.dataset.value, 10);

    if (!value) {
      return;
    }

    this.model.events.publish(boardEvents.MOVE_TILE, value);
  }
}

/**
 * Shows a message and prevents the user from moving tiles
 * when the board is solved.
 */
function finishGame() {
  if (this.model.isSolved()) {
    const message = this.element.querySelector('.message');
    message.innerText = 'Yazzzzz!';
    message.classList.add('shown');

    const board = this.element.querySelector('.board');
    board.removeEventListener('click', this.clickHandler);
    board.classList.add('solved');
  }
}

/**
 * Moves the tile.
 * @param {number} value - The tile value.
 */
function moveTile(value) {
  this.tiles.find((tile) => tile.model.value === value).move();
}
