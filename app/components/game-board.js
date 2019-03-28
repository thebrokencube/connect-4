import Component from '@ember/component';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

const EMPTY = 'empty';
const RED = 'red';
const BLACK = 'black';

function generateRow(numRows) {
  return A(
    Array.from(Array(numRows).keys()).map(() => EmberObject.create({ color: EMPTY }))
  );
}

function generateBoard({ numColumns = 7, numRows = 6 } = {}) {
  return A(
    Array.from(Array(numColumns).keys()).map(() => generateRow(numRows))
  );
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
    if (this.winner !== null) {
      alert(`${this.winner} Wins!`);
      return this.reset();
    }
  },

  actions: {
    onClick(colIdx) {
      const rowIdx = this.calculateOpenCell(colIdx);
      if (rowIdx === null) { return; }

      const cell = this.board[colIdx][rowIdx];
      cell.set('color', this.playerColor());

      // we check score before toggling the player to ensure that we record the correct winner
      this.checkScore();
      this.togglePlayer();
    }
  },

  calculateOpenCell(colIdx) {
    const idx = this.board[colIdx].findIndex(cell => cell.color !== EMPTY);

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

        if (lastColor === null || (currentColor !== EMPTY && lastColor === currentColor)) {
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

        if (lastColor === null || (currentColor !== EMPTY && lastColor === currentColor)) {
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
