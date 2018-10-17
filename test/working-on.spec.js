import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import TestUtils from "react-dom/test-utils";
import { expect } from "chai";
import WorkingOn from "../src/scripts/components/working-on/Working-on";
import WorkingOnStore from "../src/scripts/components/working-on/working-on-store";

describe("<WorkingOn />", function() {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(
      <Router>
        <WorkingOn />
      </Router>
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
  });

  it("shows audios if it exists", () => {
    WorkingOnStore.emitChange([
      {
        filename: "wav.wav",
        id: "123",
        title: "title mcTitle",
        createdAt: "2017-10-01"
      }
    ]);
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "working-on__audio"
      )
    ).to.exist;
  });

  it("shows nothing if no audios", () => {
    WorkingOnStore.emitChange();
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        this.component,
        "working-on__audio"
      ).length
    ).to.equal(0);
  });
});
