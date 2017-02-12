import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import firebase from 'firebase'
import config from './config'
import './App.css'
import store from './store'
import Board from './components/Board'
import Thread from './components/Thread'

const history = syncHistoryWithStore(browserHistory, store)

console.log('Firebase', firebase)

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(config)
    const firebaseAuth = firebase.auth()
    firebaseAuth.getRedirectResult()
      .then(result => {
        if (firebaseAuth.currentUser) {
          console.log('HAS USER', firebaseAuth.currentUser.displayName)
        } else {
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('email');
          firebase.auth().signInWithRedirect(provider)
        }
      })
  }


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
