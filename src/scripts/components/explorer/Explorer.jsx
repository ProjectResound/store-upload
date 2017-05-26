import React from 'react';
import resoundAPI from './../../utils/resound-api';
import ExplorerStore from './explorer-store';
import ExplorerActions from './explorer-actions';
import AudioItem from './AudioItem';

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
              <th>File Name</th>
              <th>Date</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {this.state.audioList.map(audioItem => (
              <AudioItem key={audioItem.id} audioItem={audioItem} />
            ))}
          </tbody>
        </table>
        <img src="/assets/images/mascot.png" width="100%" className="explorer__mascot" />
      </div>
    );
  }
}

module.exports = Explorer;
