import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar'
import labdayLogo from './labday.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ButtonAppBar />
        <img src={labdayLogo} className="App-logo" alt="Labday logo"/>
      </div>
    );
  }
}

export default App;
