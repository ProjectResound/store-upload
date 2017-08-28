import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import sinon from "sinon";
import Contributor from "../src/scripts/components/contributor/Contributor";
import { expect, assert } from "chai";

describe("<Contributor />", function() {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(<Contributor />);
    this.componentDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
  });

  it("renders a Contributor", () => {
    return expect(this.component, "to have rendered", <Contributor />);
  });

  it("when input is comma separated, show correct suggestions", () => {
    const suggestions = ["katie", "louise", "josie"];
    const stubbedFunc = () => {};
    this.component = TestUtils.renderIntoDocument(
      <Contributor
        contributorsSuggestions={suggestions}
        value=""
        onChangeContributor={stubbedFunc}
      />
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);
    const input = TestUtils.findRenderedDOMComponentWithTag(
      this.component,
      "input"
    );
    const spy = sinon.spy(this.component, "getSuggestions");
    TestUtils.Simulate.focus(input);
    input.value = "alex, k";
    TestUtils.Simulate.change(input);
    assert(spy.returned(["katie"]), "returns correct suggestion");
  });
});
