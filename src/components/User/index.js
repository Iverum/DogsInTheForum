import React, { Component } from 'react'
import { connect } from 'react-redux'
import Characters from '../Character'

export class User extends Component {

  render() {
    return (
      <div className="twelve columns">
        <h1>{this.props.user.name}</h1>
        <hr />
        <div className='row'>
          <Characters />
        </div>
      </div>
    )
  }

}

export default connect(state => ({ user: state.user }))(User)
