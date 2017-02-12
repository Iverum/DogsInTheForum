import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import './App.css'
import store from './store'
import Board from './components/Board'
import Thread from './components/Thread'

const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {
  render() {
    return (
      <div className="App row">
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={Board} />
            <Route path="thread/:uuid" component={Thread} />
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
