import React from "react";
import Dropstrip from "./components/dropstrip/Dropstrip";
import Search from "./components/search/Search";
import Explorer from "./components/explorer/Explorer";
import WorkingOn from "./components/working-on/Working-on";
import WorkingOnStore from "./components/working-on/working-on-store";

export default class StoreManageApp extends React.Component {
  componentDidMount() {
    WorkingOnStore.get();
  }

  render() {
    return (
      <div className="body__container">
        <div className="row full-height upload">
          <Dropstrip />
          <WorkingOn />
          <Search />
          <Explorer />
        </div>
      </div>
    );
  }
}
