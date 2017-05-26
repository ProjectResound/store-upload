import React from 'react';
import Dropzone from 'react-dropzone';
import ActionCable from 'actioncable';
import DropstripActions from './dropstrip-actions';
import DropstripStore from './dropstrip-store';
import QueuedItem from './QueuedItem';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
const getStateFromStore = () => DropstripStore.getQueue();

class Dropstrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: getStateFromStore()
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this._initCable();
    DropstripStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DropstripStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      queue: getStateFromStore()
    });
  }

  onDrop(files) {
    this.onDragLeave();
    files.forEach((file) => {
      DropstripActions.queueFile(file);
    });
  }

  onDragEnter() {
    this.setState(
      {
        isDragActive: true
      }
    );
  }

  onDragLeave() {
    this.setState(
      {
        isDragActive: false
      }
    );
  }

  _initCable() {
    cable.subscriptions.create('FilesChannel', {
      received: (msg) => {
        if (msg.filename && msg.status === 'success') {
          DropstripActions.uploadSuccess(msg.filename);
        } else if (msg.status === 'failed') {
          DropstripActions.uploadFailed(msg.filename);
        }
      }
    });
  }

  render() {
    const dragActiveClass = this.state.isDragActive ? 'upload__border--hover' : '';
    const queueHasItems = Object.keys(this.state.queue).length > 0;
    const files = Object.keys(this.state.queue).map(
      queuedItem =>
        <QueuedItem
          key={this.state.queue[queuedItem].name}
          file={this.state.queue[queuedItem].fileObject}
        />
    );

    return (
      <Dropzone
        accept="audio/wav"
        className={`upload__dz col s3 ${dragActiveClass}`}
        onDragEnter={e => this.onDragEnter(e)}
        onDragLeave={e => this.onDragLeave(e)}
        onDrop={e => this.onDrop(e)}
      >
        <div className="upload__queue">
          <div className={queueHasItems ? 'queue__header' : 'hidden'}>
            Files You’re Uploading {this.state.isDragActive}
          </div>
          <div className="queueItems">
            {files}
          </div>
          <div className="queue__valigner">
            <div className={queueHasItems ? 'hidden' : 'valign'} >
              <div className="queue__text">
                Drag & drop your files here
              </div>
              <div className="upload__btn">
                Or, browse for files
              </div>
            </div>
          </div>
          <div className={queueHasItems ? 'queue__footer' : 'hidden'}>
            Drag & drop more files to add them to your queue
          </div>
        </div>
      </Dropzone>
    );
  }
}

module.exports = Dropstrip;
