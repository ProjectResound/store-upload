import React from "react";
import Dropzone from "react-dropzone";
import DropstripActions from "../dropstrip/dropstrip-actions";
import DropstripStore from "../dropstrip/dropstrip-store";

export default class SingleAudioDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: DropstripStore.getQueue()
    };
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  componentDidMount() {
    DropstripStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DropstripStore.removeChangeListener(this.onChange);
  }

  onDrop(files) {
    DropstripActions.queueFile(files[0]);
    this.file = DropstripStore.getQueue();
  }

  onChange() {
    this.setState({
      file: DropstripStore.getQueue()
    });
  }

  onUpload() {
    DropstripActions.uploadFile({
      file: this.file,
      title: this.props.title,
      contributors: this.props.contributors,
      tags: this.props.tags
    });
    this.setState({
      progress: "uploading"
    });
  }

  render() {
    const dragActiveClass = this.state.isDragActive
      ? "upload__border--hover"
      : "";
    const fileName = this.state.file
      ? Object.keys(this.state.file)[0]
      : undefined;
    const dropzoneQueue = this.state.file;
    const fileStatus = dropzoneQueue[fileName]
      ? dropzoneQueue[fileName].status
      : { progress: 0 };
    const progressBarStyle = {
      width: `${fileStatus.progress}%`
    };

    return (
      <div className="row dropzone__container">
        {fileName &&
          <div className="row">
            <div className="col s8 filename">
              {fileName}
            </div>
            <div className="col s4 file__actions">
              <button className="file__buttons" onClick={this.onUpload}>
                Upload this file
              </button>
              <button
                className="file__buttons file__buttons--faded"
                onClick={this.props.onCancelReplacing}
              >
                Use previous file
              </button>
            </div>
          </div>}
        {!this.state.progress &&
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
        {this.state.progress === "uploading" &&
          <div className="uploading__container">
            <div className="row">
              <div className="col s10 filename">
                {fileName}
              </div>
              <div className="col s2 file__actions">
                <button className="cancel-upload__link" onClick={this.onCancel}>
                  Cancel upload
                </button>
              </div>
            </div>
            <div className="row progress-container">
              <button
                className="progress-container__button--pause"
                onClick={this.onPause}
              >
                <img
                  src="/assets/images/button-pause_upload.png"
                  className="progress-container__image"
                  alt="Pause Upload"
                />
              </button>
              <div className="progress-container__bar" style={progressBarStyle}>
                Loading ({fileStatus.progress}%)
              </div>
            </div>
          </div>}
      </div>
    );
  }
}
