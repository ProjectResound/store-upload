import React from "react";
import { Link } from "react-router-dom";
import autoBind from "react-autobind";
import Dropzone from "react-dropzone";
import ActionCable from "actioncable";
import DropstripActions from "../dropstrip/dropstrip-actions";
import DropstripStore from "../dropstrip/dropstrip-store";
import { generateUrl } from "../../services/audio-tools";
import { WS_URL } from "../../constants/api-urls";

const cable = ActionCable.createConsumer(WS_URL);

export default class SingleAudioDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: Object.values(DropstripStore.getQueue())[0]
    };
    autoBind(this);
  }

  componentDidMount() {
    this._initCable();
    DropstripStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    this.props.onEdit(false);
    this.setState({});
    DropstripStore.removeChangeListener(this.onChange);
  }

  _initCable() {
    cable.subscriptions.create("FilesChannel", {
      received: msg => {
        if (msg.filename && msg.status === "success") {
          if (this.file) {
            DropstripActions.removeFile(this.file);
          }
          this.props.onCompleted();
        } else if (msg.status === "failed") {
          this.props.onUploadError();
        }
      }
    });
  }

  onDrop(files) {
    DropstripActions.queueFile(files[0]);
    this.file = Object.values(DropstripStore.getQueue())[0];
  }

  onChange() {
    const file = Object.values(DropstripStore.getQueue())[0];
    this.setState({
      file
    });
  }

  onUpload() {
    DropstripActions.uploadFile({
      file: this.file.fileObject,
      title: this.props.title,
      contributors: this.props.contributors,
      tags: this.props.tags,
      name: this.file.name,
      originalFilename: this.props.filename
    });
    this.setState({
      progress: "uploading"
    });
  }

  onPause() {
    DropstripActions.pauseUpload(this.file.name);
    this.setState({
      progress: "paused"
    });
  }

  onResume() {
    DropstripActions.resumeUpload(this.file.name);
    this.setState({
      progress: "uploading"
    });
  }

  onUploadDifferent() {
    DropstripActions.removeFile(this.file);
    this.props.onCancelReplacing();
  }

  onCancelUpload() {
    this.onPause();
    this.props.onCancelReplacing();
    DropstripActions.removeFile(this.file);
    this.setState({
      progress: undefined
    });
  }

  render() {
    const dragActiveClass = this.state.isDragActive
      ? "upload__border--hover"
      : "";
    const file = this.state.file;
    const fileName = file ? file.name : undefined;
    const exists =
      file &&
      file.status.exists &&
      file.status.exists.filename !== this.props.filename;
    const dropzoneQueue = file;
    const fileStatus = dropzoneQueue ? dropzoneQueue.status : { progress: 0 };
    const progressBarStyle = {
      width: `${fileStatus.progress}%`
    };

    return (
      <div className="row dropzone__container">
        {fileName &&
          !this.state.progress &&
          (file.status && !exists) &&
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
          !file &&
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
            <div className="queue__text">
              Drag & drop your replacement WAV file here
            </div>
            <div className="upload__btn">Or, browse for your audio</div>
          </Dropzone>}
        {file &&
          exists &&
          <div className="exists__container">
            <div className="prompt__text row">
              A file already exists with the filename{" "}
              <strong>{file.name}</strong>. Do you want to go to that audio page
              or upload a different file?
            </div>
            <div className="row">
              <Link
                to={generateUrl({
                  id: file.status.exists.id,
                  title: file.status.exists.title
                })}
                className="exists__button audio__link"
              >
                Other audio page
              </Link>
              <button
                className="exists__button different__link"
                onClick={this.onUploadDifferent}
              >
                Upload a different file
              </button>
            </div>
          </div>}
        {(this.state.progress === "uploading" ||
          this.state.progress === "paused") &&
          <div className="uploading__container">
            <div className="row">
              <div className="col s10 filename">
                {fileName}
              </div>
              <div className="col s2 file__actions">
                <button
                  className="cancel-upload__link"
                  onClick={this.onCancelUpload}
                >
                  Cancel upload
                </button>
              </div>
            </div>
            {this.state.progress === "uploading" &&
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
                <div
                  className="progress-container__bar"
                  style={progressBarStyle}
                >
                  Loading ({fileStatus.progress}%)
                </div>
              </div>}
            {this.state.progress === "paused" &&
              <div className="progress-container paused">
                <button
                  className="progress-container__button--resume"
                  onClick={this.onResume}
                >
                  <img
                    src="/assets/images/button-resume_upload.png"
                    alt="Resume Upload"
                    className="progress-container__image"
                  />
                </button>
                <div
                  className="progress-container__bar--paused"
                  style={progressBarStyle}
                >
                  Paused at at {fileStatus.progress}%
                </div>
              </div>}
          </div>}
      </div>
    );
  }
}
