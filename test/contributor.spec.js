import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils'
import Contributor from '../src/scripts/components/contributor/Contributor';
import {expect} from 'chai';

describe('<Contributor />', function() {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(<Contributor />);
    this.componentDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
  });

  it('renders a Contributor', () => {
    return expect(this.component, 'to have rendered', <Contributor />);
  });
});
