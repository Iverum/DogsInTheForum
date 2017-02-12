import React, { Component } from 'react'
import UserDetails from '../User'

export default class Menu extends Component {

  render() {
    return (
      <header clasName='row'>
        <h1>Dogs in the Forum</h1>
        <UserDetails />
      </header>
    )
  }

}
