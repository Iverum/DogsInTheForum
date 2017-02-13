import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import UserMenu from '../User/menu'

export class Menu extends Component {

  render() {
    return (
      <header>
        <Link to='/'><h1>Dogs in the Forum</h1></Link>
        <UserMenu user={this.props.user} />
      </header>
    )
  }

}

export default connect(state => ({user: state.user}))(Menu)
