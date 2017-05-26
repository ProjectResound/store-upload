import React from 'react';
import SearchActions from './search-actions';
import SearchStore from './search-store';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
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
    this.setState({
      searching: true
    });
    const query = this.state.query;
    if (query) {
      SearchActions.search(query);
    }
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
      <div className="search col s9">
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
            src={this.state.searching ? '/assets/images/loading.gif' : '/assets/images/icon-search.png'}
          />
        </form>
      </div>
    );
  }
}

module.exports = Search;
