import React from "react";
import { expect } from "chai";
import ContributorStore from "../src/scripts/components/contributor/contributor-store";
import ContributorActions from "../src/scripts/components/contributor/contributor-actions";

describe("ContributorStore", function() {
  it("initializes with no contributors", () => {
    expect(ContributorStore.getList()).to.be.empty;
  });

  describe("add", function() {
    it("can add contributors to list", () => {
      ContributorActions.add("beck, weezer, nirvana");
      expect(ContributorStore.getList().length).to.eq(3);
    });
  });

  describe("add duplicates", function() {
    it("only adds new contributors", () => {
      const oldList = ContributorStore.getList().length;
      ContributorActions.add("raphael");
      ContributorActions.add("michelangelo, raphael, leonardo");
      const newList = ContributorStore.getList().length;

      expect(newList - oldList).to.eq(3);
    });
  });
});
