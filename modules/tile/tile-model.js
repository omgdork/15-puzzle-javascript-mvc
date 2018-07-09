export default class TileModel {
  constructor({ value, row, column, width }) {
    this.value = value;
    this.row = row;
    this.column = column;
    this.width = width;
  }

  get(prop) {
    return this[prop];
  }

  set(prop, value) {
    this[prop] = value;
  }

  setCoordinates(row, column) {
    this.row = row;
    this.column = column;
  }
}
