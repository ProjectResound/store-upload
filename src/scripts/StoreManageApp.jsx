import React from 'react';
import Dropstrip from './components/dropstrip/Dropstrip';
import Search from './components/search/Search';
import Explorer from './components/explorer/Explorer';

export default class StoreManageApp extends React.Component {
  render() {
    return (
      <div>
        <div className="row full-height upload">
          <Dropstrip />
          <Search />
          <Explorer />
        </div>
      </div>
    );
  }
}
