import React from "react";
import Modal from "react-modal";
import Wavesurfer from "react-wavesurfer";
import AudioStore from "./audio-store";
import AudioActions from "./audio-actions";
import EditFile from "./EditFile";
import Metadata from "./Metadata";
import CopyDownload from "./CopyDownload";
import autoBind from "react-autobind";
import { isValidLength } from "../../services/audio-tools";
import ContributorStore from "../../components/contributor/contributor-store";
import SingleAudioDropzone from "./SingleAudioDropzone";
import DropstripStore from "../dropstrip/dropstrip-store";

const initialState = {
  inEditMode: false,
  validTitle: true,
  validContributors: true,
  playing: false,
  pos: 0
};

export default class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.MAX_CHAR_LENGTH = 4;
    this.state = initialState;
    this.baseState = this.state;
    this.wavesurfer = Wavesurfer;
    this.audioId = props.match.params.id.split("-")[0];
    autoBind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState(initialState);
    DropstripStore.clearQueue();
    this.audioId = newProps.match.params.id.split("-")[0];
    AudioStore.fetch(this.audioId);
  }

  componentDidMount() {
    AudioStore.addChangeListener(this.onChange);
    AudioStore.fetch(this.audioId);
    ContributorStore.addChangeListener(this.populateContributorsSuggestions);
  }

  componentWillUnmount() {
    AudioStore.removeChangeListener(this.onChange);
    ContributorStore.removeChangeListener(this.populateContributorsSuggestions);
    this.setState(this.baseState);
  }

  onChange(changeType) {
    const inEditMode = this.state.inEditMode;
    if (changeType === "saved") {
      this.setState({
        audio: AudioStore.get(),
        inEditMode
      });
    } else if (changeType === "validate") {
      this.setState({
        validContributor: AudioStore.getValidation()
      });
    } else if (changeType === "deleted") {
      this.props.history.push("/");
    } else {
      const audio = AudioStore.get();
      if (this.state.playing && inEditMode) {
        this.setState({
          playing: false
        });
      }
      this.setState({
        audio,
        inEditMode,
        formTitle: audio.title,
        formContributors: audio.contributors,
        formTags: audio.tags
      });
      if (!inEditMode) {
        this.setState({
          replacing: false,
          uploadError: false
        });
      }
    }
  }

  onTitleChange(e) {
    const str = e.target.value;
    const valid = !!isValidLength(str, this.MAX_CHAR_LENGTH);
    this.setState({
      formTitle: str,
      validTitle: valid
    });
  }

  onContributorsChange(str) {
    const valid = !!isValidLength(str, this.MAX_CHAR_LENGTH);
    this.setState({
      formContributors: str,
      validContributors: valid
    });
  }

  onTagsChange(e) {
    this.setState({
      formTags: e.target.value
    });
  }

  onCompletedUpload() {
    AudioStore.fetch(this.audioId);
    this.setState({ completed: true, replacing: false });
  }

  onUploadError() {
    this.setState({ replacing: false, uploadError: true, completed: false });
  }

  onReplacing() {
    this.setState({ replacing: true, completed: false, uploadError: false });
  }

  onCancelReplacing() {
    DropstripStore.clearQueue();
    this.setState({ replacing: false, completed: false, uploadError: false });
  }

  toggleEditMode(bool) {
    if (!bool) {
      DropstripStore.clearQueue();
      this.setState({ inEditMode: bool, replacing: false });
    } else {
      this.setState({ inEditMode: bool });
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleDeleteAudio() {
    this.setState({ showModal: false });
    AudioActions.delete();
  }

  handleTogglePlay() {
    if (this.state.inEditMode) {
      return;
    }
    this.setState({
      playing: !this.state.playing
    });
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }

  save() {
    if (
      !!isValidLength(this.state.formTitle, this.MAX_CHAR_LENGTH) &&
      !!isValidLength(this.state.formContributors, this.MAX_CHAR_LENGTH)
    ) {
      AudioActions.save({
        id: this.audioId,
        title: this.state.formTitle,
        contributors: this.state.formContributors,
        tags: this.state.formTags
      });
      this.toggleEditMode(false);
    }
  }

  populateContributorsSuggestions() {
    this.setState({
      contributorsSuggestions: ContributorStore.getList()
    });
  }

  render() {
    const audio = this.state.audio;
    const editing = this.state.inEditMode;
    const validForm = this.state.validTitle && this.state.validContributors;
    let replaceButtonClass = "hidden";
    if (editing && !this.state.replacing) {
      replaceButtonClass = "replace__button";
    }
    let fileItems;
    if (audio) {
      fileItems = Object.keys(audio.files).map(type =>
        <div key={type} className="file-list__item">
          {audio.files[type]}
        </div>
      );
    }

    const waveSurferOptions = {
      normalize: true,
      barWidth: 1,
      cursorWidth: 0,
      progressColor: "#0fb3cc",
      scrollParent: true,
      waveColor: "#a2e0e3",
      height: 75
    };

    return (
      <div>
        {audio &&
          <div className="audio-page__container">
            <Modal
              isOpen={this.state.showModal}
              contentLabel="Delete Modal"
              onRequestClose={this.handleCloseModal}
              className="modal"
              overlayClassName="modal__overlay"
            >
              Are you sure you want to permanently delete these files?
              <div className="row">
                <ul>
                  {fileItems}
                </ul>
              </div>
              <div className="row">
                <div className="delete__yes" onClick={this.handleDeleteAudio}>
                  Delete
                </div>
                <div className="delete__no" onClick={this.handleCloseModal}>
                  No
                </div>
              </div>
            </Modal>

            <div className="row">
              {!editing &&
                <h1 className="audio-page__title">
                  {audio.title}
                </h1>}
              {editing &&
                <div>
                  <input
                    className={
                      this.state.validTitle
                        ? "title__input"
                        : "title__input title__input--error"
                    }
                    type="text"
                    name="title"
                    value={this.state.formTitle}
                    onChange={this.onTitleChange}
                  />
                  <div
                    className={
                      this.state.validTitle ? "hidden" : "audio__alert"
                    }
                  >
                    Minimum length should be {this.MAX_CHAR_LENGTH} characters.
                  </div>
                </div>}
            </div>
            <div className="row">
              <div className="col s2 audio-actions__container">
                <div className="row">
                  <EditFile
                    audio={audio}
                    inEditMode={this.state.inEditMode}
                    onEdit={this.toggleEditMode}
                    validForm={validForm}
                    save={this.save}
                  />
                </div>
                <div
                  className="row delete__container"
                  onClick={() => this.setState({ showModal: true })}
                >
                  <img
                    src="/assets/images/icon-delete.png"
                    className="trash__icon"
                    alt="delete icon"
                  />
                  Delete this file
                </div>
              </div>
              <div className="col s10">
                {this.state.replacing &&
                  <SingleAudioDropzone
                    onCancelReplacing={this.onCancelReplacing}
                    onCompleted={this.onCompletedUpload}
                    onUploadError={this.onUploadError}
                    onEdit={this.toggleEditMode}
                    title={this.state.formTitle}
                    contributors={this.state.formContributors}
                    tags={this.state.formTags}
                    filename={audio.filename}
                  />}
                {!this.state.replacing &&
                  <div className="row">
                    <div
                      className={
                        editing
                          ? "playpause__container playpause__container--disabled"
                          : "playpause__container"
                      }
                    >
                      {this.state.playing &&
                        <img
                          src="/assets/images/button-pause_audio.png"
                          className="waveform__button__pause"
                          onClick={this.handleTogglePlay}
                        />}
                      {!this.state.playing &&
                        <img
                          src="/assets/images/button-play_audio.png"
                          className="waveform__button__play"
                          onClick={this.handleTogglePlay}
                        />}
                    </div>
                    <div className="waveform__container">
                      <div
                        className={editing ? "audio__waveform--disabled" : ""}
                      >
                        <Wavesurfer
                          audioFile={audio.files["mp3_128"]}
                          pos={this.state.pos}
                          onPosChange={this.handlePosChange}
                          playing={this.state.playing}
                          options={waveSurferOptions}
                        />
                      </div>
                      <button
                        className={replaceButtonClass}
                        onClick={this.onReplacing}
                      >
                        Replace audio
                      </button>
                      {this.state.completed &&
                        <div className="success__message">
                          Success! Your audio has been replaced
                        </div>}
                      {this.state.uploadError &&
                        <div className="error__message">
                          We couldn't replace your audio. Try uploading new
                          audio again.
                        </div>}
                    </div>
                  </div>}
                <Metadata
                  audio={audio}
                  editing={editing}
                  contributors={this.state.formContributors}
                  validContributors={this.state.validContributors}
                  onContributorsChange={this.onContributorsChange}
                  MAX_CHAR_LENGTH={this.MAX_CHAR_LENGTH}
                  tags={this.state.formTags}
                  onTagsChange={this.onTagsChange}
                  contributorsSuggestions={this.state.contributorsSuggestions}
                />
                {audio.files &&
                  <CopyDownload audio={audio} editing={editing} />}
              </div>
            </div>
          </div>}
      </div>
    );
  }
}
