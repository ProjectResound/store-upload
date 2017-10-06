import React from "react";
import { Link } from "react-router-dom";
import autoBind from "react-autobind";
import Errors from "../components/errors/Errors";
import UserStore from "../stores/user-store";
import ContributorStore from "../components/contributor/contributor-store";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  componentWillMount() {
    this._redirect = this._redirect.bind(this);
    if (this.props.auth.isAuthenticated) {
      this.setState({
        loggedIn: true
      });
    } else {
      this.setState({
        loggedIn: false
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      UserStore.addChangeListener(this._redirect);
      ContributorStore.get();
    }
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
        {this.state.loggedIn &&
          <div>
            <h1 className="header__h1 col s11">
              <img
                src="/assets/images/stamp.png"
                className="header__stamp"
                alt="Resound Store logo"
              />
              <Link to="/" className="header__link">
                store
              </Link>
            </h1>
            <div className="header__actions col s1">
              <button className="header__button" onClick={this.logout}>
                log out
              </button>
            </div>
          </div>}
      </div>
    );
  }
}
