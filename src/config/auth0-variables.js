const AUTH_CONFIG = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  callbackUrl: process.env.AUTH0_CALLBACK_URL
};
module.exports = AUTH_CONFIG;
