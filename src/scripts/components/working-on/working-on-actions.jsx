import AppDispatcher from '../../dispatcher/app-dispatcher';

export default {
  get: () => {
    AppDispatcher.dispatch({
      actionType: 'WORKING_ON_GET'
    });
  },
};
