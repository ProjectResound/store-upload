/* global document */

import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import StoreManageApp from './StoreManageApp';
import resoundAPI from './services/resound-api';
import '../styles/main.sass';

const auth = resoundAPI.auth;

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
