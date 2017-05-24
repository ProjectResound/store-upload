import React from 'react';

const SearchActions = require('./search-actions');
const SearchStore = require('./search-store');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(event) {
    this.setState({ query: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const query = this.state.query;
    if (query) {
      SearchActions.search(query);
    }
  }

  render() {
    return (
      <div className="search col s9">
        <form onSubmit={this.onSubmit} className="search__form">
          <input
            type="text"
            placeholder="Search for a file"
            name="query"
            value={this.state.query}
            onChange={this.onChange}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

module.exports = Search;
