const AppDispatcher = require('../../dispatcher/app-dispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
const resoundAPI = require('../../utils/resound-api');
const ExplorerActions = require('../explorer/explorer-actions');


const SearchStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit('change');
  },

  addChangeListener(cb) {
    this.on('change', cb);
  },

  removeChangeListener(cb) {
    this.removeListener('change', cb);
  },

  search: (query) => {
    resoundAPI.search(query)
      .then((results) => {
        ExplorerActions.receiveAudioList(results);
      });
  },
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'SEARCH':
      SearchStore.search(action.query);
      break;
    default:
  }

  SearchStore.emitChange();
  return true;
});

module.exports = SearchStore;
