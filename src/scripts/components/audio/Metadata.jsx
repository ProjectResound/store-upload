import React from 'react';
import { getDuration, getCreatedAt } from '../../services/audio-tools';

export default class Metadata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange() {
  }

  render() {
    const audio = this.props.audio;

    return (
      <div className="metadata__container">
        <div className="row md__row--large">
          Contributors: {audio.contributors}
        </div>
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
