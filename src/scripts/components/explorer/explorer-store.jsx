const AppDispatcher = require('../../dispatcher/app-dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

let audioList = [];
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
    if (action && action.response) {
      isAppending = false;
      audioList = action.response;
    }
    audioList.sort((a, b) => {
      const aDate = new Date(a.updated_at);
      const bDate = new Date(b.updated_at);
      return bDate - aDate;
    });
    return audioList;
  },

  appendAudioList: (action) => {
    if (action && action.response) {
      isAppending = true;
      audioList = action.response.concat(audioList);
    }
    audioList.sort((a, b) => {
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

module.exports = ExplorerStore;
