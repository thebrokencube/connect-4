import Component from '@ember/component';

import { precalculateCoordinates } from '../utils/precalculate-coordinates';
import { generateBoard } from '../utils/generate-board';
import { checkWinner } from '../utils/check-winner';
import { EMPTY, RED, BLACK } from '../constants/colors';

export default Component.extend({
  board: null,
  numRows: 6,
  numColumns: 7,
  winCondition: 4,

  allCoordinates: null,

  currentPlayer: null,
  winner: null,

  init() {
    this._super();
    this.reset();

    this.set(
      'allCoordinates',
      precalculateCoordinates(this.numColumns, this.numRows, this.winCondition)
    );
  },

  reset() {
    this.set('board', generateBoard(this.numColumns, this.numRows));
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

      const winner = checkWinner(this.board, this.allCoordinates, this.winCondition);
      if (winner) { this.set('winner', winner); }

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
});
