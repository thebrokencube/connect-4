import Component from '@ember/component';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

const WHITE = 'white';
const RED = 'red';
const BLACK = 'black';

function generateCell() {
  return EmberObject.create({ color: WHITE });
}

function generateRow(numRows) {
  return A( [...new Array(numRows).keys()].map(() => generateCell()) );
}

function generateBoard({ numColumns = 7, numRows = 6 } = {}) {
  return A( [...new Array(numColumns).keys()].map(c => generateRow(numRows)) );
}

export default Component.extend({
  board: null,
  numRows: 6,
  numColumns: 7,
  currentPlayer: null,

  init() {
    this._super();
    this.set('board', generateBoard({ numColumns: this.numColumns, numRows: this.numRows }));
    this.set('currentPlayer', 0);
  },

  actions: {
    onClick(col, initialRow) {
      const row = this.calculateOpenCell(col);

      if (row !== null) {
        const cell = this.board[col][row];
        cell.set('color', this.playerColor());
      }

      this.togglePlayer();
    }
  },

  calculateOpenCell(col) {
    const idx = this.board[col].findIndex(cell => cell.color !== WHITE);

    if (idx === -1) {
      return this.numRows - 1;
    } else if (idx > 0) {
      return idx - 1
    } else {
      return null;
    }
  },

  playerColor() {
    return this.currentPlayer === 0 ? RED : BLACK;
  },

  togglePlayer() {
    this.set('currentPlayer', (this.currentPlayer + 1) % 2);
  },
});
