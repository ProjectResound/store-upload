import React from 'react';
import AudioStore from './audio-store';
import EditFile from './EditFile';
import Metadata from './Metadata';

export default class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.audioId = props.match.params.id.split('-')[0];
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AudioStore.addChangeListener(this.onChange);
    AudioStore.fetch(this.audioId);
  }

  componentWillUnmount() {
    AudioStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      audio: AudioStore.get()
    });
  }

  render() {
    const audio = this.state.audio;

    return (
      <div>
        { audio &&
          <div className="audio-page__container">
            <div className="row">
              <h1 className="audio-page__title">{audio.title}</h1>
            </div>
            <div className="row">
              <div className="col s2 audio-actions__container">
                <div className="row">
                  <EditFile audio={audio} />
                </div>
                <div className="row image__container">
                  <img src="/assets/images/icon-link.png" className="copy__icon" alt="copy a link icon" />
                  Copy a link
                </div>
                <div className="row image__container">
                  <img src="/assets/images/icon-download.png" alt="download icon" />
                  Download
                </div>
                <div className="row image__container delete__container">
                  <img src="/assets/images/icon-delete.png" className="trash__icon" alt="delete icon" />
                  Delete this file
                </div>
              </div>
              <div className="col s10">
                <Metadata audio={audio} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
