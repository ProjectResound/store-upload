import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils'
import {expect, assert} from 'chai';
import sinon from 'sinon';
import auth0 from 'auth0-js';
import Header from '../src/scripts/components/Header';
import resoundAPI from '../src/scripts/services/resound-api';


describe('<Header />', function() {
  beforeEach(() => {
    const history = { history: [] };
    this.auth0Stub = sinon.stub(auth0.WebAuth.prototype, 'authorize');
    this.component = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Header auth={resoundAPI.auth} history={history} />
      </MemoryRouter>
    );
    this.headerDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.headerDOM.parentNode);
    this.auth0Stub.restore();
  });

  it('shows log in button', () => {
    const loginButton = TestUtils.findRenderedDOMComponentWithClass(this.component, 'header__button');
    expect(loginButton).to.exist;
    expect(loginButton.innerHTML).to.equal('log in');
  });

  it('clicking login will try to authorize the user', () => {
    const loginButton = TestUtils.findRenderedDOMComponentWithClass(this.component, 'header__button');
    TestUtils.Simulate.click(loginButton);

    assert(this.auth0Stub.called, 'auth0 has been called');
  });
});
