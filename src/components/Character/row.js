import React, { Component } from 'react'
import { Link } from 'react-router'

export default class CharacterRow extends Component {
  render() {
    const linkTo = `characters/${this.props.data.uuid}`
    return (
      <Link className='button u-full-width' to={linkTo}>
        {this.props.data.name}
      </Link>
    )
  }
}
