import React from 'react';
import Autosuggest from 'react-autosuggest';

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

export default class Contributor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onGetSuggestionValue = this.onGetSuggestionValue.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
    this.props.onChangeContributor(newValue);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  onGetSuggestionValue(suggestion) {
    const oldValue = this.state.value.split(',');
    oldValue.pop();
    const trimmed = oldValue.filter(val => val.trim());
    if (!trimmed.includes(suggestion)) {
      trimmed.push(suggestion);
    }
    return trimmed.join(',');
  }

  getSuggestions(value) {
    const inputValue = value.split(',').pop().trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.props.contributors.filter(contributor =>
      contributor.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  render() {
    const suggestions = this.state.suggestions;

    const inputProps = {
      placeholder: 'Who made this? (Separate 2+ names with commas)',
      value: this.props.value || '',
      className: 'contributor queued-item__input-text',
      onChange: this.onChange,
      name: 'contributor'
    };
    const hideContributorAlert = this.props.hideContributorAlert;
    return (
      <div className="row">
        <label htmlFor="contributor">Contributor</label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.onGetSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className={`queued-item__alert ${hideContributorAlert}`}>
          You must provide a contributor name (min {this.MAX_CHAR_LENGTH} chars).
        </div>
      </div>
    );
  }
}
