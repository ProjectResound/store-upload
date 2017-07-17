import AppDispatcher from '../../dispatcher/app-dispatcher';

export default {
  add: (contributors) => {
    AppDispatcher.dispatch({
      actionType: 'ADD_CONTRIBUTORS',
      contributors
    });
  }
};
