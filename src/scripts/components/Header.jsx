import React from 'react';
import Errors from '../components/errors/Errors';
import UserStore from '../stores/user-store';
import WorkingOnActions from '../components/working-on/working-on-actions';
import ContributorActions from '../components/contributor/contributor-actions';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this._redirect = this._redirect.bind(this);
    this.props.auth.handleAuthentication();
    if (this.props.auth.isAuthenticated()) {
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
    if (this.props.auth.isAuthenticated()) {
      UserStore.addChangeListener(this._redirect);
      WorkingOnActions.get();
      ContributorActions.populateContributors();
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
    if (this.props.auth.isAuthenticated()) {
      this.setState({
        loggedIn: true
      });
    }
    this.props.history.history.push('/');
  }

  render() {
    const loggedIn = this.state.loggedIn;
    if (!this.props) {
      return null;
    }
    return (
      <div className="row">
        <Errors />
        <h1 className="header__h1 col s10">Resound Store + Manage</h1>
        <div className="col s2">
          <button className={loggedIn ? 'hidden' : 'header__button'} onClick={this.login}>Log in</button>
          <button className={loggedIn ? 'header__button' : 'hidden'} onClick={this.logout}>Log out</button>
        </div>
      </div>
    );
  }
}

