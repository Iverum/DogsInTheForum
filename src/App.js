import React, { Component } from 'react';
import './App.css';
import Thread from './components/Thread'

class App extends Component {
  render() {
    return (
      <div className="App row">
        <Thread />
      </div>
    );
  }
}

export default App;
