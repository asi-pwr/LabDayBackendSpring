import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarComponent from '../calendar/CalendarComponent';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <CalendarComponent />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return { user };
}

const DashboardPage = connect(mapStateToProps)(Dashboard);
export { DashboardPage as Dashboard };
