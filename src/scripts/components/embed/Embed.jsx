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

    const waveSurferOptions = {
      backend: "MediaElement",
      barWidth: 1,
      cursorWidth: 0,
      height: 150,
      normalize: true,
      progressColor: audio.progressColor ? audio.progressColor : "#0fb3cc",
      responsive: true,
      waveColor: audio.waveColor ? audio.waveColor : "#a2e0e3"
    };

    return (
      <div id="embed">
        <h3>{audio.title}</h3>
        <p>{audio.contributors}</p>
        {audio.image && <img id="embed__image" src={audio.image} />}
        {audio.url && (
          <div
            id="embed__audio-player"
            style={{
              border: "1px solid #e5e5e5",
              backgroundColor: audio.playerColor ? audio.playerColor : "white"
            }}
          >
            <div
              id="embed__play-pause"
              onClick={this.handleTogglePlay}
              style={{
                backgroundColor: audio.buttonColor
                  ? audio.buttonColor
                  : "#2db2cc"
              }}
            >
              {this.state.playing ? "Pause" : "Play"}
            </div>
            <Wavesurfer
              audioFile={`http://localhost:3000/${audio.url}`}
              onPosChange={this.handlePosChange}
              options={waveSurferOptions}
              playing={this.state.playing}
            />
          </div>
        )}
        <div id="embed__timestamp">{this.state.timestamp}</div>
      </div>
    );
  }
}

export default Embed;
