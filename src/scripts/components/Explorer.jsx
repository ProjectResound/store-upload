import React from 'react';

class Explorer extends React.Component {

  render() {
    if (!this.props) {
      return null;
    }
    return (
      <h1>Explorer</h1>
    );
  }
}

module.exports = Explorer;
