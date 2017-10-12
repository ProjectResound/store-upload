import { EventEmitter } from "events";
import assign from "object-assign";
import AppDispatcher from "../../dispatcher/app-dispatcher";

const ErrorsStore = assign({}, EventEmitter.prototype, {
  emitChange(msg) {
    this.emit("change", msg);
  },

  addChangeListener(cb) {
    this.on("change", cb);
  },

  removeChangeListener(cb) {
    this.removeListener("change", cb);
  },

  handleError: action => {
    if (action.err && action.err.message === "Failed to fetch") {
      ErrorsStore.emitChange("There was an error contacting the server.");
    }
  }
});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case "ERROR":
      ErrorsStore.handleError(action);
      break;
    default:
      break;
  }
});

export default ErrorsStore;
