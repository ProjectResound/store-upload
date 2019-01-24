/* global document */
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { polyfill } from "es6-promise";
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

// Adds polyfill for Promise for Internet Explorer
polyfill();

class Root extends React.Component {
  redirectIfLoggedOut() {
    if (!auth.isAuthenticated) {
      auth.handleAuthentication();
    }
  }

  render() {
    return (
      <div>
        <Route
          render={history => {
            if (history.location.pathname === "/embed") {
              return null;
            } else {
              return (
                <Header
                  auth={auth}
                  history={history}
                  onEnter={this.redirectIfLoggedOut(this)}
                />
              );
            }
          }}
        />
        {auth.isAuthenticated && (
          <div>
            <Route exact path="/" component={StoreManageApp} />
            <Route path="/audio/:id" component={Audio} />
            <Route path="/activity" component={Activity} />
          </div>
        )}

        <Route path="/embed" component={Embed} />
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
