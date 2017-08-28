import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { expect, assert } from "chai";
import sinon from "sinon";
import sinonStubPromise from "sinon-stub-promise";
import Audio from "../../src/scripts/components/audio/Audio";
import AudioStore from "../../src/scripts/components/audio/audio-store";

sinonStubPromise(sinon);

const enterEditMode = component => {
  TestUtils.Simulate.click(
    TestUtils.scryRenderedDOMComponentsWithClass(component, "edit__button")[0]
  );
};

describe("<Audio />", function() {
  beforeEach(() => {
    this.title = "madeline says boohoo";
    this.audioId = "123";
    const fakeMatchObj = {
      params: { id: this.audioId }
    };
    this.component = TestUtils.renderIntoDocument(
      <Audio match={fakeMatchObj} />
    );
    this.componentDOM = ReactDOM.findDOMNode(this.component);
    this.audioStub = sinon.stub(AudioStore, "get").returns({
      title: this.title,
      id: this.audioId,
      files: { mp3: "123123123" }
    });
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.componentDOM.parentNode);
    this.audioStub.restore();
  });

  it("renders the audio.title", () => {
    AudioStore.emitChange();
    const titleDOM = TestUtils.findRenderedDOMComponentWithClass(
      this.component,
      "audio-page__title"
    );
    expect(titleDOM.innerHTML).to.eq(this.title);
  });

  it("renders a CopyDownload component", () => {
    AudioStore.emitChange();
    enterEditMode(this.component);
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        this.component,
        "copydownload__container"
      ).length
    ).to.equal(1);
  });

  it("shows input fields", () => {
    AudioStore.emitChange();
    enterEditMode(this.component);
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "title__input"
      )
    ).to.exist;
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "contributors__input"
      )
    ).to.exist;
    expect(
      TestUtils.findRenderedDOMComponentWithClass(this.component, "tags__input")
    ).to.exist;

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "replace__button"
      )
    ).to.exist;

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "audio__waveform--disabled"
      )
    ).to.exist;

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        this.component,
        "md__row--disabled"
      ).length
    ).to.equal(4);

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "copydownload__container--disabled"
      )
    ).to.exist;
  });

  it("validates title field", () => {
    AudioStore.emitChange();
    enterEditMode(this.component);

    const titleField = TestUtils.findRenderedDOMComponentWithClass(
      this.component,
      "title__input"
    );
    titleField.value = "y";
    TestUtils.Simulate.change(titleField);

    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "title__input--error"
      )
    ).to.exist;
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "edit__button--disabled"
      )
    ).to.exist;
  });

  it("pauses play if audio is playing", () => {
    this.component.setState({ playing: true });
    AudioStore.emitChange();
    expect(this.component.state.playing).to.be.truthy;
    enterEditMode(this.component);
    expect(this.component.state.playing).to.be.false;
  });

  describe("CopyDownload", () => {
    it("has a copy button on hover", () => {
      AudioStore.emitChange();
      const urlContainer = TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "url__hoverzone"
      );
      TestUtils.Simulate.mouseOver(urlContainer);

      expect(
        TestUtils.findRenderedDOMComponentWithClass(this.component, "hover")
      );
      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(this.component, "copied")
          .length
      ).to.equal(0);
    });
  });
});
