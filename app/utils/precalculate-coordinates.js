/** Generate all columns to check */
function _columnsToCheck(numColumns, numRows, winCondition) {
  if (numRows < winCondition) { return []; }

  const columnIdxs = Array.from(Array(numColumns).keys());
  const rowIdxs = Array.from(Array(numRows).keys());

  return columnIdxs.map(col => rowIdxs.map(row => [col, row]));
}

/** Generate all rows to check */
function _rowsToCheck(numColumns, numRows, winCondition) {
  if (numColumns < winCondition) { return []; }

  const columnIdxs = Array.from(Array(numColumns).keys());
  const rowIdxs = Array.from(Array(numRows).keys());

  return rowIdxs.map(row => columnIdxs.map(col => [col, row]));
}

/** Generate all left diagonals to check */
function _leftDiagonalsToCheck(numColumns, numRows, winCondition) {
  if (numColumns < winCondition || numRows < winCondition ) { return []; }

  const startingIdxs = [];

  // going up the right side of the board
  // NOTE: row > 0 so we don't include the top-left corner. we include it in the
  // next loop
  for (let row = numRows - winCondition; row > 0; row--) {
    startingIdxs.push([0, row])
  }

  // going right to left across the top of the board
  for (let col = 0; col <= numColumns - winCondition; col++) {
    startingIdxs.push([col, 0]);
  }

  return startingIdxs.map(([col, row]) => {
    const diagonal = [];
    while (col < numColumns && row < numRows) {
      diagonal.push([col, row])
      col++;
      row++;
    }
    return diagonal;
  });
}

/** Generate all right diagonals to check */
function _rightDiagonalsToCheck(numColumns, numRows, winCondition) {
  if (numColumns < winCondition || numRows < winCondition ) { return []; }

  const startingIdxs = [];

  // going up the right side of the board
  // NOTE: row > 0 so we don't include the top-right corner. we include it in
  // the next loop
  for (let row = numRows - winCondition; row > 0; row--) {
    startingIdxs.push([numColumns - 1, row])
  }

  // going right to left across the top of the board
  for (let col = numColumns - 1; col >= winCondition - 1; col--) {
    startingIdxs.push([col, 0]);
  }

  return startingIdxs.map(([col, row]) => {
    const diagonal = [];
    while (col >= 0 && row < numRows) {
      diagonal.push([col, row])
      col--;
      row++;
    }
    return diagonal;
  });
}



/**
 * Returns a array of arrays, each secondary array containing the pre-calculated
 * coordinates to check whenever a move is made. based on the board state and
 * win condition.
 */
export function precalculateCoordinates(numColumns, numRows, winCondition) {
  return [
    _columnsToCheck(numColumns, numRows, winCondition),
    _rowsToCheck(numColumns, numRows, winCondition),
    _leftDiagonalsToCheck(numColumns, numRows, winCondition),
    _rightDiagonalsToCheck(numColumns, numRows, winCondition),
  ].flat();
}
