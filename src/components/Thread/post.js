import React, { Component, PropTypes } from 'react'
import Dice from '../Dice'

export default class Post extends Component {

  render() {
    return (
      <div className="row">
        <div className="three columns">
          <h3>{this.props.username}</h3>
        </div>
        <div className="nine columns">
          <p>{this.props.text}</p>
        </div>
        <Dice dice={this.props.dice} />
      </div>
    )
  }

}

Post.defaultProps = {
  dice: []
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  dice: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20']),
    value: PropTypes.number
  }))
}
