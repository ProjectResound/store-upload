import React from "react";

export default props => {
  return (
    <div
      className={
        props.editing
          ? "playpause__container playpause__container--disabled"
          : "playpause__container"
      }
    >
      {props.playing &&
        <img
          src="/assets/images/button-pause_audio.png"
          className="waveform__button__pause"
          onClick={props.handleTogglePlay}
        />}
      {!props.playing &&
        <img
          src="/assets/images/button-play_audio.png"
          className="waveform__button__play"
          onClick={props.handleTogglePlay}
        />}
    </div>
  );
};
