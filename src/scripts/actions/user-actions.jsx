import AppDispatcher from "../dispatcher/app-dispatcher";

export default {
  loggedIn: (accessToken, idToken) => {
    AppDispatcher.dispatch({
      actionType: "USER_LOGGED_IN",
      idToken,
      accessToken
    });
  },

  loggedOut: () => {
    AppDispatcher.dispatch({
      actionType: "USER_LOGGED_OUT"
    });
  }
};
