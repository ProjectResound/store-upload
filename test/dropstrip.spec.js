global.WebSocket = require('ws');
window.URL.createObjectURL = () => {
  'http://fakeurl.wav'
};

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils'
import Dropstrip from '../src/scripts/components/dropstrip/Dropstrip';

require('isomorphic-fetch');

const _ = require('underscore');
const expect = require('chai').expect;
const sinon = require('sinon');
const Promise = require('es6-promise').Promise;
const Dropzone = require('react-dropzone');
const resoundAPI = require('../src/scripts/utils/resound-api');

describe('<Dropstrip />', function() {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(<Dropstrip />);
    this.stripDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.stripDOM.parentNode);
  });

  const _dropInMockFiles = (filesToMock = 1) => {
    const files = [];
    _(filesToMock).times((n) => {
      files.push({
        name: `fakeFile_${n}.wav`,
        size: `12${n}`,
        type: 'application/x-moz-file'
      });
    });
    const mockEvent = {
      dataTransfer: {
        files
      }
    };
    TestUtils.Simulate.drop(this.stripDOM, mockEvent);
  };

  it('renders a Dropzone', () => {
    return expect(this.component, 'to have rendered', <Dropzone />);
  });

  it('shows dotted border when something dragged onto Dropstrip', () => {
    TestUtils.Simulate.dragEnter(this.stripDOM);
    expect(this.stripDOM.className).to.contain('upload__border--hover');
  });

  it('removes dotted border when thing is dragged off Dropstrip', () => {
    TestUtils.Simulate.dragEnter(this.stripDOM);
    TestUtils.Simulate.dragLeave(this.stripDOM);
    expect(this.stripDOM.className).not.to.contain('upload__border--hover');
  });

  it('renders QueuedItems when an files dropped into Dropstrip', () => {
    _dropInMockFiles();
    expect(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'queued-item').length).to.equal(1);
  });

  it('shows cancellation message when user clicks cancel on a queuedItem', () => {
    _dropInMockFiles();
    const cancelButton = TestUtils.findRenderedDOMComponentWithClass(this.component, 'queued-item__button--grey');
    expect(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'queued-item__prompt__centered').length).to.equal(0);

    TestUtils.Simulate.click(cancelButton);

    expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'queued-item__prompt__centered')).to.exist;
  });

  it('removes the queuedItem when user confirms cancel click', () => {
    _dropInMockFiles();
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(this.component, 'queued-item__button--grey'));
    const yesCancel = TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'queued-item__button--yes')[0];

    TestUtils.Simulate.click(yesCancel);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'queued-item').length).to.equal(0);
  });

  it('disables/enables the upload button depending on validity of title and contributor', () => {
    _dropInMockFiles();
    expect(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'upload-button')[0].disabled).to.be.true;

    const titleInput = TestUtils.findRenderedDOMComponentWithClass(this.component, 'title');
    const contributorInput = TestUtils.findRenderedDOMComponentWithClass(this.component, 'contributor');

    TestUtils.Simulate.change(titleInput, {target: {value: 'here is a title', name: 'title'}});
    TestUtils.Simulate.change(contributorInput, {target: {value: 'Contributor McPants', name: 'contributor'}});

    expect(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'upload-button')[0].disabled).to.be.false;
  });

  it('queries the server on fileDrop to check for existing file', () => {
    const promise = new Promise((resolve) => {});
    const stub = sinon.stub(global, 'fetch').returns(promise);

    _dropInMockFiles();

    expect(stub.calledWith('http://localhost:3000/api/v1/audios?filename=fakeFile_0.wav')).to.be.true;
    global.fetch.restore();
  });
});


