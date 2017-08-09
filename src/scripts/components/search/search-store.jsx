import { EventEmitter } from "events";
import assign from "object-assign";
import AppDispatcher from "../../dispatcher/app-dispatcher";
import resoundAPI from "../../services/resound-api";
import ExplorerActions from "../explorer/explorer-actions";

const SearchStore = assign({}, EventEmitter.prototype, {
  emitChange(success) {
    this.emit("change", success);
  },

  addChangeListener(cb) {
    this.on("change", cb);
  },

  removeChangeListener(cb) {
    this.removeListener("change", cb);
  },

  search: query => {
    resoundAPI.search(query).then(results => {
      ExplorerActions.parseAudioList(results);
      SearchStore.emitChange(true);
    });
  }
});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case "SEARCH":
      SearchStore.search(action.query);
      break;
    default:
  }

  SearchStore.emitChange();
  return true;
});

module.exports = SearchStore;
