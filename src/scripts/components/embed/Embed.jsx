import React, { Component } from "react";
import autoBind from "react-autobind";
import Wavesurfer from "react-wavesurfer";
import queryString from "query-string";

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      song: {}
    };

    autoBind(this);
  }

  componentDidMount() {
    const song = queryString.parse(this.props.location.search);
    this.setState({ song });
  }

  handleTogglePlay() {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  render() {
    const { song } = this.state;

    return (
      <div id="embed">
        <h3>{song.title}</h3>
        <p>{song.contributors}</p>
        {song.image && <img id="embed__image" src={song.image} />}
        <Wavesurfer
          audioFile={
            "https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
          }
          playing={this.state.playing}
        />
        <div id="embed__play-pause" onClick={this.handleTogglePlay}>
          {this.state.playing ? "Pause" : "Play"}
        </div>
      </div>
    );
  }
}

export default Embed;
