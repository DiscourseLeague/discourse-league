import { registerUnbound } from 'discourse-common/lib/helpers';

export default registerUnbound('memberships-viewing-self', function(model) {
  if (Discourse.User.current()){
    return Discourse.User.current().username.toLowerCase() === model.username.toLowerCase();  
  }
  else {
    return false;
  }
});