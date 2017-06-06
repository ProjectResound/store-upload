import AppDispatcher from '../../dispatcher/app-dispatcher';

export default {
  error: (err) => {
    AppDispatcher.dispatch({
      actionType: 'ERROR',
      err,
    });
  },
  silentError: (err) => {
    AppDispatcher.dispatch({
      actionType: 'DEV_ERROR',
      err
    });
  }
};
