import React, { Component } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './store'
import Thread from './components/Thread'

class App extends Component {
  render() {
    return (
      <div className="App row">
        <Provider store={store}>
          <Thread />
        </Provider>
      </div>
    )
  }
}

export default App
