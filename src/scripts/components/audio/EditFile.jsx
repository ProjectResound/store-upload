import React from "react";
import autoBind from "react-autobind";

export default class EditFile extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const editing = this.props.inEditMode;
    return (
      <div className="edit__container">
        {editing && (
          <div>
            {this.props.validForm && (
              <button className="edit__button" onClick={this.props.save}>
                save changes
              </button>
            )}
            {!this.props.validForm && (
              <button className="edit__button edit__button--disabled">
                save changes
              </button>
            )}
            <button
              className="edit__button edit__cancel"
              onClick={() => {
                this.props.onEdit(false);
              }}
            >
              cancel
            </button>
          </div>
        )}
        {!editing && (
          <button
            className="edit__button"
            onClick={() => {
              this.props.onEdit(true);
            }}
          >
            edit file
          </button>
        )}
      </div>
    );
  }
}
