import React, { Component, PropTypes } from 'react';

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
      </div>
    )
  }

}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
