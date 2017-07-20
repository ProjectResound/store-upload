import AppDispatcher from '../../dispatcher/app-dispatcher';

module.exports = {
  queueFile: (file) => {
    AppDispatcher.dispatch({
      actionType: 'ENQUEUE_FILE',
      file
    });
  },
  removeFile: (file) => {
    AppDispatcher.dispatch({
      actionType: 'REMOVE_FILE',
      file
    });
  },
  uploadFile: (args) => {
    AppDispatcher.dispatch({
      actionType: 'UPLOAD_FILE',
      args
    });
  },
  pauseUpload: (filename) => {
    AppDispatcher.dispatch({
      actionType: 'PAUSE_UPLOAD',
      filename
    });
  },
  resumeUpload: (filename) => {
    AppDispatcher.dispatch({
      actionType: 'RESUME_UPLOAD',
      filename
    });
  },
  retryUpload: (filename) => {
    AppDispatcher.dispatch({
      actionType: 'RETRY_UPLOAD',
      filename
    });
  },
  uploadSuccess: (msg) => {
    AppDispatcher.dispatch({
      actionType: 'UPLOAD_SUCCESS',
      msg
    });
  },
  overwriteFile: (filename) => {
    AppDispatcher.dispatch({
      actionType: 'OVERWRITE',
      filename
    });
  },
  uploadFailed: (filename) => {
    AppDispatcher.dispatch({
      actionType: 'UPLOAD_FAILED',
      filename
    });
  }
};
