import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    goToGame(player1, player2) {
      this.router.transitionTo('game', { queryParams: { player1, player2 } });
    }
  },
});
