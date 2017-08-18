import React from "react";
import { getDuration, getCreatedAt } from "../../services/audio-tools";
import Contributor from "../contributor/Contributor";

export default class Metadata extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const audio = this.props.audio;
    const editing = this.props.editing;

    return (
      <div className="metadata__container">
        {!editing &&
          <div>
            <div className="row md__row--large">
              Contributors: {audio.contributors}
            </div>
            <div className="row md__row--large">
              Tags: {audio.tags}
            </div>
          </div>}
        {editing &&
          <div>
            <div className="row metadata__inputs">
              <Contributor
                hideContributorAlert={this.props.validContributors}
                contributorsSuggestions={this.props.contributorsSuggestions}
                value={this.props.contributors}
                onChangeContributor={this.props.onContributorsChange}
                label="Contributors:"
                inputClass={
                  this.props.validContributors
                    ? "col s6 md__row--editing contributors__input"
                    : "col s6 md__row--editing md__row--error"
                }
              />
            </div>
            <div className="row metadata__inputs">
              <input
                className="col s6 md__row--editing tags__input"
                type="text"
                name="tags"
                value={this.props.tags}
                onChange={this.props.onTagsChange}
              />
              <label htmlFor="tags">Tags:</label>
            </div>
          </div>}
        <div
          className={
            this.props.editing
              ? "row md__row--large md__row--disabled"
              : "row md__row--large"
          }
        >
          Date created: {getCreatedAt(audio)}
        </div>
        <div
          className={
            this.props.editing ? "row md__row md__row--disabled" : "row md__row"
          }
        >
          Uploaded by: {audio.uploader}
        </div>
        <div
          className={
            this.props.editing ? "row md__row md__row--disabled" : "row md__row"
          }
        >
          Length: {getDuration(audio)}
        </div>
        <div
          className={
            this.props.editing ? "row md__row md__row--disabled" : "row md__row"
          }
        >
          Original file: {audio.filename}
        </div>
      </div>
    );
  }
}
