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
  winner: null,

  init() {
    this._super();
    this.reset();
  },

  reset() {
    this.set('board', generateBoard({ numColumns: this.numColumns, numRows: this.numRows }));
    this.set('currentPlayer', 0);
    this.set('winner', null);
  },

  didRender() {
    this.checkScore();
    if (this.winner !== null) {
      alert(`${this.winner} Wins!`);
      return this.reset();
    }
  },

  actions: {
    onClick(col, initialRow) {
      const row = this.calculateOpenCell(col);
      if (row === null) { return; }

      const cell = this.board[col][row];
      cell.set('color', this.playerColor());

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

  checkScore() {
    let winner;

    // check rows
    this.checkRows();
    if (this.winner !== null) { return; }

    // check columns
    this.checkColumns();
    if (this.winner !== null) { return; }

    // check left diagonals

    // check right diagonals

  },

  checkRows() {
    let consecutiveCount;
    let lastColor;
    let currentColor;

    for (let row = 0; row < this.numRows; row++) {
      consecutiveCount = 0;
      lastColor = null;
      currentColor = null;

      for (let col = 0; col < this.numColumns; col++) {
        currentColor = this.board[col][row].color;

        if (lastColor === null || (currentColor !== WHITE && lastColor === currentColor)) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }

        if (consecutiveCount === 4) { return this.set('winner', this.currentPlayer); }

        lastColor = currentColor;
      }
    }
  },

  checkColumns() {
    let consecutiveCount;
    let lastColor;
    let currentColor;

    for (let col = 0; col < this.numColumns; col++) {
      consecutiveCount = 0;
      lastColor = null;
      currentColor = null;

      for (let row = 0; row < this.numRows; row++) {
        currentColor = this.board[col][row].color;

        if (lastColor === null || (currentColor !== WHITE && lastColor === currentColor)) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }

        if (consecutiveCount === 4) { return this.set('winner', this.currentPlayer); }

        lastColor = currentColor;
      }
    }
    return null;
  },
});
