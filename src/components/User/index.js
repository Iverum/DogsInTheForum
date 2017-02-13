import React, { Component } from 'react'
import { connect } from 'react-redux'

export class User extends Component {

  render() {
    return (
      <div className="twelve columns">
        <h1>{this.props.user.name}</h1>
      </div>
    )
  }

}

export default connect(state => ({ user: state.user }))(User)
