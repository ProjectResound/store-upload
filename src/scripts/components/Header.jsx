import React from 'react';

class Header extends React.Component {

  render() {
    if (!this.props) {
      return null;
    }
    return (
      <h1>Resound Store + Manage</h1>
    );
  }
}

module.exports = Header;
