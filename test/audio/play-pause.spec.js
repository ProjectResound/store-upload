import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { expect } from "chai";
import SfcWrapper from "../utils/sfc-wrapper";
import AudioPlayPause from "../../src/scripts/components/audio/AudioPlayPause";

describe("<AudioPlayPause />", function() {
  beforeEach(() => {
    this.componentDOM = {};
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
  });

  it("shows play button by default", () => {
    this.component = TestUtils.renderIntoDocument(
      <SfcWrapper>
        <AudioPlayPause editing={false} playing={false} />
      </SfcWrapper>
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "waveform__button__play"
      )
    ).to.exist;
  });

  it("shows pause button when playing", () => {
    this.component = TestUtils.renderIntoDocument(
      <SfcWrapper>
        <AudioPlayPause editing={false} playing={true} />
      </SfcWrapper>
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "waveform__button__pause"
      )
    ).to.exist;
  });
});
