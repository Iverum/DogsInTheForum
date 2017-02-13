import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import firebase from 'firebase'
import config from './config'
import store from './store'
import Base from './components/Base'
import Board from './components/Board'
import Thread from './components/Thread'
import User from './components/User'
import * as userActions from './components/User/dux'

const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config)
    const auth = firebase.auth()
    auth.getRedirectResult()
      .then(result => {
        if (auth.currentUser) {
          store.dispatch(userActions.logIn({ name: auth.currentUser.displayName }))
        }
      })
  }

  router() {
    return (
      <Router history={history}>
        <Route path="/" component={Base}>
          <IndexRoute component={Board} />
          <Route path="thread/:uuid" component={Thread} />
          <Route path="user" component={User} />
        </Route>
      </Router>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Provider store={store}>
            {this.router()}
          </Provider>
        </div>
      </div>
    )
  }
}

export default App
