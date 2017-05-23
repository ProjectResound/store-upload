import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Promise } from 'es6-promise';
import { expect } from 'chai';
import _ from 'underscore';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import moment from 'moment';
import Explorer from '../src/scripts/components/explorer/Explorer';
import ExplorerActions from '../src/scripts/components/explorer/explorer-actions';
import ExplorerStore from '../src/scripts/components/explorer/explorer-store';
import DropstripActions from '../src/scripts/components/dropstrip/dropstrip-actions';
import 'isomorphic-fetch';

sinonStubPromise(sinon);

describe('<Explorer />', function () {
  beforeEach(() => {
    this.stub = sinon.stub(global, 'fetch').returnsPromise();
    this.component = TestUtils.renderIntoDocument(<Explorer />);
    this.stripDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.stripDOM.parentNode);
    this.stub.restore();
  });

  const _respondWithFiles = (filesToMock = 1) => {
    const files = [];
    _(filesToMock).times((n) => {
      const createdDate = new Date();
      const updatedDate = new Date();
      createdDate.setDate(n);
      updatedDate.setDate(createdDate.getDate() + n);

      files.push({
        id: n,
        filename: `fakeFile_${n}.wav`,
        created_at: createdDate,
        updated_at: updatedDate,
        duration: 13,
        title: `fakeTitle_${n}`,
      });
    });
    return files;
  };

  it('requests a list from the api on mounting', () => {
    expect(this.stub.calledWith('http://localhost:3000/api/v1/audios')).to.be.true;
  });

  it('renders a list of files', () => {
    ExplorerActions.receiveAudioList(_respondWithFiles(5));
    const fileList = this.stripDOM.getElementsByClassName('explorer__table__audio-item');

    expect(fileList).to.have.length(5);
  });

  it('renders list of properties for each file', () => {
    ExplorerActions.receiveAudioList(_respondWithFiles());
    const audioItem = this.stripDOM.getElementsByClassName('explorer__table__audio-item')[0];
    const properties = Array.from(audioItem.children);
    let eachColumnIsRendered = true;
    properties.forEach((cell) => {
      if (!cell.innerHTML) eachColumnIsRendered = false;
    });

    expect(properties).to.have.length(4)
    expect(eachColumnIsRendered).to.be.true;
  });

  it('adds a single file after a successful upload', () => {
    const listBeforeUpload = ExplorerStore.getAudioList();
    const actionStub = { response: _respondWithFiles() };
    const listAfterUpload = ExplorerStore.getAudioList(actionStub);

    expect(listAfterUpload.length).to.equal(listBeforeUpload.length + 1)
  });

  it('sorts the files by updated_at', () => {
    const unsortedAudioList = _respondWithFiles(5).reverse();
    ExplorerActions.receiveAudioList(unsortedAudioList);

    const newlySortedAudioList = this.component.state.audioList;
    let isSorted = true;
    for (let i = 0; i < newlySortedAudioList.length - 1; i += 1) {
      const currentUpdatedDate = new Date(newlySortedAudioList[i].updated_at);
      const nextUpdatedDate = new Date(newlySortedAudioList[i + 1].updated_at);
      if (currentUpdatedDate < nextUpdatedDate) {
        isSorted = false;
      }
    }

    expect(isSorted).to.equal(true);
  });

  it('renders dates in the correct format', () => {
    ExplorerActions.receiveAudioList(_respondWithFiles());
    const dateFromDOM = this.stripDOM.getElementsByClassName('explorer__table__audio-item-date')[0];
    const date = new Date(dateFromDOM.innerHTML);

    let isDate = false;
    if (date !== 'Invalid Date' && !isNaN(date)) {
      isDate = true;
    }

    expect(isDate).to.be.true;
  });

  it('renders durations in the correct format', () => {
    ExplorerActions.receiveAudioList(_respondWithFiles());
    const durationFromDOM = this.stripDOM.getElementsByClassName('explorer__table__audio-item-duration')[0].innerHTML;
    const duration = moment(durationFromDOM, 'HH:mm:ss');

    expect(duration.isValid()).to.be.true;
  });
});

