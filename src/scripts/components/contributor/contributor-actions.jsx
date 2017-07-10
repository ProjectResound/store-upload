import AppDispatcher from '../../dispatcher/app-dispatcher';

export default {
  populateContributors: () => {
    AppDispatcher.dispatch({
      actionType: 'GET_CONTRIBUTORS'
    });
  },
  add: (contributors) => {
    AppDispatcher.dispatch({
      actionType: 'ADD_CONTRIBUTORS',
      contributors
    });
  }
};
