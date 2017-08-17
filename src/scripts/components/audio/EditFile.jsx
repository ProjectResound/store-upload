import React from "react";
import autoBind from "react-autobind";
import AudioActions from "./audio-actions";

export default class EditFile extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onChange() {}

  edit() {
    AudioActions.edit(true);
  }

  cancel() {
    AudioActions.edit(false);
  }

  render() {
    const editing = this.props.editMode;
    return (
      <div className="edit__container">
        {editing &&
          <div>
            {this.props.validForm &&
              <button className="edit__button" onClick={this.props.save}>
                save changes
              </button>}
            {!this.props.validForm &&
              <button className="edit__button edit__button--disabled">
                save changes
              </button>}
            <button className="edit__button edit__cancel" onClick={this.cancel}>
              cancel
            </button>
          </div>}
        {!editing &&
          <button className="edit__button" onClick={this.edit}>
            edit file
          </button>}
      </div>
    );
  }
}
