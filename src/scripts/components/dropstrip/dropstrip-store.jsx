const AppDispatcher = require('../../dispatcher/app-dispatcher');
const resoundAPI = require('./../../utils/resound-api');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
const Flow = require('@flowjs/flow.js');

const dropzoneQueue = {};

const DropstripStore = assign({}, EventEmitter.prototype, {
  emitChange(successFlag) {
    this.emit('change', successFlag);
  },

  addChangeListener(cb) {
    this.on('change', cb);
  },

  removeChangeListener(cb) {
    this.removeListener('change', cb);
  },

  getQueue: () => dropzoneQueue,

  addToQueue: (file) => {
    dropzoneQueue[file.name] = {};
    dropzoneQueue[file.name].name = file.name;
    dropzoneQueue[file.name].fileObject = file;
    dropzoneQueue[file.name].size = Math.round(file.size / 10000) / 100;
    dropzoneQueue[file.name].status = {};
  },

  removeFromQueue: (file) => {
    delete dropzoneQueue[file.name];
  },

  upload(args) {
    const file = args.file;
    dropzoneQueue[args.file.name].title = args.title;
    dropzoneQueue[args.file.name].contributor = args.contributor;
    this.flow.addFile(file);
    this.flow.upload();
  },

  pause(filename) {
    dropzoneQueue[filename].flowFile.pause();
  },

  resume(filename) {
    dropzoneQueue[filename].flowFile.resume();
  },

  success(filename) {
    dropzoneQueue[filename].completed = true;
    resoundAPI.get();
  }
});

AppDispatcher.register((action) => {
  let successFlag;
  switch (action.actionType) {
    case 'ENQUEUE_FILE':
      DropstripStore.addToQueue(action.file);
      break;
    case 'REMOVE_FILE':
      DropstripStore.removeFromQueue(action.file);
      break;
    case 'UPLOAD_FILE':
      DropstripStore.upload(action);
      break;
    case 'PAUSE_UPLOAD':
      DropstripStore.pause(action.filename);
      break;
    case 'RESUME_UPLOAD':
      DropstripStore.resume(action.filename);
      break;
    case 'UPLOAD_SUCCESS':
      DropstripStore.success(action.filename);
      successFlag = 'success';
      break;
    default:
  }

  DropstripStore.emitChange(successFlag);
  return true;
});

DropstripStore.flow = new Flow({
  target: 'http://localhost:3000/api/v1/audios',
  chunkSize: 1024 * 1024,
  forceChunkSize: true,
  allowDuplicateUploads: true,
  testChunks: false,
  query: flowFile => ({
    title: dropzoneQueue[flowFile.name].title,
    contributor: dropzoneQueue[flowFile.name].contributor
  })
});

DropstripStore.flow.on('fileProgress', (flowFile) => {
  dropzoneQueue[flowFile.name].status.progress =
    parseInt(flowFile.progress() * 100, 10);
  DropstripStore.emitChange();
});

DropstripStore.flow.on('fileAdded', (flowFile) => {
  dropzoneQueue[flowFile.name].flowFile = flowFile;
});

DropstripStore.flow.on('fileError', (flowFile) => {
  dropzoneQueue[flowFile.name].failed = true;
  DropstripStore.emitChange('failed');
});

module.exports = DropstripStore;
