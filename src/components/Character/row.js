import React, { Component } from 'react'
import { Link } from 'react-router'

export default class CharacterRow extends Component {
  render() {
    return (
      <Link className='button u-full-width' to='characters/c4c1b0ad-4872-43cc-81b1-fb1a0ca77002'>
        {this.props.data.name}
      </Link>
    )
  }
}
