import { EventEmitter } from "events";
import assign from "object-assign";
import AppDispatcher from "../dispatcher/app-dispatcher";
import resoundAPI from "../services/resound-api";

const UserStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit("change");
  },

  addChangeListener(cb) {
    this.on("change", cb);
  },

  removeChangeListener(cb) {
    this.removeListener("change", cb);
  },

  handleIdToken(accessToken, idToken) {
    resoundAPI.users.create(accessToken, idToken);
  }
});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case "USER_LOGGED_IN":
      UserStore.emitChange();
      UserStore.handleIdToken(action.accessToken, action.idToken);
      break;
    case "USER_LOGGED_OUT":
      UserStore.emitChange();
      break;
    default:
      break;
  }
});

export default UserStore;
