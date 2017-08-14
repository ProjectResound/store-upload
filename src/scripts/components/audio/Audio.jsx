import React from "react";
import Modal from "react-modal";
import Wavesurfer from "react-wavesurfer";
import AudioStore from "./audio-store";
import AudioActions from "./audio-actions";
import EditFile from "./EditFile";
import Metadata from "./Metadata";
import CopyDownload from "./CopyDownload";
import bindHandlers from "../../services/bind-handlers";
import { isValidLength } from "../../services/audio-tools";
import ContributorStore from "../../components/contributor/contributor-store";

export default class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.MAX_CHAR_LENGTH = 4;
    this.state = {
      inEditMode: false,
      validTitle: true,
      validContributors: true,
      playing: false,
      pos: 0
    };
    this.wavesurfer = Wavesurfer;
    this.audioId = props.match.params.id.split("-")[0];
    bindHandlers(this, [
      "onChange",
      "onTitleChange",
      "onContributorsChange",
      "onTagsChange",
      "save",
      "populateContributorsSuggestions",
      "handleCloseModal",
      "handleDeleteAudio",
      "handleTogglePlay",
      "handlePosChange"
    ]);
  }

  componentDidMount() {
    AudioStore.addChangeListener(this.onChange);
    AudioStore.fetch(this.audioId);
    ContributorStore.addChangeListener(this.populateContributorsSuggestions);
  }

  componentWillUnmount() {
    AudioStore.removeChangeListener(this.onChange);
    ContributorStore.removeChangeListener(this.populateContributorsSuggestions);
  }

  onChange(changeType) {
    if (changeType === "saved") {
      this.setState({
        audio: AudioStore.get(),
        inEditMode: AudioStore.inEditMode()
      });
    } else if (changeType === "validate") {
      this.setState({
        validContributor: AudioStore.getValidation()
      });
    } else if (changeType === "deleted") {
      this.props.history.push("/");
    } else {
      const audio = AudioStore.get();
      this.setState({
        audio,
        inEditMode: AudioStore.inEditMode(),
        formTitle: audio.title,
        formContributors: audio.contributors,
        formTags: audio.tags
      });
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

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleDeleteAudio() {
    this.setState({ showModal: false });
    AudioActions.delete();
  }

  handleTogglePlay() {
    console.log("toggle play");
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
    return (
      <div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Delete Modal"
          onRequestClose={this.handleCloseModal}
          className="modal"
          overlayClassName="modal__overlay"
        >
          Are you sure you want to permanently delete this file?
          <div className="row">
            <div className="delete__yes" onClick={this.handleDeleteAudio}>
              Yes
            </div>
            <div className="delete__no" onClick={this.handleCloseModal}>
              No
            </div>
          </div>
        </Modal>
        {audio &&
          <div className="audio-page__container">
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
                    editMode={this.state.inEditMode}
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
                <div className="row">
                  <div className="col s1">
                    <button onClick={this.handleTogglePlay}>Play</button>
                  </div>
                  <div className="col s11">
                    <Wavesurfer
                      audioFile={audio.files["mp3_128"]}
                      pos={this.state.pos}
                      onPosChange={this.handlePosChange}
                      playing={this.state.playing}
                    />
                  </div>
                </div>
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
                {audio.files && <CopyDownload audio={audio} />}
              </div>
            </div>
          </div>}
      </div>
    );
  }
}
