import GuildLevel from '../models/level';

export default Discourse.Route.extend({
  model(opts) {
  	return GuildLevel.findById(opts.id);
  },

  setupController(controller, model) {
    controller.setProperties({ model });
  }
});