import React from "react";
import autoBind from "react-autobind";
import Explorer from "../explorer/Explorer";

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="body__container">
        <div className="row">
          <h1>Your Activity</h1>
        </div>
        <div className="row">
          <Explorer byUser={true} />
        </div>
      </div>
    );
  }
}
