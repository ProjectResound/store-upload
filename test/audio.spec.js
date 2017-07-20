import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils'
import {expect, assert} from 'chai';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import Audio from '../src/scripts/components/audio/Audio';
import resoundAPI from '../src/scripts/services/resound-api';

sinonStubPromise(sinon);

describe('<Audio />', function() {
  beforeEach(() => {
    this.title = 'madeline says boohoo';
    this.audioId = '123';
    const fakeMatchObj = {
      params: { id: this.audioId }
    };
    this.apiStub = sinon.stub(resoundAPI, 'getAudioById');
    this.apiPromise = this.apiStub.returnsPromise();
    this.component = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Audio match={fakeMatchObj}/>
      </MemoryRouter>);
    this.componentDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
    this.apiStub.restore();
  });

  it('renders the audio.title', () => {
    this.apiPromise.resolves({
      title: this.title,
      id: this.audioId
    });
    const titleDOM = TestUtils.findRenderedDOMComponentWithClass(this.component, 'audio-page__title');
    expect(titleDOM.innerHTML).to.eq(this.title);
  });
});