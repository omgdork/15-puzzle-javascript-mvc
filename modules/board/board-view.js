import TileView from '../tile/tile-view';

export default class BoardView {
  constructor(model) {
    this.model = model;
    this.element = generateElement(model);
  }
}

/**
 * Generates the board element.
 * @param {number} rows - The number of rows the board has.
 * @param {number} columns - The number of columns the board has.
 * @param {number} tileWidth - The width (and height) of a tile.
 * @param {[TileModel]} tiles - The board's array of TileModels.
 * @returns {HTMLElement} The board element.
 */
function generateElement({ rows, columns, tileWidth, tiles }) {
  const element = document.createElement('div');
  const range = document.createRange();
  const template = `
    <div class="board" style="height: ${tileWidth * rows}px; width: ${tileWidth * columns}px;"></div>
    <p class="message"></p>
  `;
  const frag = range.createContextualFragment(template);
  const board = frag.querySelector('.board');

  //board.addEventListener('click', this.clickHandler);
  element.classList.add('board-container');
  tiles.forEach((tile) => board.appendChild(new TileView(tile)).element);
  
  element.appendChild(frag);

  return element;
}
