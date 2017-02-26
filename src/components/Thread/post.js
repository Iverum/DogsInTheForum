import React, { Component, PropTypes } from 'react'
import Markdown from 'markdown-it'
import _ from 'lodash'
import cn from 'classnames'
import './thread.css'
import Dice from '../Dice'

const mdRenderer = new Markdown()

export default class Post extends Component {
  renderDice() {
    if (_.isEmpty(this.props.userDice)) { return null }
    const caption = `${this.props.username} rolled:`
    return <Dice dice={this.props.userDice} caption={caption} />
  }

  render() {
    const { author, userDice, text } = this.props
    return (
      <section className='row post'>
        <div className='three columns'>
          <img alt='{author.name} avatar' src={author.avatar} />
          <h3 className='username'>{author.name}</h3>
        </div>
        <div className='nine columns'>
          <div className={cn({
            row: true,
            bottomBorder: !_.isEmpty(userDice)
          })}>
            <div className='text' dangerouslySetInnerHTML={{ __html: mdRenderer.render(text) }} />
          </div>
          <div className='row'>
            {this.renderDice()}
          </div>
        </div>
      </section>
    )
  }

}

Post.defaultProps = {
  userDice: [],
  imageURL: 'https://placehold.it/175x175'
}

Post.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  imageURL: PropTypes.string,
  text: PropTypes.string.isRequired,
  userDice: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20']),
    value: PropTypes.number
  }))
}
