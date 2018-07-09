import Utilities from '../../utilities/utilities.js';
import TileModel from '../tile/tile-model.js';

export default class BoardModel {
  constructor({ columns, rows, tileWidth }) {
    this.columns = columns;
    this.rows = rows;
    this.tileWidth = tileWidth;
    this.tiles = getTiles(columns, rows, tileWidth);
  }

  get(prop) {
    return this[prop];
  }

  set(prop, value) {
    this[prop] = value;
  }
}

/**
 * Gets the shuffled tiles.
 * @param {number} columns - The number of columns the board has.
 * @param {number} rows - The number of rows the board has.
 * @param {number} tileWidth - The width (and height) of a tile.
 * @returns {[TileModel]} An array of TileModels.
 */
function getTiles(columns, rows, tileWidth) {
  const tileCount = columns * rows;
  let currentRow = 0;
  let currentColumn = 0;
  let tileOrder = Array.from({ length: tileCount }, (v, k) => k + 1); // Array starting from 1 to n.

  do {
    tileOrder = Utilities.shuffle(tileOrder);
  } while (!isSolvable(tileOrder, columns, rows));

  return tileOrder.map((v, i, arr) => {
    // The highest value is the blank tile.
    const tile = new TileModel({
      value: v === arr.length ? 0 : v,
      row: currentRow,
      column: currentColumn,
      width: tileWidth,
    });

    // Set the row and column indices for the next tile.
    if (currentColumn === columns - 1) {
      currentRow++;
      currentColumn = 0;
    } else {
      currentColumn++;
    }

    return tile;
  });
}

// From https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
/**
 * Checks if the given tile order is solvable.
 * @param {[number]} tileOrder - An array consisting of shuffled numbers.
 * @param {number} columns - The number of columns the puzzle has.
 * @param {number} rows - The number of rows the puzzle has.
 * @returns {boolean} Boolean value indicating if the shuffled array is solvable or not.
 */
function isSolvable(tileOrder, columns, rows) {
  const blankTileRowNumberFromBottom = rows - Math.floor(tileOrder.indexOf(tileOrder.length) / rows); // "...row counting from the bottom (last, third-last, fifth-last etc)"
  let inversions = 0;

  // "An inversion is when a tile precedes another tile with a lower number on it. The
  // solution state has zero inversions. ...an inversion is a pair of tiles (a, b) such
  // that a appears before b, but a > b"
  tileOrder.forEach((num, i, arr) => {
    if (num < arr.length && i + 1 < arr.length) {
      const succeedingNumbers = arr.slice(i + 1);

      succeedingNumbers.forEach((succeeding) => {
        if (succeeding > 0 && succeeding < num) {
          inversions++;
        }
      })
    }
  });

  // Don't present a solved state.
  if (inversions === 0) {
    return false;
  }

  // "The formula says:
  // a. If the grid width is odd, then the number of inversions in a solvable situation is even.
  if (columns % 2 !== 0) {
    return inversions % 2 === 0;
  }

  // b. If the grid width is even, and the blank is on an even row counting from the bottom
  // (second-last, fourth-last etc), then the number of inversions in a solvable situation is odd.
  if (blankTileRowNumberFromBottom % 2 === 0) {
    return inversions % 2 !== 0;
  }

  // c. If the grid width is even, and the blank is on an odd row counting from the bottom
  // (last, third-last, fifth-last etc) then the number of inversions in a solvable situation is even."
  return inversions % 2 === 0;
}
