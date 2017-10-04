/* global document */

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import StoreManageApp from "./StoreManageApp";
import resoundAPI from "./services/resound-api";
import Audio from "./components/audio/Audio";
import "../styles/main.sass";

const auth = resoundAPI.auth;

class Root extends React.Component {
  redirectIfLoggedOut() {
    if (!auth.isAuthenticated) {
      console.log("LOGGED OUT");
      auth.login();
    }
  }

  render() {
    return (
      <div>
        <Route
          render={history =>
            <Header
              auth={auth}
              history={history}
              onEnter={this.redirectIfLoggedOut(this)}
            />}
        />
        {auth.isAuthenticated &&
          <div>
            <Route exact path="/" component={StoreManageApp} />
            <Route path="/audio/:id" component={Audio} />
          </div>}
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
