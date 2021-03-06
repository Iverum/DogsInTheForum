import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './thread.css'

export default class Thread extends Component {

  render() {
    const linkTo = `thread/${this.props.data.uuid}`
    return (
      <section className="row">
        <Link to={linkTo} className='six columns'><h2 className='title'>{this.props.data.name}</h2></Link>
        <span className='four columns post-count'>created by {this.props.data.author}</span>
        <span className='two columns post-count'>{this.props.data.postCount} posts</span>
      </section>
    )
  }

}

Thread.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired
  })
}
