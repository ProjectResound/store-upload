import React from "react";
import { Prompt } from "react-router-dom";
import Dropzone from "react-dropzone";
import ActionCable from "actioncable";
import autoBind from "react-autobind";
import DropstripActions from "./dropstrip-actions";
import DropstripStore from "./dropstrip-store";
import QueuedItem from "./QueuedItem";
import ContributorStore from "../contributor/contributor-store";
import ContributorActions from "../contributor/contributor-actions";
import { WS_URL } from "../../constants/api-urls";

const cable = ActionCable.createConsumer(WS_URL);
const getStateFromStore = () => DropstripStore.getQueue();
const getContributorsFromStore = () => ContributorStore.getList();

export default class Dropstrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: getStateFromStore(),
      contributors: getContributorsFromStore(),
      isBlocking: false
    };
    autoBind(this);
  }

  componentDidMount() {
    this._initCable();
    DropstripStore.addChangeListener(this.onChange);
    ContributorStore.addChangeListener(this.onContributorsChange);
    ContributorStore.get();
  }

  componentWillUnmount() {
    DropstripStore.removeChangeListener(this.onChange);
    ContributorStore.removeChangeListener(this.onContributorsChange);
  }

  onChange() {
    const queue = getStateFromStore();
    this.setState({
      queue,
      isBlocking: this._shouldBlock(queue)
    });
  }

  onContributorsChange() {
    this.setState({
      contributors: getContributorsFromStore()
    });
  }

  onDrop(files) {
    this.setState({ isBlocking: true });
    this.onDragLeave();
    files.forEach(file => {
      DropstripActions.queueFile(file);
    });
  }

  onDragEnter() {
    this.setState({
      isDragActive: true
    });
  }

  onDragLeave() {
    this.setState({
      isDragActive: false
    });
  }

  _shouldBlock(queue) {
    let successfulQueue = true;
    Object.keys(queue).forEach(filename => {
      successfulQueue = successfulQueue && queue[filename].completed;
    });
    return !successfulQueue;
  }

  _initCable() {
    cable.subscriptions.create("FilesChannel", {
      received: msg => {
        if (msg.filename && msg.status === "success") {
          DropstripActions.uploadSuccess(msg);
          ContributorActions.add(msg.contributors);
        } else if (msg.status === "failed") {
          DropstripActions.uploadFailed(msg.filename);
        }
      }
    });
  }

  render() {
    const dragActiveClass = this.state.isDragActive
      ? "upload__border--hover"
      : "";
    const queueHasItems = Object.keys(this.state.queue).length > 0;
    const files = Object.keys(this.state.queue).map(queuedItem => (
      <QueuedItem
        key={this.state.queue[queuedItem].name}
        file={this.state.queue[queuedItem].fileObject}
        contributors={this.state.contributors}
      />
    ));

    return (
      <Dropzone
        accept="audio/wav"
        className={`upload__dz ${dragActiveClass}`}
        onDragEnter={e => this.onDragEnter(e)}
        onDragLeave={e => this.onDragLeave(e)}
        onDrop={e => this.onDrop(e)}
      >
        <div className="upload__queue">
          <div className={queueHasItems ? "queue__header" : "hidden"}>
            Files You're Uploading {this.state.isDragActive}
          </div>
          <div className="queueItems">{files}</div>
          <div className="queue__valigner">
            <div className={queueHasItems ? "hidden" : "valign"}>
              <div className="queue__text">Drag & drop your WAV files here</div>
              <div className="upload__btn">Or, browse for files</div>
            </div>
          </div>
          <div className={queueHasItems ? "queue__footer" : "hidden"}>
            Drag & drop more files to add them to your queue
          </div>
        </div>
        <Prompt
          when={this.state.isBlocking}
          message={() =>
            `There is still audio in the dropzone. Is it okay to leave this page?`}
        />
      </Dropzone>
    );
  }
}
