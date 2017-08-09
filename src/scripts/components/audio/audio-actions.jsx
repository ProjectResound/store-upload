import AppDispatcher from "../../dispatcher/app-dispatcher";

export default {
  edit: toggle => {
    AppDispatcher.dispatch({
      actionType: "AUDIO_EDIT_ON",
      toggle
    });
  },
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
