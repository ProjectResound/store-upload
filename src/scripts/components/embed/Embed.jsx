import React, { Component } from "react";
import { getDuration } from "../../services/audio-tools";
import autoBind from "react-autobind";
import Wavesurfer from "react-wavesurfer";
import queryString from "query-string";

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      audio: {}
    };

    autoBind(this);
  }

  componentDidMount() {
    const audio = queryString.parse(this.props.location.search);
    this.setState({ audio });
  }

  handlePosChange(e) {
    const pos = e.originalArgs[0];

    this.setState({
      timestamp: getDuration({ duration: pos })
    });
  }

  handleTogglePlay() {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  render() {
    const { audio } = this.state;

    return (
      <div id="embed">
        <h3>{audio.title}</h3>
        <p>{audio.contributors}</p>
        {audio.image && <img id="embed__image" src={audio.image} />}
        <Wavesurfer
          audioFile={`http://localhost:3000/${audio.url}`}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
        />
        <div id="embed__timestamp">{this.state.timestamp}</div>
        <div id="embed__play-pause" onClick={this.handleTogglePlay}>
          {this.state.playing ? "Pause" : "Play"}
        </div>
      </div>
    );
  }
}

export default Embed;
