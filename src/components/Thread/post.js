import React, { Component, PropTypes } from 'react'
import Markdown from 'markdown-it'
import _ from 'lodash'
import cn from 'classnames'
import './thread.css'
import Dice from '../Dice'

const mdRenderer = new Markdown()

export default class Post extends Component {
  hasDiceToShow() {
    return !_.isEmpty(this.props.dice) && !_.isEmpty(this.props.hand)
  }

  renderDice() {
    if (_.isEmpty(this.props.dice)) { return null }
    const caption = `${this.props.author.name} rolled:`
    return <Dice dice={this.props.dice} caption={caption} />
  }

  renderHand() {
    if (_.isEmpty(this.props.hand)) { return null }
    const caption = `${this.props.author.name} has:`
    return <Dice dice={this.props.hand} caption={caption} />
  }

  render() {
    const { author, text } = this.props
    return (
      <section className='row post'>
        <div className='three columns'>
          <img alt='{author.name} avatar' src={author.avatar} />
          <h3 className='username'>{author.name}</h3>
        </div>
        <div className='nine columns'>
          <div className={cn({
            row: true,
            bottomBorder: this.hasDiceToShow()
          })}>
            <div className='text' dangerouslySetInnerHTML={{ __html: mdRenderer.render(text) }} />
          </div>
          <div className='row'>
            {this.renderDice()}
            {this.renderHand()}
          </div>
        </div>
      </section>
    )
  }

}

Post.defaultProps = {
  dice: [],
  hand: []
}

const arrayOfDice = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20']),
  value: PropTypes.number
}))

Post.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  imageURL: PropTypes.string,
  text: PropTypes.string.isRequired,
  dice: arrayOfDice,
  hand: arrayOfDice
}
