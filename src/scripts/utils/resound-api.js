const ExplorerActions = require('./../components/explorer/explorer-actions');

module.exports = {
  get: () => {
    fetch('http://localhost:3000/api/v1/audios')
      .then(response => response.json())
      .then(audioList => ExplorerActions.receiveAudioList(audioList));
  }
};
