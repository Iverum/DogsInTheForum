import React, { Component, PropTypes } from 'react'

export default class Thread extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td style={{ textAlign: 'end' }}>{this.props.postCount}</td>
      </tr>
    )
  }

}

Thread.propTypes = {
  name: PropTypes.string.isRequired,
  postCount: PropTypes.number.isRequired
}
