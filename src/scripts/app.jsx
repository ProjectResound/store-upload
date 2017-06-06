/* global document */

import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Auth from './services/auth';
import Header from './components/Header';
import StoreManageApp from './StoreManageApp';

import '../styles/main.sass';

const auth = new Auth();

class Root extends React.Component {
  render() {
    return (
      <div>
        <Route render={history => <Header auth={auth} history={history} />} />
        { auth.isAuthenticated() &&
          <Route component={StoreManageApp} />
        }
        {
          !auth.isAuthenticated() &&
          <div>
            <h1>Logged Out View Placeholder</h1>
            <img src="/assets/images/mascot.png" width="400" />
          </div>
        }
      </div>
    );
  }
}

render((
  <Router>
    <Root />
  </Router>
), document.getElementById('root'));
