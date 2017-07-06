import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../../dispatcher/app-dispatcher';

let audioList = { audios: [] };
let isAppending = false;

const ExplorerStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit('change');
  },

  addChangeListener(cb) {
    this.on('change', cb);
  },

  removeChangeListener(cb) {
    this.removeListener('change', cb);
  },

  getAudioList: (action) => {
    if (action && action.response && !action.response.errors) {
      isAppending = false;
      const audios = action.response.audios;
      audios.sort((a, b) => {
        const aDate = new Date(a.updated_at);
        const bDate = new Date(b.updated_at);
        return bDate - aDate;
      });
      audioList = action.response;
      audioList.audios = audios;
    }
    return audioList;
  },

  appendAudioList: (action) => {
    if (action && action.response) {
      isAppending = true;
      audioList.audios = audioList.audios
        .filter(audio => audio.filename !== action.response.audios[0].filename);
      if (action.response.audios.length > 0) {
        audioList.audios = action.response.audios.concat(audioList.audios);
      }
    }
    audioList.audios.sort((a, b) => {
      const aDate = new Date(a.updated_at);
      const bDate = new Date(b.updated_at);
      return bDate - aDate;
    });
    return audioList;
  },

  getTransitionState: () => isAppending,
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'GET_AUDIO_LIST':
      ExplorerStore.getAudioList(action);
      break;
    case 'APPEND_AUDIO_LIST':
      ExplorerStore.appendAudioList(action);
      break;
    default:
  }

  ExplorerStore.emitChange();
  return true;
});

export default ExplorerStore;
