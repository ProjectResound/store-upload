import React from 'react';

const Dropzone = require('react-dropzone');
const DropstripActions = require('./dropstrip-actions');
const DropstripStore = require('./dropstrip-store');
const QueuedItem = require('./QueuedItem.jsx');
const ActionCable = require('actioncable');

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

  updateView() {
    this.setState(
      {
        queue: getStateFromStore()
      }
    );
  }

  _initCable() {
    cable.subscriptions.create('FilesChannel', {
      received: (msg) => {
        if (msg.filename && msg.status === 'success') {
          DropstripActions.uploadSuccess(msg.filename);
        }
      }
    });
  }

  render() {
    const dragActiveClass = this.state.isDragActive ? 'dz-drag-hover' : '';
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
        className={`dropzone col s3 ${dragActiveClass}`}
        onDragEnter={e => this.onDragEnter(e)}
        onDragLeave={e => this.onDragLeave(e)}
        onDrop={e => this.onDrop(e)}
      >
        <div className="queue">
          <div className={queueHasItems ? 'header' : 'hidden'}>
            Files You’re Uploading {this.state.isDragActive}
          </div>
          <div className="queueItems">
            {files}
          </div>
          <div className="valign-wrapper">
            <div className={queueHasItems ? 'hidden' : 'valign'} >
              <div className="text">
                Drag & drop your files here
              </div>
              <div className="btn">
                Or, browse for files
              </div>
            </div>
          </div>
          <div className={queueHasItems ? 'footer' : 'hidden'}>
            Drag & drop more files to add them to your queue
          </div>
        </div>
      </Dropzone>
    );
  }
}

module.exports = Dropstrip;
