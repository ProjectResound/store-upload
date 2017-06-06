import AppDispatcher from '../dispatcher/app-dispatcher';

export default {
  loggedIn: () => {
    AppDispatcher.dispatch({
      actionType: 'USER_LOGGED_IN'
    });
  },

  loggedOut: () => {
    AppDispatcher.dispatch({
      actionType: 'USER_LOGGED_OUT'
    });
  }
};
