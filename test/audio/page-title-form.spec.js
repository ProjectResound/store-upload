import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { expect } from "chai";
import SfcWrapper from "../utils/sfc-wrapper";
import AudioPageTitleForm from "../../src/scripts/components/audio/AudioPageTitleForm";

describe("<AudioPlayPause />", function() {
  beforeEach(() => {
    this.componentDOM = {};
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
  });

  it("shows title and no input form by default", () => {
    this.component = TestUtils.renderIntoDocument(
      <SfcWrapper>
        <AudioPageTitleForm
          editing={false}
          validTitle={true}
          title="Here is a title la la la"
          value="Here is a title la la la"
          maxCharLength={4}
          onTitleChange={() => {}}
        />
      </SfcWrapper>
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "audio-page__title"
      )
    ).to.exist;

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(this.component, "input")
        .length
    ).to.equal(0);
  });

  it("shows input form when in edit mode", () => {
    this.component = TestUtils.renderIntoDocument(
      <SfcWrapper>
        <AudioPageTitleForm
          editing={true}
          validTitle={true}
          title="Here is a title la la la"
          value="Here is a title la la la"
          maxCharLength={4}
          onTitleChange={() => {}}
        />
      </SfcWrapper>
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);

    expect(TestUtils.findRenderedDOMComponentWithTag(this.component, "input"))
      .to.exist;
  });

  it("shows invalidation error of title when it's too short", () => {
    this.component = TestUtils.renderIntoDocument(
      <SfcWrapper>
        <AudioPageTitleForm
          editing={true}
          validTitle={false}
          title="Here is a title la la la"
          value="Here is a title la la la"
          maxCharLength={4}
          onTitleChange={() => {}}
        />
      </SfcWrapper>
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "audio__alert"
      )
    ).to.exist;
  });
});
