import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils'
import {expect} from 'chai';
import sinon from 'sinon';
import QueuedItem from '../src/scripts/components/dropstrip/QueuedItem';
import DropstripStore from '../src/scripts/components/dropstrip/dropstrip-store';

describe('<QueuedItem />', function() {
  beforeEach(() => {
    const filename = 'file.wav';
    const mockFile = {
      size: '1234',
      name: filename
    };
    const mockQueue = {};
    mockQueue[filename] = {
      name: filename,
      size: '1234',
      status: { },
      completed: true
    };
    this.storeMock = sinon.mock(DropstripStore);
    this.storeMock.expects('getQueue').atLeast(1).returns(mockQueue);

    this.component = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <QueuedItem file={mockFile} />
      </MemoryRouter>);
    this.componentDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
    this.storeMock.restore();
  });

  it('renders a QueuedItem', () => {
    return expect(this.component, 'to have rendered', <QueuedItem />);
  });

  it('on completed upload, removes QueuedItem when Cancel is clicked', () => {
    const cancelButton = TestUtils.findRenderedDOMComponentWithClass(this.component, 'queued-item__button--grey');
    const queuedItemComponent = TestUtils.findRenderedComponentWithType(this.component, QueuedItem);
    sinon.spy(queuedItemComponent, "onCancelConfirmed");

    TestUtils.Simulate.click(cancelButton);

    expect(queuedItemComponent.onCancelConfirmed.calledWith(true));
    expect(TestUtils.scryRenderedDOMComponentsWithClass(queuedItemComponent, 'queued-item__prompt__centered').length).to.equal(0);
  });
});
