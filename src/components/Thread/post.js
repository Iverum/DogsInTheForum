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
    return (
      <div className="row post">
        <div className="three columns right-border">
          <h3>{this.props.username}</h3>
        </div>
        <div className='nine columns'>
          <div className={cn({ 'bottom-border': !_.isEmpty(this.props.userDice) })} dangerouslySetInnerHTML={{ __html: mdRenderer.render(this.props.text) }} />
          {this.renderDice()}
        </div>
      </div>
    )
  }

}

Post.defaultProps = {
  userDice: []
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  userDice: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20']),
    value: PropTypes.number
  }))
}
