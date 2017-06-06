import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/app-dispatcher';

const UserStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit('change');
  },

  addChangeListener(cb) {
    this.on('change', cb);
  },

  removeChangeListener(cb) {
    this.removeListener('change', cb);
  }
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'USER_LOGGED_IN':
      UserStore.emitChange();
      break;
    case 'USER_LOGGED_OUT':
      UserStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = UserStore;
