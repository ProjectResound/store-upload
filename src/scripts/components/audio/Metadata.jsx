import React from 'react';
import { getDuration, getCreatedAt } from '../../services/audio-tools';

export default class Metadata extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const audio = this.props.audio;
    const editing = this.props.editing;

    return (
      <div className="metadata__container">
        { !editing &&
        <div>
          <div className="row md__row--large">
            Contributors: {audio.contributors}
          </div>
          <div className="row md__row--large">
            Tags: {audio.tags}
          </div>
        </div>
        }
        { editing &&
        <div>
          <div className="row metadata__inputs">
            <input
              className={this.props.validContributors ? 'col s6 md__row--editing contributors__input' : 'col s6 md__row--editing md__row--error'}
              type="text"
              name="contributors"
              value={this.props.contributors}
              onChange={this.props.onContributorsChange}
            />
            <label htmlFor="contributor">Contributors:</label>
            {!this.props.validContributors &&
            <div className={this.props.validContributors ? 'hidden' : 'col s6 audio__alert'}>
              Minimum length should be {this.props.MAX_CHAR_LENGTH} characters.
            </div>
            }
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
        </div>
          }
        <div className="row md__row--large">
          Date created: {getCreatedAt(audio)}
        </div>
        <div className="row md__row">
          Uploaded by: {audio.uploader}
        </div>
        <div className="row md__row">
          Length: {getDuration(audio)}
        </div>
      </div>
    );
  }
}
