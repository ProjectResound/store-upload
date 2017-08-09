import React from "react";
import Autosuggest from "react-autosuggest";

const renderSuggestion = suggestion =>
  <div>
    {suggestion}
  </div>;

export default class Contributor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.onGetSuggestionValue = this.onGetSuggestionValue.bind(this);
    this.MAX_CHAR_LENGTH = 4;
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
    const oldValue = this.state.value ? this.state.value.split(",") : [];
    oldValue.pop();
    const trimmed = oldValue.filter(val => val.trim());
    if (!trimmed.includes(suggestion)) {
      trimmed.push(suggestion);
    }
    return trimmed.join(",");
  }

  getSuggestions(value) {
    const inputValue = value.split(",").pop().trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength === 0 || !this.props.contributorsSuggestions) {
      return [];
    }
    return this.props.contributorsSuggestions.filter(
      contributor =>
        contributor.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  render() {
    const labelClass = this.props.labelClass || "";
    const label = this.props.label || "Contributors";
    const inputClass =
      this.props.inputClass || "contributor queued-item__input-text";
    const suggestions = this.state.suggestions;
    const inputProps = {
      placeholder: "Who made this? (Separate 2+ names with commas)",
      value: this.props.value || "",
      className: inputClass,
      onChange: this.onChange,
      name: "contributor"
    };
    const hideContributorAlert = this.props.hideContributorAlert;
    return (
      <div className="row">
        <label htmlFor="contributor" className={labelClass}>
          {label}
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.onGetSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className={hideContributorAlert ? "hidden" : "queued-item__alert"}>
          You must provide a contributor name (min {this.MAX_CHAR_LENGTH}{" "}
          chars).
        </div>
      </div>
    );
  }
}
