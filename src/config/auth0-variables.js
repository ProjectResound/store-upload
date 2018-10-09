const AUTH_CONFIG = {
  domain: process.env.AUTH0_DOMAIN || "dummydomain",
  clientId: process.env.AUTH0_CLIENT_ID || "dummyclient",
  callbackUrl: process.env.AUTH0_CALLBACK_URL || "localhost",
  audience: process.env.AUTH0_AUDIENCE || "dummyaudience"
};

export default AUTH_CONFIG;
