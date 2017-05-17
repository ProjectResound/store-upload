import React from 'react';

const resoundAPI = require('./../../utils/resound-api');
const ExplorerStore = require('./explorer-store');
const ExplorerActions = require('./explorer-actions');

const AudioItem = require('./AudioItem.jsx');

const getStateFromStore = () => ExplorerStore.getAudioList();

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioList: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ExplorerStore.addChangeListener(this.onChange);
    resoundAPI.get()
      .then(audioList => ExplorerActions.receiveAudioList(audioList));
  }

  componentWillUnmount() {
    ExplorerStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      audioList: getStateFromStore()
    });
  }

  render() {
    if (!this.props) {
      return null;
    }

    return (
      <div className="explorer col s9">
        <table className="explorer__table col s12" cellSpacing="0">
          <thead>
            <tr>
              <th className="explorer__table-header__title">Title</th>
              <th>Title</th>
              <th>Date</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {this.state.audioList.map(audioItem => (
              <AudioItem key={audioItem.filename} audioItem={audioItem} />
            ))}
          </tbody>
        </table>
        <img src="/assets/images/mascot.png" width="100%" className="explorer__mascot" />
      </div>
    );
  }
}

module.exports = Explorer;
