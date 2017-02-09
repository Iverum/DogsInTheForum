import React, { Component } from 'react';
import './App.css';
import Dice from './components/Dice'

class App extends Component {
  render() {
    return (
      <div className="App row">
        <Dice />
      </div>
    );
  }
}

export default App;
