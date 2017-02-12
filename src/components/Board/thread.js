import React, { Component, PropTypes } from 'react'
import './thread.css'

export default class Thread extends Component {

  render() {
    return (
      <section className="row">
        <a href='#' className='ten columns'><h2 className='title'>{this.props.data.name}</h2></a>
        <span className='two columns post-count'>{this.props.data.postCount} posts</span>
      </section>
    )
  }

}

Thread.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired
  })
}
