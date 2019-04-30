import React, { Component } from "react";
import PlayPauseButton from "./PlayPauseButton";
import IEEmbedPlayer from "./IEEmbedPlayer";
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

    this.setState({
      audioState: "ready",
      duration: getDuration({ duration: durationInSeconds })
    });
  }

  initIEAudioPlayer(duration) {
    this.setState({
      audioState: "ready",
      duration: getDuration({ duration })
    });
  }

  render() {
    const {
      addFallbackAudioElement,
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
      progressColor: audio.accentColor ? audio.accentColor : "#29D5EF",
      responsive: true,
      waveColor: audio.waveColor ? audio.waveColor : "#CDCDCD"
    };

    return (
      <div id="embed">
        {audio.url && (
          <div
            className="embed__audio-player"
            style={{
              backgroundColor: audio.playerColor ? audio.playerColor : "#F6F6F6"
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
              } ${addFallbackAudioElement ? "embed__audio-container--ie" : ""}`}
            >
              <div className="embed__audio-player-top">
                <PlayPauseButton
                  color={audio.accentColor}
                  handleTogglePlay={this.handleTogglePlay}
                  playing={this.state.playing}
                />
                <div className="embed__audio-info">
                  <div
                    className="embed__title overflow-ellipsis"
                    style={{ color: audio.textColor }}
                  >
                    {audio.title}
                  </div>
                  <div
                    className="embed__contributors overflow-ellipsis"
                    style={{ color: audio.textColor }}
                  >
                    {audio.contributors}
                  </div>
                </div>
              </div>
              <div className="embed__waveform-container">
                {audioState === "loading" && (
                  <div
                    className="embed__loading-msg pulsate"
                    style={{
                      color: audio.accentColor ? audio.accentColor : "#29D5EF"
                    }}
                  >
                    <span>loading audio...</span>
                  </div>
                )}
                {audioState === "ready" &&
                  waveState === "loading" &&
                  !addFallbackAudioElement && (
                    <div
                      className="embed__loading-msg pulsate"
                      style={{
                        color: audio.accentColor ? audio.accentColor : "#29D5EF"
                      }}
                    >
                      <span>loading waveform...</span>
                    </div>
                  )}
                {addFallbackAudioElement ? (
                  <IEEmbedPlayer
                    audio={audio}
                    audioState={audioState}
                    handleTogglePlay={this.handleTogglePlay}
                    initIEAudioPlayer={this.initIEAudioPlayer}
                    onPosChange={this.handlePosChange}
                    playing={this.state.playing}
                  />
                ) : (
                  <Wavesurfer
                    audioFile={audio.url}
                    className={"embed__waveform"}
                    onFinish={this.handleTogglePlay}
                    onPosChange={this.handlePosChange}
                    onReady={this.initAudioPlayer}
                    options={waveSurferOptions}
                    playing={this.state.playing}
                    pos={pos}
                  />
                )}
                {currentTime &&
                  duration && (
                    <div
                      className="embed__timestamp"
                      style={{ color: audio.textColor }}
                    >
                      {this.state.currentTime} / {this.state.duration}
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Embed;
