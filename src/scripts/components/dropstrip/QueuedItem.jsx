import React from "react";
import { Link } from "react-router-dom";
import Contributor from "../contributor/Contributor";
import DropstripActions from "./dropstrip-actions";
import DropstripStore from "./dropstrip-store";
import autoBind from "react-autobind";
import { generateUrl, isValidLength } from "../../services/audio-tools";

const getStateFromStore = () => DropstripStore.getQueue();

class QueuedItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      title: "",
      contributors: "",
      tags: "",
      errors: {},
      queue: getStateFromStore(),
      suggestions: []
    };

    this.MAX_CHAR_LENGTH = 4;
  }

  componentDidMount() {
    DropstripStore.addChangeListener(this.onChange);
    DropstripStore.addChangeListener(this.onSuccessOrFailure);
  }

  componentWillUnmount() {
    DropstripStore.removeChangeListener(this.onChange);
    DropstripStore.removeChangeListener(this.onSuccessOrFailure);
  }

  onChange(e) {
    let newState = {
      errors: this.state.errors
    };
    if (e === "success" || e === "failed") {
      this.onSuccessOrFailure();
      return;
    }
    if (e && e.target) {
      //  change event is triggered by filling out the form
      const fieldName = e.target.name;
      newState[fieldName] = e.target.value;
      if (!isValidLength(e.target.value, this.MAX_CHAR_LENGTH)) {
        newState.errors[fieldName] = true;
      } else {
        delete newState.errors[fieldName];
      }
    }
    const exists =
      this.state.queue[this.props.file.name] &&
      this.state.queue[this.props.file.name].status.exists;
    if (exists) {
      this.state.title = exists.title;
      this.state.tags = exists.tags;
      this.state.contributors = exists.contributors;
    }
    newState = Object.assign(this.state, newState);
    this.setState(newState);
  }

  onChangeContributor(contributorVal) {
    if (contributorVal < this.MAX_CHAR_LENGTH) {
      this.setState({
        errors: { contributors: true },
        contributors: contributorVal
      });
    } else {
      this.setState({
        errors: { contributors: false },
        contributors: contributorVal
      });
    }
  }

  onSuccessOrFailure() {
    const queue = getStateFromStore();
    this.setState(queue);
  }

  onPause() {
    DropstripActions.pauseUpload(this.props.file.name);
    this.setState({
      progress: "paused"
    });
  }

  onResume() {
    DropstripActions.resumeUpload(this.props.file.name);
    this.setState({
      progress: "uploading"
    });
  }

  onRetry() {
    DropstripActions.retryUpload(this.props.file.name);
    this.setState({
      progress: "uploading"
    });
  }

  onCancel(e) {
    e.stopPropagation();
    const fileName = this.props.file.name;
    if (
      this.state.progress === "uploading" ||
      this.state.progress === "paused"
    ) {
      DropstripActions.pauseUpload(fileName);
    }
    if (this.state.queue[fileName].completed) {
      this.onCancelConfirmed(true);
      return;
    }
    this.setState({
      previousState: this.state.progress,
      progress: "canceling"
    });
  }

  onCancelConfirmed(yesCancel) {
    if (yesCancel) {
      DropstripActions.removeFile(this.props.file);
    } else {
      this.setState({
        progress: this.state.previousState
      });
    }
  }

  onOverwrite(yesNo) {
    if (yesNo) {
      DropstripActions.overwriteFile(this.props.file.name);
    } else {
      this.onCancelConfirmed(true);
    }
  }

  onUpload(e) {
    e.preventDefault();
    DropstripActions.uploadFile({
      file: this.props.file,
      title: this.state.title,
      contributors: this.state.contributors,
      tags: this.state.tags
    });
    this.setState({
      progress: "uploading"
    });
  }

  render() {
    const form = this.state;
    const dropzoneQueue = this.state.queue;
    const file = this.props.file;
    const fileSize = Math.round(file.size / 10000) / 100;
    const fileStatus = dropzoneQueue[file.name].status;
    const hideTitleAlert = form.errors.title ? "" : "hidden";
    const hideContributorAlert = form.errors.contributors ? "" : "hidden";
    const hasErrors =
      !form.title ||
      !form.contributors ||
      form.errors.title ||
      form.errors.contributors;
    const progressBarStyle = {
      width: `${fileStatus.progress}%`
    };
    const completed = this.state.queue[file.name].completed;
    const failed = this.state.queue[file.name].failed;
    const showForm =
      fileStatus.checked && (!this.state.progress && !fileStatus.exists);

    return (
      <div
        onClick={e => e.stopPropagation()}
        className={fileStatus.checked ? "queued-item" : "hidden"}
      >
        <button
          className={
            this.state.progress === "canceling" || fileStatus.exists
              ? "hidden"
              : "queued-item__button--grey"
          }
          onClick={this.onCancel}
        >
          <img src="/assets/images/button-remove.png" />
        </button>
        <form
          onSubmit={this.onUpload}
          className={showForm ? "form__queuedItem" : "hidden"}
        >
          <div className="dz-details">
            <div className="queued-item__filename">
              {file.name}
            </div>
            <div className="row">
              <label htmlFor="title">Title</label>
              <input
                className="title queued-item__input-text"
                type="text"
                name="title"
                placeholder="What is this file about?"
                value={form.title}
                onChange={this.onChange}
              />
              <div className={`queued-item__alert ${hideTitleAlert}`}>
                You must provide a title (min {this.MAX_CHAR_LENGTH} chars).
              </div>
            </div>
            <Contributor
              hideContributorAlert={hideContributorAlert}
              contributorsSuggestions={this.props.contributors}
              value={this.state.contributors}
              onChangeContributor={this.onChangeContributor}
            />
            <div className="row">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                className="tags queued-item__input-text"
                name="tags"
                value={form.tags}
                placeholder="What's this about? (Separate with commas)"
                onChange={this.onChange}
              />
            </div>

            <div className="upload__text--right">
              <button
                type="submit"
                className="queued-item__button upload-button"
                disabled={hasErrors}
              >
                Upload this file
              </button>
            </div>
          </div>
        </form>
        <div
          className={
            this.state.progress === "uploading" && !completed && !failed
              ? "uploading-container"
              : "hidden"
          }
        >
          <div className="file-title">
            {form.title}
          </div>
          <div className="progress-container">
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
        </div>
        <div
          className={
            this.state.progress === "paused" ? "paused-container" : "hidden"
          }
        >
          <div className="file-title">
            {form.title}
          </div>
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
          </div>
        </div>
        <div
          className={
            this.state.progress === "canceling"
              ? "queued-item__prompt__centered"
              : "hidden"
          }
        >
          <div className="prompt__text">
            Are you sure you want to remove this file?
          </div>
          <div className="file-title">
            {file.name}
          </div>
          <a
            className="queued-item__button--yes"
            onClick={() => this.onCancelConfirmed(true)}
          >
            Yes
          </a>
          <a
            className="queued-item__button--no"
            onClick={() => this.onCancelConfirmed(false)}
          >
            No
          </a>
        </div>
        <div
          className={
            completed && this.state.progress !== "canceling"
              ? "completed-container success-container"
              : "hidden"
          }
        >
          <div className="queued-item__file-title">
            <img
              src="/assets/images/indicator-success.png"
              className="file-title__img"
            />
            {form.title}
          </div>
          <div className="row">
            <div className="col s6 completed__metadata">
              {fileSize}MB
            </div>
            <div className="col s6 completed__edit">
              <Link to={generateUrl({ id: completed, title: form.title })}>
                Edit this file
              </Link>
            </div>
          </div>
        </div>
        <div
          className={
            failed && this.state.progress !== "canceling"
              ? "completed-container queued-item__failed"
              : "hidden"
          }
        >
          <div className="file-title">
            <img
              src="/assets/images/indicator-failure.png"
              className="indicator"
            />
            {form.title}
          </div>
          <div className="queued-item__failed-msg">upload failed</div>
          <div className="upload__text--right">
            <div className="queued-item__button" onClick={() => this.onRetry()}>
              Try again
            </div>
          </div>
        </div>
        <div
          className={
            fileStatus.exists ? "queued-item__prompt__centered" : "hidden"
          }
        >
          <div className="prompt__text">
            A file already exists by that name. Do you want to overwrite it?
          </div>
          <br />
          <div className="file-title">
            {file.name}
          </div>
          <a
            className="queued-item__button--yes"
            onClick={() => this.onOverwrite(true)}
          >
            Yes
          </a>
          <a
            className="queued-item__button--no"
            onClick={() => this.onOverwrite(false)}
          >
            No
          </a>
        </div>
      </div>
    );
  }
}

module.exports = QueuedItem;
