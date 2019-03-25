import Component from '@ember/component';

export default Component.extend({
  player1: 'Player 1',
  player2: 'Player 2',

  onSave: () => {},

  actions: {
    updateName(player, name) {
      this.set(player, name);
    },

    save() {
      this.onSave(this.player1, this.player2);
    }
  },
});
