import React from "react";
import autoBind from "react-autobind";
import Errors from "../components/errors/Errors";
import UserStore from "../stores/user-store";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
    this._redirect = this._redirect.bind(this);
    if (props.auth.isAuthenticated) {
      this.state.loggedIn = true;
    } else {
      this.state.loggedIn = false;
    }
  }

  componentDidMount() {
    UserStore.addChangeListener(this._redirect);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
    this.setState({
      loggedIn: false
    });
  }

  goHome() {
    window.location.assign("/");
  }

  _redirect() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        loggedIn: true
      });
    }
    this.props.history.history.push("/");
  }

  render() {
    const loggedIn = this.state.loggedIn;
    if (!this.props) {
      return null;
    }
    return (
      <div className="row header__row">
        <Errors />
        {this.state.loggedIn && (
          <div>
            <h1 className="header__h1 col s9">
              <img
                src="/assets/images/stamp.png"
                className="header__stamp"
                alt="Resound Store logo"
              />
              <span className="header__link" onClick={this.goHome}>
                store
              </span>
            </h1>
            <div className="header__actions col s3">
              <button className="header__button" onClick={this.logout}>
                log out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
