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
const sinon = require('sinon');
const Promise = require('es6-promise').Promise;
const ExplorerActions = require('../src/scripts/components/explorer/explorer-actions');
const ExplorerStore = require('../src/scripts/components/explorer/explorer-store');
const DropstripActions = require('../src/scripts/components/dropstrip/dropstrip-actions');

describe('<Explorer />', function() {
  beforeEach(() => {
    global.audioList = [];
    this.component = TestUtils.renderIntoDocument(<Explorer />);
    this.stripDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.stripDOM.parentNode);
    global.audioList = [];
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
        duration: '13.31',
        title: `fakeTitle_${n}`,
      });
    });
    return files;
  };

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
    expect(eachColumnIsRendered).to.equal(true);
  });

  it('sorts the files by updated_at', () => {
    const unsortedAudioList = _respondWithFiles(5).reverse();
    ExplorerActions.receiveAudioList(unsortedAudioList);
    const newlySortedAudioList = ExplorerStore.getAudioList();
    let isSorted = true;
    for (let i = 0; i < newlySortedAudioList.length - 1; i++) {
      const currentUpdatedDate = new Date(newlySortedAudioList[i].updated_at);
      const nextUpdatedDate = new Date(newlySortedAudioList[i + 1].updated_at);
      if (currentUpdatedDate < nextUpdatedDate) {
        isSorted = false;
      }
    }

    expect(isSorted).to.equal(true);
  });

  it('adds a single file after a successful upload', () => {
    const newList = ExplorerStore.getAudioList();
    expect(newList).to.have.length(0);
    DropstripActions.uploadSuccess('fakeFile_0.wav');
    const audioItem = this.stripDOM.getElementsByClassName('explorer__table__audio-item');
    console.log(audioItem);
    expect(audioItem).to.exist;
  });
});

