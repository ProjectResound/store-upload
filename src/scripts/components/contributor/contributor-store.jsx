import { EventEmitter } from "events";
import assign from "object-assign";
import AppDispatcher from "../../dispatcher/app-dispatcher";
import resoundAPI from "../../services/resound-api";
import ErrorsActions from "../../components/errors/errors-actions";

const _store = [];

const ContributorStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit("change");
  },

  addChangeListener(cb) {
    this.on("change", cb);
  },

  removeChangeListener(cb) {
    this.removeListener("change", cb);
  },

  get() {
    resoundAPI
      .populateContributors()
      .then(response => {
        response.forEach(contributor => {
          if (!_store.includes(contributor.name)) {
            _store.push(contributor.name);
          }
        });
        ContributorStore.emitChange();
      })
      .catch(err => {
        ErrorsActions.error(err);
      });
  },

  getList() {
    return _store;
  },

  add(contributors) {
    const newContributorsArray = contributors.split(/\s*,\s*/);
    newContributorsArray.forEach(newContributor => {
      const addition = newContributor.trim();
      if (!_store.includes(addition)) {
        _store.push(addition);
      }
    });
    ContributorStore.emitChange();
  }
});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case "ADD_CONTRIBUTORS":
      ContributorStore.add(action.contributors);
      break;
    default:
  }
  return true;
});

module.exports = ContributorStore;
