import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { expect, assert } from "chai";
import sinon from "sinon";
import sinonStubPromise from "sinon-stub-promise";
import Search from "../src/scripts/components/search/Search";
import ExplorerActions from "../src/scripts/components/explorer/explorer-actions";
import resoundAPI from "../src/scripts/services/resound-api";

sinonStubPromise(sinon);

describe("<Search />", function() {
  beforeEach(() => {
    this.component = TestUtils.renderIntoDocument(<Search />);
    this.searchDOM = ReactDOM.findDOMNode(this.component);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(this.searchDOM.parentNode);
  });

  it("renders the search form", () => {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        this.component,
        "search__form"
      )
    ).to.exist;
  });

  context("user tapping on search button", () => {
    let apiStub;

    beforeEach(() => {
      apiStub = sinon.stub(resoundAPI, "search").returnsPromise();
    });

    afterEach(() => {
      apiStub.restore();
    });

    it("calls resoundAPI if there is a query", () => {
      apiStub.resolves();

      TestUtils.Simulate.change(
        TestUtils.findRenderedDOMComponentWithClass(
          this.component,
          "search__query"
        ),
        { target: { value: "abracadabra" } }
      );
      TestUtils.Simulate.submit(
        TestUtils.findRenderedDOMComponentWithClass(
          this.component,
          "search__form"
        )
      );
      assert(apiStub.called);
    });

    it("does nothing if there is no query", () => {
      apiStub.resolves();

      TestUtils.Simulate.change(
        TestUtils.findRenderedDOMComponentWithClass(
          this.component,
          "search__query"
        ),
        { target: { value: "" } }
      );
      TestUtils.Simulate.submit(
        TestUtils.findRenderedDOMComponentWithClass(
          this.component,
          "search__form"
        )
      );
      assert(apiStub.notCalled);
    });

    it("inserts results with ExplorerActions when there are results", () => {
      const fileName1 = "your eyes, can I have them?";
      const fileName2 = "nope I still need them";
      const response = [{ filename: fileName1 }, { filename: fileName2 }];
      const explorerStub = sinon.stub(ExplorerActions, "parseAudioList");
      apiStub.resolves(response);

      TestUtils.Simulate.change(
        TestUtils.findRenderedDOMComponentWithClass(
          this.component,
          "search__query"
        ),
        { target: { value: "them" } }
      );
      TestUtils.Simulate.submit(
        TestUtils.findRenderedDOMComponentWithClass(
          this.component,
          "search__form"
        )
      );

      assert(explorerStub.calledWith(response));
    });
  });
});
