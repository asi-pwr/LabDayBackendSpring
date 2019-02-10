import React, { Component } from 'react';
import './styles/App.css';
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './components/Dashboard'
import BugForm from './components/BugForm'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/bug" component={BugForm} />
        </div>
      </Router>
    );
  }
}

export default App;
