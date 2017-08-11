import React from "react";
import SearchActions from "./search-actions";
import SearchStore from "./search-store";
import ExplorerActions from "../explorer/explorer-actions";
import resoundAPI from "../../services/resound-api";
import ErrorsActions from "../errors/errors-actions";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this._searchReturned = this._searchReturned.bind(this);
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._searchReturned);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._searchReturned);
  }

  onChange(event) {
    this.setState({ query: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const query = this.state.query;
    if (query !== "") {
      this.setState({
        searching: true
      });
      SearchActions.search(query);
    } else {
      this.clearSearch();
    }
  }

  clearSearch() {
    resoundAPI
      .get()
      .then(audioList => ExplorerActions.parseAudioList(audioList))
      .catch(err => {
        ErrorsActions.error(err);
      });
  }

  _searchReturned(success) {
    if (success) {
      this.setState({
        searching: false
      });
    }
  }

  render() {
    return (
      <div className="search col s12">
        <form onSubmit={this.onSubmit} className="search__form">
          <input
            type="text"
            className="search__query"
            placeholder="Search for a file"
            name="query"
            value={this.state.query}
            onChange={this.onChange}
          />
          <input
            type="image"
            value="Search"
            className="search__submit"
            src={
              this.state.searching
                ? "/assets/images/loading.gif"
                : "/assets/images/icon-search.png"
            }
            onClick={this.onSubmit}
          />
        </form>
      </div>
    );
  }
}
