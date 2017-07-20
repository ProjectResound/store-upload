import React from 'react';
import AudioStore from './audio-store';

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
      <div className="audio-page__container">
        { audio &&
          <div className="row">
            <h1 className="audio-page__title">{audio.title}</h1>
          </div>
        }
      </div>
    );
  }
}
