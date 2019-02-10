import React, { Component } from 'react';
import './styles/App.css';
import ButtonAppBar from './components/ButtonAppBar'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ButtonAppBar />
          <LoginForm />
        </div>
      </Router>
    );
  }
}

export default App;
