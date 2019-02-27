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
      currentTime: "00:00",
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
    const currentTimeInSeconds = e.originalArgs[0];

    this.setState({
      currentTime: getDuration({ duration: currentTimeInSeconds })
    });
  }

  handleTogglePlay() {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  setDuration(e) {
    const durationInSeconds = e.wavesurfer.backend.media.duration;

    this.setState({
      duration: getDuration({ duration: durationInSeconds })
    });
  }

  render() {
    const { audio, currentTime, duration } = this.state;

    const waveSurferOptions = {
      backend: "MediaElement",
      barWidth: 3,
      cursorWidth: 0,
      height: 75,
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
                backgroundColor: audio.playerColor
                  ? audio.playerColor
                  : "rgb(246, 246, 246)"
              }}
            >
              {audio.image && (
                <div
                  className="embed__image"
                  style={{ backgroundImage: `url(${audio.image})` }}
                />
              )}
              <div
                className={`embed__audio-container ${
                  audio.image ? "embed__audio-container--with-image" : ""
                }`}
              >
                <div className="embed__audio-player-top">
                  <PlayPauseButton
                    color={audio.buttonColor}
                    handleTogglePlay={this.handleTogglePlay}
                    playing={this.state.playing}
                  />
                  <div className="embed__audio-info">
                    <div className="embed__title overflow-ellipsis">
                      {audio.title}
                    </div>
                    <div className="embed__contributors overflow-ellipsis">
                      {audio.contributors}
                    </div>
                  </div>
                </div>
                <Wavesurfer
                  audioFile={`http://localhost:3000/${audio.url}`}
                  className="embed__waveform"
                  onPosChange={this.handlePosChange}
                  onReady={this.setDuration}
                  options={waveSurferOptions}
                  playing={this.state.playing}
                />
                {currentTime &&
                  duration && (
                    <div className="embed__timestamp">
                      {this.state.currentTime} / {this.state.duration}
                    </div>
                  )}
              </div>
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
