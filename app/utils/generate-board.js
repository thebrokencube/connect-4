import { A } from '@ember/array';
import EmberObject from '@ember/object';

import { EMPTY } from '../constants/colors';

/**
 * Generate a board with empty cells
 */
export function generateBoard(numColumns, numRows) {
  const columnIdxs = Array.from(Array(numColumns).keys());
  const rowIdxs = Array.from(Array(numRows).keys());

  return A(
    columnIdxs.map(() =>
      rowIdxs.map(() =>
        EmberObject.create({ color: EMPTY })
      )
    )
  );
}
