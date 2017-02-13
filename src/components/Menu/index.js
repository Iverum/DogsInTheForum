import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserMenu from '../User/menu'

export class Menu extends Component {

  render() {
    return (
      <header clasName='row'>
        <h1>Dogs in the Forum</h1>
        <UserMenu user={this.props.user} />
      </header>
    )
  }

}

export default connect(state => ({user: state.user}))(Menu)
