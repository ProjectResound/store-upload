const AppDispatcher = require('../../dispatcher/app-dispatcher');

module.exports = {
  receiveAudioList: (response) => {
    AppDispatcher.dispatch({
      actionType: 'GET_AUDIO_LIST',
      response,
    });
  },
  appendAudioList: (response) => {
    AppDispatcher.dispatch({
      actionType: 'APPEND_AUDIO_LIST',
      response,
    });
  },
};
