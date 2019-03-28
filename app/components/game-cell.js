import Component from '@ember/component';

export default Component.extend({
  classNames: ['GameCell'],

  color: null,
  colIdx: null,
  rowIdx: null,
  onClick: () => {},

  click() {
    this.onClick(this.colIdx, this.rowIdx);
  }
});
