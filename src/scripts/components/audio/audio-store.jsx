import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import resoundAPI from '../../services/resound-api';
import ErrorsActions from '../errors/errors-actions';

let _store;

const AudioStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit('change');
  },

  addChangeListener(cb) {
    this.on('change', cb);
  },

  removeChangeListener(cb) {
    this.removeListener('change', cb);
  },

  fetch(audioId) {
    resoundAPI.getAudioById(audioId)
      .then((response) => {
        _store = response;
        AudioStore.emitChange();
      })
      .catch((err) => {
        ErrorsActions.error(err);
      });
  },

  get() {
    return _store;
  }
});

// AppDispatcher.register((action) => {
//   switch (action.actionType) {
//     case 'PARSE_AUDIO_LIST':
//       ExplorerStore.parseAudioList(action);
//       break;
//     case 'APPEND_AUDIO_LIST':
//       ExplorerStore.appendAudioList(action);
//       break;
//     default:
//   }
//
//   ExplorerStore.emitChange();
//   return true;
// });

export default AudioStore;
