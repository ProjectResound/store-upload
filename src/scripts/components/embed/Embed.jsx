import React, { Component } from "react";
import autoBind from "react-autobind";
import Wavesurfer from "react-wavesurfer";

class Embed extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		playing: false,
  	}

    autoBind(this);
  }

  handleTogglePlay() {
  	const { playing } = this.state;

  	this.setState({ playing: !playing });
  }

  render() {
	  return (
      <div id="embed">
        <Wavesurfer
	  	    audioFile={'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'}
	  	    playing={this.state.playing}
        />
        <div
          id="embed__play-pause"
          onClick={this.handleTogglePlay}
        >
          Play | Pause
        </div>
      </div>
	  );
  }
}

export default Embed;
