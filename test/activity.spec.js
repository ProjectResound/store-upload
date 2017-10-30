import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { expect } from 'chai';
import Activity from '../src/scripts/components/activity/Activity';
import resoundApi from '../src/scripts/services/resound-api';

describe('<Activity />', function () {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Activity/>
      </MemoryRouter>
    );
    this.stripDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.stripDOM.parentNode);
  });

  it('calls resoundApi.getyByLoggedInUser', () => {
    const resoundStub = sinon.stub(resoundApi, 'getyByLoggedInUser');

    expect(resoundStub.called);
  });
});


