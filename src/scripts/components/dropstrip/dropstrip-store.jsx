import { EventEmitter } from "events";
import assign from "object-assign";
import Flow from "@flowjs/flow.js";
import AppDispatcher from "../../dispatcher/app-dispatcher";
import resoundAPI from "../../services/resound-api";
import ExplorerActions from "../explorer/explorer-actions";
import ErrorsActions from "../errors/errors-actions";

// Allows a lot of QueuedItems in the dropzone queue to register
// their handlers.
EventEmitter.defaultMaxListeners = 100;

const dropzoneQueue = {};

const DropstripStore = assign({}, EventEmitter.prototype, {
  emitChange(successFlag) {
    this.emit("change", successFlag);
  },

  addChangeListener(cb) {
    this.on("change", cb);
  },

  removeChangeListener(cb) {
    this.removeListener("change", cb);
  },

  getQueue: () => dropzoneQueue,

  addToQueue: file => {
    resoundAPI
      .get(file.name)
      .then(resp => {
        const existingFile = resp.audios[0];
        if (existingFile) {
          dropzoneQueue[file.name].status.exists = {
            id: existingFile.id,
            filename: existingFile.filename,
            title: existingFile.title,
            tags: existingFile.tags,
            contributors: existingFile.contributors
          };
        }
        dropzoneQueue[file.name].status.checked = true;
        DropstripStore.emitChange();
      })
      .catch(err => {
        ErrorsActions.error(err);
      });
    buildQueueItem(file);
  },

  removeFromQueue: file => {
    delete dropzoneQueue[file.name];
  },

  clearQueue() {
    Object.keys(dropzoneQueue).forEach(filename => {
      delete dropzoneQueue[filename];
    });
  },

  upload(action) {
    const args = action.args;
    const file = args.file;
    dropzoneQueue[args.file.name].title = args.title;
    dropzoneQueue[args.file.name].contributors = args.contributors;
    dropzoneQueue[args.file.name].tags = args.tags;
    dropzoneQueue[args.file.name].originalFilename = args.originalFilename;
    this.flow.addFile(file);
    this.flow.upload();
  },

  pause(filename) {
    dropzoneQueue[filename].flowFile.pause();
  },

  resume(filename) {
    dropzoneQueue[filename].flowFile.resume();
  },

  retry(filename) {
    delete dropzoneQueue[filename].failed;
    dropzoneQueue[filename].flowFile.retry();
  },

  success(msg) {
    const filename = msg.filename;
    if (!dropzoneQueue[filename]) {
      dropzoneQueue[filename] = {};
      dropzoneQueue[filename].name = filename;
    }
    dropzoneQueue[filename].completed = msg.audio_id;
    resoundAPI
      .get(filename)
      .then(audioList => ExplorerActions.appendAudioList(audioList));
  },

  overwrite(filename) {
    dropzoneQueue[filename].status.exists = false;
  },

  failed(filename) {
    dropzoneQueue[filename].failed = true;
    this.emitChange("failed");
  }
});

const buildQueueItem = file => {
  dropzoneQueue[file.name] = {};
  dropzoneQueue[file.name].name = file.name;
  dropzoneQueue[file.name].fileObject = file;
  dropzoneQueue[file.name].size = Math.round(file.size / 10000) / 100;
  dropzoneQueue[file.name].status = {};
};

const buildFlowQuery = flowFile => {
  const queryObj = {
    title: dropzoneQueue[flowFile.name].title,
    contributors: dropzoneQueue[flowFile.name].contributors,
    tags: dropzoneQueue[flowFile.name].tags
  };
  if (dropzoneQueue[flowFile.name].originalFilename) {
    queryObj.originalFilename = dropzoneQueue[flowFile.name].originalFilename;
  }
  return queryObj;
};

AppDispatcher.register(action => {
  let successFlag;
  switch (action.actionType) {
    case "ENQUEUE_FILE":
      DropstripStore.addToQueue(action.file);
      break;
    case "REMOVE_FILE":
      DropstripStore.removeFromQueue(action.file);
      break;
    case "UPLOAD_FILE":
      DropstripStore.upload(action);
      break;
    case "PAUSE_UPLOAD":
      DropstripStore.pause(action.filename);
      break;
    case "RESUME_UPLOAD":
      DropstripStore.resume(action.filename);
      break;
    case "UPLOAD_SUCCESS":
      DropstripStore.success(action.msg);
      successFlag = "success";
      break;
    case "OVERWRITE":
      DropstripStore.overwrite(action.filename);
      break;
    case "UPLOAD_FAILED":
      DropstripStore.failed(action.filename);
      break;
    case "RETRY_UPLOAD":
      DropstripStore.retry(action.filename);
      break;
    default:
  }
  DropstripStore.emitChange(successFlag);
  return true;
});

DropstripStore.flow = new Flow({
  target: "http://localhost:3000/api/v1/audios",
  chunkSize: 1024 * 1024,
  forceChunkSize: true,
  allowDuplicateUploads: true,
  testChunks: false,
  headers: resoundAPI.headers,
  simultaneousUploads: 6,
  query: buildFlowQuery
});

DropstripStore.flow.on("fileProgress", flowFile => {
  if (dropzoneQueue[flowFile.name]) {
    dropzoneQueue[flowFile.name].status.progress = parseInt(
      flowFile.progress() * 100,
      10
    );
    DropstripStore.emitChange();
  }
});

DropstripStore.flow.on("fileAdded", flowFile => {
  if (dropzoneQueue[flowFile.name]) {
    dropzoneQueue[flowFile.name].flowFile = flowFile;
  }
});

DropstripStore.flow.on("fileError", flowFile => {
  DropstripStore.failed(flowFile.name);
});

export default DropstripStore;
