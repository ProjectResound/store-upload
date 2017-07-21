import React from 'react';
import bindHandlers from '../../services/bind-handlers';

export default class EditFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    bindHandlers(this,
      [
        'onChange',
        'edit',
        'save',
        'cancel'
      ]
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange() {
  }

  edit() {
    this.setState({
      editMode: true
    });
  }

  save() {
    this.setState({
      editMode: false
    });
  }

  cancel() {
    this.setState({
      editMode: false
    });
  }

  render() {
    const editting = this.state.editMode;
    return (
      <div className="edit__container">
        { editting &&
          <div>
            <button className="edit__button" onClick={this.save}>save changes</button>
            <button className="edit__button edit__cancel" onClick={this.cancel}>cancel</button>
          </div>
        }
        { !editting &&
          <button className="edit__button" onClick={this.edit}>edit file</button>
        }
      </div>
    );
  }
}
