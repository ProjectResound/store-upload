import React from 'react';

const resoundAPI = require('./resound-api');
const ExplorerStore = require('./explorer-store');
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
    resoundAPI.get();
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
      <div>
        <h1>Explorer</h1>
        {this.state.audioList.map(audioItem => (
          <AudioItem key={audioItem.filename} audioItem={audioItem} />
        ))}
      </div>
    );
  }
}

module.exports = Explorer;
