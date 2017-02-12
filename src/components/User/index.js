import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Link } from 'react-router'
import * as userActions from './dux'
import './index.css'

export class UserDetails extends Component {
  constructor(props) {
    super(props)
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  logIn() {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    firebase.auth().signInWithRedirect(provider)
  }

  logOut() {
    firebase.auth().signOut()
    this.props.dispatch(userActions.logOut())
    window.location.reload()
  }

  render() {
    if (!this.props.user.name) {
      return (
        <div className="User">
          <input
            className="button"
            type="button"
            value="Log in"
            onClick={this.logIn}
          />
        </div>
      )
    }

    return (
      <div className="User">
        <Link className="button">{this.props.user.name}</Link>
        <input
          className="button"
          type="button"
          value="Log out"
          onClick={this.logOut}
        />
      </div>
    )
  }

}

export default connect(state => ({user: state.user}))(UserDetails)
