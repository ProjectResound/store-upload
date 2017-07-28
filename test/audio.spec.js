import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils'
import {expect, assert} from 'chai';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import Audio from '../src/scripts/components/audio/Audio';
import AudioActions from '../src/scripts/components/audio/audio-actions';
import AudioStore from '../src/scripts/components/audio/audio-store';

sinonStubPromise(sinon);

describe('<Audio />', function() {
  beforeEach(() => {
    this.title = 'madeline says boohoo';
    this.audioId = '123';
    const fakeMatchObj = {
      params: { id: this.audioId }
    };
    this.component = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Audio match={fakeMatchObj}/>
      </MemoryRouter>);
    this.componentDOM = ReactDOM.findDOMNode(this.component);
    this.audioStub = sinon.stub(AudioStore, 'get').returns({
      title: this.title,
      id: this.audioId
    });
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
    this.audioStub.restore();
  });

  it('renders the audio.title', () => {
    AudioStore.emitChange();
    const titleDOM = TestUtils.findRenderedDOMComponentWithClass(this.component, 'audio-page__title');
    expect(titleDOM.innerHTML).to.eq(this.title);
  });

  describe('edit', () => {
    it('shows title input field', () => {
      AudioActions.edit(true);
      expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'title__input')).to.exist;
    });

    it('shows contributor input field', () => {
      AudioActions.edit(true);
      expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'contributors__input')).to.exist;
    });

    it('shows tags input field', () => {
      AudioActions.edit(true);
      expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'tags__input')).to.exist;
    });

    it('validates title field', () => {
      AudioActions.edit(true);

      const titleField = TestUtils.findRenderedDOMComponentWithClass(this.component, 'title__input');
      titleField.value = 'y';
      TestUtils.Simulate.change(titleField);

      expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'title__input--error')).to.exist;
      expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'edit__button--disabled')).to.exist;
    });

    it('validates contributor field', () => {
      AudioActions.edit(true);

      const contributorField = TestUtils.findRenderedDOMComponentWithClass(this.component, 'contributors__input');
      contributorField.value = '';
      TestUtils.Simulate.change(contributorField);

      expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'md__row--error')).to.exist;
      expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'edit__button--disabled')).to.exist;
    })
  });
});