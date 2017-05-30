import React from 'react';
import resoundAPI from './../../utils/resound-api';
import ExplorerStore from './explorer-store';
import ExplorerActions from './explorer-actions';
import AudioItem from './AudioItem';

const getStateFromStore = () => ExplorerStore.getAudioList();
const getTransitionStateFromStore = () => ExplorerStore.getTransitionState();

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioList: [],
      isAppending: false,
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
      audioList: getStateFromStore(),
      isAppending: getTransitionStateFromStore(),
    });
  }

  render() {
    if (!this.props) {
      return null;
    }

    return (
      <div className="explorer col s9">
        <div className="explorer__table col s12">
          <div className="row">
            <div className="explorer__table-header col s3">Title</div>
            <div className="explorer__table-header col s3">File Name</div>
            <div className="explorer__table-header col s3">Date</div>
            <div className="explorer__table-header col s3">Length</div>
          </div>
          {this.state.audioList.map((audioItem, index) => (
            <AudioItem
              index={index}
              isAppending={this.state.isAppending}
              key={audioItem.filename + audioItem.updated_at}
              audioItem={audioItem}
            />
          ))}
        </div>
        <img src="/assets/images/mascot.png" width="100%" className="explorer__mascot" />
      </div>
    );
  }
}

module.exports = Explorer;
