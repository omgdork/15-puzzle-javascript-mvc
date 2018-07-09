export default class TileView {
  constructor(model) {
    this.model = model;
    this.element = generateElement(model);
  }

  /**
   * Moves the tile element to its latest coordinates.
   */
  move() {
    const row = this.model.get('row');
    const column = this.model.get('column');
    const width = this.model.get('width');

    this.element.style.top = `calc(${row * width}px + 5px)`;
    this.element.style.left = `calc(${column * width}px + 5px)`;
  }
}

/**
 * Generates the tile element.
 * @param {number} value - The tile value.
 * @param {number} row - The tile row index.
 * @param {number} column - The tile column index.
 * @param {number} width - The tile width.
 * @returns {HTMLElement} The tile element.
 */
function generateElement({ value, row, column, width }) {
  const element = document.createElement('div');

  element.dataset.value = value;
  element.classList.add('tile');

  if (value === 0) {
    element.classList.add('null');
  } else {
    element.innerText = value;
  }

  // Make the tile square and move it to its correct position.
  const tileWidth = `calc(${width}px - 10px)`; // 10px is for the margin (5px on either side).

  element.style = `
    height: ${tileWidth};
    left: calc(${row * width}px + 5px);
    line-height: ${tileWidth};
    top: calc(${column * width} + 5px);
    width: ${tileWidth};
  `;

  return element;
}
