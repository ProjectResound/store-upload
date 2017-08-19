import React from "react";
import Dropzone from "react-dropzone";
import DropstripActions from "../dropstrip/dropstrip-actions";
import DropstripStore from "../dropstrip/dropstrip-store";

export default class SingleAudioDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DropstripStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DropstripStore.removeChangeListener(this.onChange);
  }

  onDrop(files) {
    DropstripActions.queueFile(files[0]);
  }

  onChange() {
    this.setState({
      file: DropstripStore.getQueue()
    });
  }

  render() {
    const dragActiveClass = this.state.isDragActive
      ? "upload__border--hover"
      : "";
    const fileName = this.state.file
      ? Object.keys(this.state.file)[0]
      : undefined;
    const file = fileName ? this.state.file[fileName] : undefined;
    return (
      <div className="row dropzone__container">
        {this.state.file &&
          <div className="row">
            <div className="col s8 filename">
              {fileName}
            </div>
            <div className="col s4 file__actions">
              <button className="file__buttons">Upload this file</button>
              <button
                className="file__buttons file__buttons--faded"
                onClick={this.props.onCancelReplacing}
              >
                Use previous file
              </button>
            </div>
          </div>}
        {!this.state.file &&
          <Dropzone
            accept="audio/wav"
            multiple={false}
            className={`upload__dz ${dragActiveClass}`}
            onDragEnter={() => {
              this.setState({ isDragActive: true });
            }}
            onDragLeave={() => {
              this.setState({ isDragActive: false });
            }}
            onDrop={e => this.onDrop(e)}
          >
            <div className="queue__text">Drag & drop your new audio here</div>
            <div className="upload__btn">Or, browse for your audio</div>
          </Dropzone>}
      </div>
    );
  }
}
