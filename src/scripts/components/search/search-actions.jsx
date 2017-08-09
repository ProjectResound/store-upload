import AppDispatcher from "../../dispatcher/app-dispatcher";

module.exports = {
  search: query => {
    AppDispatcher.dispatch({
      actionType: "SEARCH",
      query
    });
  }
};
