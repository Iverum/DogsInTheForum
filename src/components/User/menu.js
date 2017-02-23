import React, { Component, PropTypes } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router'
import * as userActions from './dux'
import './menu.css'

export default class UserMenu extends Component {
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
        <Link className="button" to='/user'>{this.props.user.name}</Link>
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

UserMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
}
