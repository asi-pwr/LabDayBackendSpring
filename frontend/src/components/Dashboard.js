import React, { Component } from "react";
import {connect} from "react-redux";

class Dashboard extends Component {
  constructor(props){
      super(props);
  }

  render() {
      const { user } = this.props;
      console.log('user: ' + user);
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {  user };
}

const DashboardPage = connect(mapStateToProps)(Dashboard);
export { DashboardPage as Dashboard };