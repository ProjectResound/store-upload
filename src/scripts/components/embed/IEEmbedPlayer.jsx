import React, { Component } from "react";
import autoBind from "react-autobind";

class IEEmbedPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progressMax: 1,
      progressValue: 0,
      seeking: false
    };

    autoBind(this);
  }

  componentWillReceiveProps(props) {
    if (props.playing) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  handleSeek(eventName, e) {
    const { progressMax, seeking } = this.state;

    if (eventName === "onMouseDown") {
      this.setState({ seeking: true });
    } else if (eventName === "onMouseUp") {
      this.setState({ seeking: false });
    }

    if (seeking) {
      const { offsetX } = e.nativeEvent;
      const { offsetWidth } = e.target;
      const percent = offsetX / offsetWidth;
      const progressValue = progressMax * percent;
      this.audio.currentTime = progressValue;
    }
  }

  initProgressBar(e) {
    const { duration } = e.currentTarget;

    this.setState({ progressMax: duration });
    this.props.initIEAudioPlayer(duration);
  }

  updateProgress(e) {
    const { currentTime } = e.currentTarget;

    this.setState({ progressValue: currentTime });
    this.props.onPosChange({ originalArgs: [currentTime] });
  }

  render() {
    const { progressMax, progressValue } = this.state;
    const { audio, audioState, handleTogglePlay } = this.props;

    return (
      <div id="ie-embed-player">
        <progress
          id="embed__progress"
          className={audioState === "loading" ? "embed__progress--hide" : ""}
          onMouseDown={this.handleSeek.bind(this, "onMouseDown")}
          onMouseUp={this.handleSeek.bind(this, "onMouseUp")}
          max={progressMax}
          onMouseMove={this.handleSeek.bind(this, "onMouseMove")}
          style={{
            backgroundColor: audio.waveColor
              ? audio.waveColor
              : "rgba(0, 0, 0, 0.1)",
            color: audio.accentColor ? audio.accentColor : "rgb(41, 213, 239)"
          }}
          value={progressValue}
        />
        <audio
          id="ie-audio-player"
          controls
          onCanPlay={this.initProgressBar}
          onEnded={handleTogglePlay}
          onTimeUpdate={this.updateProgress}
          ref={audio => (this.audio = audio)}
        >
          <source src={audio.url} />
        </audio>
      </div>
    );
  }
}

export default IEEmbedPlayer;
