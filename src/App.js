import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import firebase from 'firebase'
import md5 from 'md5'
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
  store.dispatch(characterActions.addPlayerCharacter(data.val()))
}

function saveUser(authUser) {
  const { uid: id, email, displayName: name } = authUser
  const hash = md5(email.toLowerCase().trim())
  const user = {
    id,
    name,
    email,
    avatar: `https://www.gravatar.com/avatar/${hash}?d=identicon&s=175`
  }
  store.dispatch(userActions.logIn(user))
  firebase.database().ref(`users/${id}`).set(user)
  return id
}

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config)
    const auth = firebase.auth()
    auth.getRedirectResult()
      .then(result => {
        if (auth.currentUser) {
          const id = saveUser(auth.currentUser)
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
