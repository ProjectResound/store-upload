import React from 'react';
import ErrorsStore from './errors-store';

export default class Errors extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: undefined };
    this._displayError = this._displayError.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    ErrorsStore.addChangeListener(this._displayError);
  }

  componentWillUnmount() {
    ErrorsStore.removeChangeListener(this._displayError);
  }

  dismiss() {
    this.setState({
      msg: undefined
    });
  }

  _displayError(err) {
    this.setState({
      msg: err
    });
  }

  render() {
    const msg = this.state.msg;
    return (
      <div className={msg ? 'errors__overlay col s12' : 'hidden'}>
        {msg}
        <div className="errors__dismiss" onClick={this.dismiss}>
          ✖
        </div>
      </div>
    );
  }
}

