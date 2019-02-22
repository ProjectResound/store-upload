import React, { Component } from "react";
import PlayPauseButton from "./PlayPauseButton";
import { getDuration } from "../../services/audio-tools";
import addFallbackIfNecessary from "../../services/audio-context";
import autoBind from "react-autobind";
import Wavesurfer from "react-wavesurfer";
import qs from "qs";

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addFallbackAudioElement: false,
      audio: {},
      playing: false
    };

    autoBind(this);
  }

  componentDidMount() {
    const search = this.props.location.search.slice(1);
    const audio = qs.parse(search);
    this.setState({ audio });

    // Checks if browser has AudioContext and if not add HTML5 audio element as fallback
    addFallbackIfNecessary(this);
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
        {audio.url &&
          !this.state.addFallbackAudioElement && (
            <div
              className="embed__audio-player"
              style={{
                backgroundColor: audio.playerColor ? audio.playerColor : "white"
              }}
            >
              <div className="embed__audio-player-top">
                <PlayPauseButton
                  color={audio.buttonColor}
                  handleTogglePlay={this.handleTogglePlay}
                  playing={this.state.playing}
                />
                <div className="embed__audio-info">
                  <h3>{audio.title}</h3>
                  <p>{audio.contributors}</p>
                </div>
              </div>
              {audio.image && <img className="embed__image" src={audio.image} />}
              <Wavesurfer
                audioFile={`http://localhost:3000/${audio.url}`}
                onPosChange={this.handlePosChange}
                options={waveSurferOptions}
                playing={this.state.playing}
              />
              <div className="embed__timestamp">{this.state.timestamp}</div>
            </div>
          )}
        {this.state.addFallbackAudioElement && (
          <audio controls>
            <source src={`http://localhost:3000/${audio.url}`} />
          </audio>
        )}
      </div>
    );
  }
}

export default Embed;
