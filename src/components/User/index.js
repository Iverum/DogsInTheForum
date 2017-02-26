import React, { Component } from 'react'
import { connect } from 'react-redux'
import Characters from '../Character'

export class User extends Component {

  render() {
    return (
      <div className="twelve columns">
        <div className='row'>
          <img className='three columns' alt='{this.props.user.name} avatar' src={this.props.user.avatar} />
          <h1 className='nine columns'>{this.props.user.name}</h1>
        </div>
        <hr />
        <div className='row'>
          <Characters />
        </div>
      </div>
    )
  }

}

export default connect(state => ({ user: state.users.currentUser }))(User)
