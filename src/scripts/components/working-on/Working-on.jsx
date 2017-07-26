import React from 'react';
import { Link } from 'react-router-dom';
import WorkingOnStore from './working-on-store';
import { generateUrl } from '../../services/audio-tools';


export default class WorkingOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    WorkingOnStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    WorkingOnStore.removeChangeListener(this.onChange);
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
            <Link to={generateUrl({ id: audio.id, title: audio.title })}>{audio.title}</Link>
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
