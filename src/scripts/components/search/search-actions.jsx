import AppDispatcher from "../../dispatcher/app-dispatcher";

export default {
  search: query => {
    AppDispatcher.dispatch({
      actionType: "SEARCH",
      query
    });
  }
};
