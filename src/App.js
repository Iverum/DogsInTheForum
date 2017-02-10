import React, { Component } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './store'
import Board from './components/Board'

class App extends Component {
  render() {
    return (
      <div className="App row">
        <Provider store={store}>
          <Board />
        </Provider>
      </div>
    )
  }
}

export default App
