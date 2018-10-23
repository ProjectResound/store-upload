import AppDispatcher from "../dispatcher/app-dispatcher";

export default {
  loggedIn: (accessToken, idToken, tenant) => {
    AppDispatcher.dispatch({
      actionType: "USER_LOGGED_IN",
      idToken,
      accessToken,
      tenant
    });
  },

  loggedOut: () => {
    AppDispatcher.dispatch({
      actionType: "USER_LOGGED_OUT"
    });
  }
};
