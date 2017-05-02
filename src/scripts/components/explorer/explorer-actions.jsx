const AppDispatcher = require('../../dispatcher/app-dispatcher');

module.exports = {
  receiveAudioList: (response) => {
    console.log(response);
    AppDispatcher.dispatch({
      actionType: 'GET_AUDIO_LIST',
      response,
    });
  },
};
