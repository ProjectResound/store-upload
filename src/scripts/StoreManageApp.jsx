import React from 'react';
import Dropstrip from './components/dropstrip/Dropstrip';
import Search from './components/search/Search';
import Explorer from './components/explorer/Explorer';
import WorkingOn from './components/working-on/Working-on';

export default class StoreManageApp extends React.Component {
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
