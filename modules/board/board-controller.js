import { boardEvents } from './board-constants.js';

export default class BoardController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.events.subscribe(boardEvents.MOVE_TILE, moveTile, this);
  }
}

/**
 * Moves the tile element to its latest coordinates.
 * @param {number} value - The value of the tile to move.
 */
function moveTile(value) {
  const tileModel = this.model.tiles.find((tile) => tile.value === value);
  const blankTileModel = this.model.tiles.find((tile) => tile.value === 0);

  // Check if the tile is adjacent to the blank tile.
  if ((tileModel.row === blankTileModel.row // Same row.
      && (tileModel.column === blankTileModel.column - 1 // Blank tile on the right.
        || tileModel.column === blankTileModel.column + 1)) // On the left.
    || (tileModel.column === blankTileModel.column // Same column.
      && (tileModel.row === blankTileModel.row - 1 // On top.
        || tileModel.row === blankTileModel.row + 1))) { // Down below.
    // If it is, switch coordinates and move the tiles.
    [tileModel.row, blankTileModel.row] = [blankTileModel.row, tileModel.row];
    [tileModel.column, blankTileModel.column] = [blankTileModel.column, tileModel.column];
    this.view.moveTile(value);
    this.view.moveTile(0);

    if (this.model.isSolved()) {
      this.view.finishGame();
    }
  } else {
    console.log(`Can't move the tile yo.`);
  }
}
