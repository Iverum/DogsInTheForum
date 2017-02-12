import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import * as userActions from './dux'

class UserDetails extends Component {
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
      <div className="row">
        <input
          className="button-primary three columns"
          type="button"
          value="Log out"
          onClick={this.logOut}
        />
      </div>
    )
  }

}

export default connect(state => ({user: state.user}))(UserDetails)
