// This code should be added as a custom rule on auth0.
// It will save and validate the tenant information for each user that goes through auth0
// authentication flow.
// More info: https://auth0.com/docs/rules/current

function (user, context, callback) {
  var namespace = 'https://myauth0.com/';
  var url = require('url');
  user.app_metadata = user.app_metadata || {};
  let tenant = url.parse(
    context.request.query.redirect_uri
   ).hostname.split('.')[0];
  let userTenant = user.app_metadata.tenant;

  if(userTenant === undefined) {
    user.app_metadata.tenant = tenant;
    var appMetadataPromise  = auth0.users.updateAppMetadata(user.user_id, user.app_metadata);

    q.all([appMetadataPromise])
      .then(function(){
        if (context.idToken && user.app_metadata) {
          context.idToken[namespace + 'tenant'] = user.app_metadata.tenant;
        }
        return callback(null, user, context);
      })
      .catch(function(err){
        return callback(err);
      });
  } else {
    if(userTenant === tenant) {
      if (context.idToken && user.app_metadata) {
        context.idToken[namespace + 'tenant'] = user.app_metadata.tenant;
      }
      return callback(null, user, context);
    } else {
      return callback(new UnauthorizedError('Your account does not belongs to this domain.'));
    }
  }
}
