/* global document */
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import StoreManageApp from "./StoreManageApp";
import resoundAPI from "./services/resound-api";
import Audio from "./components/audio/Audio";
import Activity from "./components/activity/Activity";
import Embed from "./components/embed/Embed";
import "../styles/main.sass";

const Honeybadger = require("honeybadger-js");
Honeybadger.configure({
  apiKey: process.env.HONEYBADGER_CLIENT_KEY,
  environment: process.env.NODE_ENV
});

const auth = resoundAPI.auth;

class Root extends React.Component {
  redirectIfLoggedOut() {
    if (!auth.isAuthenticated) {
      auth.handleAuthentication();
    }
  }

  render() {
    return (
      <div>
        <Route path="/embed" component={Embed} />
        <Route
          render={history => (
            <Header
              auth={auth}
              history={history}
              onEnter={this.redirectIfLoggedOut(this)}
            />
          )}
        />
        {auth.isAuthenticated && (
          <div>
            <Route exact path="/" component={StoreManageApp} />
            <Route path="/audio/:id" component={Audio} />
            <Route path="/activity" component={Activity} />
          </div>
        )}
      </div>
    );
  }
}

render(
  <Router>
    <Root />
  </Router>,
  document.getElementById("root")
);
