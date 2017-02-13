import React, { Component } from 'react'
import { Link } from 'react-router'

export default class CharacterRow extends Component {
  render() {
    return (
      <Link className='button u-full-width'>
        {this.props.data.name}
      </Link>
    )
  }
}
