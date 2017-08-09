import { EventEmitter } from "events";
import assign from "object-assign";
import AppDispatcher from "../../dispatcher/app-dispatcher";
import resoundAPI from "../../services/resound-api";
import ErrorsActions from "../errors/errors-actions";

let _store;
let _inEditMode = false;
let _audioId;

const AudioStore = assign({}, EventEmitter.prototype, {
  emitChange(changeType) {
    this.emit("change", changeType);
  },

  addChangeListener(cb) {
    this.on("change", cb);
  },

  removeChangeListener(cb) {
    this.removeListener("change", cb);
  },

  fetch(audioId) {
    _audioId = audioId;
    resoundAPI
      .getAudioById(audioId)
      .then(response => {
        _store = response;
        AudioStore.emitChange();
      })
      .catch(err => {
        ErrorsActions.error(err);
      });
  },

  get() {
    return _store;
  },

  toggleEditMode(toggle) {
    _inEditMode = toggle;
  },

  inEditMode() {
    return _inEditMode;
  },

  save(form) {
    resoundAPI
      .updateAudio(form)
      .then(response => {
        _store = response;
        AudioStore.toggleEditMode(false);
        AudioStore.emitChange("saved");
      })
      .catch(err => {
        ErrorsActions.error(err);
      });
  },

  delete() {
    resoundAPI
      .deleteAudio(_audioId)
      .then(() => {
        AudioStore.emitChange("deleted");
      })
      .catch(err => {
        ErrorsActions.error(err);
      });
  }
});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case "AUDIO_EDIT_ON":
      AudioStore.toggleEditMode(action.toggle);
      break;
    case "AUDIO_SAVE":
      AudioStore.save(action.form);
      break;
    case "AUDIO_DELETE":
      AudioStore.delete();
      break;
    default:
  }
  AudioStore.emitChange();
  return true;
});

export default AudioStore;
