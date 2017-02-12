import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Link } from 'react-router'
import * as userActions from './dux'
import './index.css'

export class UserDetails extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    firebase.auth().signOut()
    this.props.dispatch(userActions.logOut())
    window.location.reload()
  }

  render() {
    if (!this.props.user.name) { return null }

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
