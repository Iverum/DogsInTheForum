import React, { Component } from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import './App.css'
import Thread from './components/Thread'
import threadReducer from './components/Thread/dux'

const rootReducer = combineReducers({ thread: threadReducer })
const store = createStore(rootReducer)

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
