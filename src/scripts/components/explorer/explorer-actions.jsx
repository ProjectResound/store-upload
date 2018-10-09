const AppDispatcher = require("../../dispatcher/app-dispatcher").default;

export default {
  parseAudioList: response => {
    AppDispatcher.dispatch({
      actionType: "PARSE_AUDIO_LIST",
      response
    });
  },
  appendAudioList: response => {
    AppDispatcher.dispatch({
      actionType: "APPEND_AUDIO_LIST",
      response
    });
  }
};
