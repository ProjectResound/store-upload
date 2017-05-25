import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils'
import expect from 'chai';
import Search from '../src/scripts/components/search/Search';

describe('<Search />', function() {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(<Search />);
    this.searchDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.searchDOM.parentNode);
  });

  it('renders a search component');

  context('user tapping on search button', () => {
    it('calls resoundAPI if there is a query');
    it('does nothing if there is no query');
  });

  context('when resoundAPI returns results', () => {

  });
});
