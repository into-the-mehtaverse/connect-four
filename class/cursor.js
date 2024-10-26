const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 5;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

    this.setBackgroundColor()
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    if (this.row === 0) {
      return;
    }
    this.resetBackgroundColor();
    this.row--;
    this.setBackgroundColor()
  }

  down() {
    if (this.row === this.numRows - 1) {
      return;
    }
    this.resetBackgroundColor();
    this.row++
    this.setBackgroundColor()
  }

  left() {
    if (this.col === 0) {
      return;
    }
    this.resetBackgroundColor();
    this.col--;
    this.setBackgroundColor()
  }

  right() {
    if (this.col === this.numCols - 1) {
      return;
    }
    this.resetBackgroundColor();
    this.col++
    this.setBackgroundColor()
  }

}


module.exports = Cursor;
