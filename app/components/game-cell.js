import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['GameCell'],

  color: null,
  c: null,
  r: null,
  onClick: () => {},

  click() {
    this.onClick(this.c, this.r);
  }
});
