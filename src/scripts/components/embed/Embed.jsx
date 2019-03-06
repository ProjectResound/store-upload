import React, { Component } from "react";
import PlayPauseButton from "./PlayPauseButton";
import { getDuration } from "../../services/audio-tools";
import addFallbackIfNecessary from "../../services/audio-context";
import autoBind from "react-autobind";
import Wavesurfer from "react-wavesurfer";
import wavesurfer from "wavesurfer.js";
import qs from "qs";

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addFallbackAudioElement: false,
      audio: {},
      audioState: "loading",
      currentTime: "00:00",
      playing: false,
      pos: 0,
      waveState: "loading"
    };

    autoBind(this);
  }

  componentDidMount() {
    const search = this.props.location.search.slice(1);
    const audio = qs.parse(search);
    this.setState({ audio });

    // Checks if browser has AudioContext and if not add HTML5 audio element as fallback
    addFallbackIfNecessary(this);
    this.checkWaveformState();
  }

  checkWaveformState() {
    wavesurfer.on("waveform-ready", () => {
      this.setState({ waveState: "ready" });
    });
  }

  handlePosChange(e) {
    const currentTimeInSeconds = e.originalArgs[0];

    this.setState({
      currentTime: getDuration({ duration: currentTimeInSeconds }),
      pos: currentTimeInSeconds
    });
  }

  handleTogglePlay() {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  initAudioPlayer(e) {
    const durationInSeconds = e.wavesurfer.backend.media.duration;
    const { progressOpacity, waveOpacity } = this.state.audio;
    const { wave } = e.wavesurfer.drawer.canvases[0];
    const { progress } = e.wavesurfer.drawer.canvases[0];

    wave.style.opacity = waveOpacity;
    progress.style.opacity = progressOpacity;

    this.setState({
      audioState: "ready",
      duration: getDuration({ duration: durationInSeconds })
    });
  }

  render() {
    const {
      audio,
      audioState,
      currentTime,
      duration,
      pos,
      waveState
    } = this.state;

    const waveSurferOptions = {
      backend: "MediaElement",
      barWidth: 3,
      cursorWidth: 0,
      height: 75,
      normalize: true,
      progressColor: audio.progressColor
        ? audio.progressColor
        : "rgb(41, 213, 239)",
      responsive: true,
      waveColor: audio.waveColor ? audio.waveColor : "rgb(0, 0, 0)"
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
                <div className="embed__waveform-container">
                  {audioState === "loading" && (
                    <div className="embed__loading-msg pulsate">
                      <span>loading audio...</span>
                    </div>
                  )}
                  {audioState === "ready" &&
                    waveState === "loading" && (
                      <div className="embed__loading-msg pulsate">
                        <span>loading waveform...</span>
                      </div>
                    )}
                  <Wavesurfer
                    audioFile={`http://localhost:3000/${audio.url}`}
                    className={`embed__waveform ${
                      audioState === "loading" || waveState === "loading"
                        ? "hide"
                        : ""
                    }`}
                    onFinish={this.handleTogglePlay}
                    onPosChange={this.handlePosChange}
                    onReady={this.initAudioPlayer}
                    options={waveSurferOptions}
                    playing={this.state.playing}
                    pos={pos}
                  />
                  {currentTime &&
                    duration && (
                      <div className="embed__timestamp">
                        {this.state.currentTime} / {this.state.duration}
                      </div>
                    )}
                </div>
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
