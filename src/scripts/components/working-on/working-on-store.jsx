import { EventEmitter } from 'events';
import assign from 'object-assign';
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
      .then((response) => {
        WorkingOnStore.emitChange(response.audios);
      }).catch((err) => {
        ErrorsActions.error(err);
      });
  }
});

module.exports = WorkingOnStore;
