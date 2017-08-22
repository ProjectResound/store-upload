import AppDispatcher from "../../dispatcher/app-dispatcher";

export default {
  save: form => {
    AppDispatcher.dispatch({
      actionType: "AUDIO_SAVE",
      form
    });
  },
  delete: () => {
    AppDispatcher.dispatch({
      actionType: "AUDIO_DELETE"
    });
  }
};
