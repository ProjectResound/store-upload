import auth0 from "auth0-js";
import autoBind from "react-autobind";
import AUTH_CONFIG from "../../config/auth0-variables";
import UserActions from "../actions/user-actions";
import ErrorsActions from "../components/errors/errors-actions";

const tenantNameSpace = "https://myauth0.com/tenant";
const returnTo = window.location.protocol + "//" + window.location.host;

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: returnTo,
      audience: AUTH_CONFIG.audience,
      responseType: "token id_token",
      scope: "openid profile"
    });
    autoBind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout(true);
        ErrorsActions.error(err);
      } else {
        this.login();
      }
    });
  }

  login(options = {}) {
    this.auth0.authorize(options);
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      if (window.localStorage) {
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
        localStorage.setItem(
          "tenant",
          authResult.idTokenPayload[tenantNameSpace]
        );
      }
      UserActions.loggedIn(
        authResult.accessToken,
        authResult.idToken,
        authResult.idTokenPayload[tenantNameSpace]
      );
    }
  }

  logout(wrongTenant = false) {
    if (window.localStorage) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("tenant");
    }

    // Clear the SSO cookie in Auth0
    fetch(`https://${AUTH_CONFIG.domain}/v2/logout`, {
      credentials: "include",
      mode: "no-cors"
    })
      .then(response => {
        if (wrongTenant) {
          this.login({
            errorDescription: "Your account does not belogs to this domain."
          });
        } else {
          UserActions.loggedOut();
        }
      })
      .catch(err => ErrorsActions.error(err));
  }

  get isAuthenticated() {
    if (window.localStorage) {
      const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
      return new Date().getTime() < expiresAt;
    }
    return false;
  }

  getAccessToken() {
    if (window.localStorage) {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        ErrorsActions.error("No access token found");
      }
      return accessToken;
    }
    return undefined;
  }

  getTenantName() {
    if (window.localStorage) {
      const tenantName = localStorage.getItem("tenant");
      if (!tenantName) {
        ErrorsActions.error("No tenant found");
      }
      return tenantName;
    }
    return undefined;
  }
}
