import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { expect } from "chai";
import CopyDownload from "../../src/scripts/components/audio/CopyDownload";

describe("<CopyDownload />", function() {
  beforeEach(() => {
    const audio = {
      files: {
        flac: "fake_url.flac",
        mp3_128: "fake_url.mp3"
      }
    };
    this.component = TestUtils.renderIntoDocument(
      <CopyDownload editing={false} audio={audio} />
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
  });

  context("when opened from CMS", () => {
    window.opener = "something";
    it("shows CMS column", () => {
      expect(
        TestUtils.findRenderedDOMComponentWithClass(this.component, "cms__icon")
      ).to.exist;
    });
  });
});
