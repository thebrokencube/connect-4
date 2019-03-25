import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onSave(player1, player2) {
      console.log('CONTROLLER', player1, player2);
    }
  },
});
