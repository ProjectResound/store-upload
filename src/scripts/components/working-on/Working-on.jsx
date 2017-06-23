import React from 'react';
import WorkingOnStore from './working-on-store';
import WorkingOnActions from './working-on-actions';

export default class WorkingOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: []
    };
    WorkingOnActions.get();
  }

  componentDidMount() {
    WorkingOnStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    WorkingOnStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange(audios) {
    this.setState({
      audios
    });
  }

  render() {
    const audios = this.state.audios.map(
      audio =>
        <div className="working-on__audio col s4" key={audio.filename}>
          <div className="audio__title">
            <a href="linkToAudio">{audio.title}</a>
          </div>
          <div className="audio__date">
            {new Date(audio.created_at).toLocaleDateString()}
          </div>
        </div>
    );

    return (
      <div className="working-on col s9">
        <div className="working-on__header row">
          <div className="working-on__title col s8">
            What You&apos;ve Been Working On
          </div>
          <div className="working-on__more-link col s4">
            <a href="brokenfornow">See all your activity</a>
          </div>
        </div>
        <div className="working-on__audios">
          { audios }
        </div>
      </div>
    );
  }
}
