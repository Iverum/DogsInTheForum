import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import firebase from 'firebase'
import config from './config'
import store from './store'
import * as userActions from './components/User/dux'
import * as characterActions from './components/Character/dux'

import Base from './components/Base'
import Board from './components/Board'
import Thread from './components/Thread'
import User from './components/User'
import Characters from './components/Character'
import CharacterDetails from './components/Character/Details'

const history = syncHistoryWithStore(browserHistory, store)

function updateCharacter(data) {
  store.dispatch(characterActions.addCharacter(data.val()))
}

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config)
    const auth = firebase.auth()
    auth.getRedirectResult()
      .then(result => {
        if (auth.currentUser) {
          const id = auth.currentUser.uid
          store.dispatch(userActions.logIn({ name: auth.currentUser.displayName, email: auth.currentUser.email }))
          this.characterRef = firebase.database().ref(`characters/${id}`)
          this.characterRef.off()
          this.characterRef.on('child_added', updateCharacter)
          this.characterRef.on('child_changed', updateCharacter)
        }
      })
  }

  componentWillUnmount() {
    this.characterRef.off()
    this.characterRef = null
  }

  router() {
    return (
      <Router history={history}>
        <Route path="/" component={Base}>
          <IndexRoute component={Board} />
          <Route path="thread/:uuid" component={Thread} />
          <Route path="characters" component={Characters} />
          <Route path="characters/:uuid" component={CharacterDetails} />
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
