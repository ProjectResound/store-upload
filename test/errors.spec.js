import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils'
import {expect} from 'chai';
import Errors from '../src/scripts/components/errors/Errors';

describe('<Errors />', function() {

  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(<Errors />);
    this.errorsDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.errorsDOM.parentNode);
  });

  it('is hidden when there are no errors', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'errors__overlay').length).to.equal(0);
  });

  it('shows error overlay when there is an error', () => {
    this.component.setState({msg: 'lalala'});
    expect(TestUtils.findRenderedDOMComponentWithClass(this.component, 'errors__overlay')).to.exist;
  });

  context('dismiss()', () => {
    it('will hide the error when clicked on', () => {
      this.component.setState({msg: 'lalala'});

      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(this.component, 'errors__dismiss'));
      expect(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'errors__overlay').length).to.equal(0);
    });
  });
});