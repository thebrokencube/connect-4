import { EMPTY } from '../constants/colors';

/**
 * Goes through all the possible coordinates that could have win conditions
 * and returns the color that is the winner if there is a winning state. If
 * no winner, returns null.
 */
export function checkWinner(board, allCoordinates, winCondition) {
  let consecutiveCount;
  let lastColor;
  let currentColor;
  let col;
  let row;

  for (let i = 0; i < allCoordinates.length; i++) {
    // Reset all values for this line of coordinates
    consecutiveCount = 0;
    lastColor = null;
    currentColor = null;

    for (let j = 0; j < allCoordinates[i].length; j++) {
      [col, row] = allCoordinates[i][j];
      lastColor = currentColor;
      currentColor = board[col][row].color;

      if (lastColor === null) {
        // this is the first coordinate, so there is no lastColor
        consecutiveCount = 1;
      } else if (currentColor !== EMPTY && lastColor === currentColor) {
        // this is a matching state
        consecutiveCount++;
      } else {
        // there was not a match, so reset
        consecutiveCount = 1
      }

      // someone won!
      if (consecutiveCount === winCondition) { return currentColor; }
    }
  }

  // no one won
  return null;
}
