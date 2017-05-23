global.WebSocket = require('ws');
window.URL.createObjectURL = () => {
  'http://fakeurl.wav'
};

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils'
import Explorer from '../src/scripts/components/explorer/Explorer';
import AudioItem from '../src/scripts/components/explorer/AudioItem';

require('isomorphic-fetch');

const _ = require('underscore');
const expect = require('chai').expect;

describe('<Explorer />', function() {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(<Explorer />);
    this.stripDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.stripDOM.parentNode);
  });

  it('renders an AudioItem when a file is successfully uploaded', () => {

  });
});

