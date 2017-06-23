import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import resoundAPI from '../../services/resound-api';
import ErrorsActions from '../../components/errors/errors-actions';

const WorkingOnStore = assign({}, EventEmitter.prototype, {
  emitChange(audios) {
    this.emit('change', audios);
  },

  addChangeListener(cb) {
    this.on('change', cb);
  },

  removeChangeListener(cb) {
    this.removeListener('change', cb);
  },

  get() {
    resoundAPI.getWorkingOn()
      .then((audios) => {
        WorkingOnStore.emitChange(audios);
      }).catch((err) => {
        ErrorsActions.error(err);
      });
  }
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'WORKING_ON_GET':
      WorkingOnStore.get();
      break;
    default:
  }
  return true;
});

module.exports = WorkingOnStore;
