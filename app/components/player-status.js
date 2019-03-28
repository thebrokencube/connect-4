import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['PlayerStatus'],

  player1: null,
  player2: null,
  currentPlayer: null,

  player1Current: computed.equal('currentPlayer', 0),
  player2Current: computed.equal('currentPlayer', 1),
});
