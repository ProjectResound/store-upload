import React, { Component } from "react";
import autoBind from "react-autobind";
import Wavesurfer from "react-wavesurfer";
import queryString from "query-string";

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      playing: false
    };

    autoBind(this);
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({ imageUrl: values.image });
  }

  handleTogglePlay() {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  render() {
    return (
      <div id="embed">
        {this.state.imageUrl && (
          <img id="embed__image" src={this.state.imageUrl} />
        )}
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
