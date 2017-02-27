import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import _ from 'lodash'
import handleCommands from './commands'

export default class NewPost extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.submitPost = this.submitPost.bind(this)
    this.state = {
      value: '',
      character: undefined
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  submitPost(e) {
    if (this.props.onSubmit) {
      handleCommands(this.state.value, this.props.thread, this.state.character)
        .then(post => {
          post.hand = post.dice.hand
          post.dice = post.dice.rolledDice
          post = _.omitBy(post, property => property === undefined)
          this.props.onSubmit({
            ...post,
            author: this.props.user.id,
            created: moment().format()
          })
          this.setState({ value: '' })
        })
    }
  }

  render() {
    if (_.isEmpty(this.props.user)) { return null }

    return (
      <div className='row'>
        <textarea
          className='u-full-width'
          placeholder='I cast magic missile into the darkness!'
          value={this.state.value}
          onChange={this.handleChange}
        ></textarea>
        <div className='row'>
          <label htmlFor='postCharacter'>Character</label>
          <select
            id='postCharacter'
            className='u-full-width'
            value={this.state.character}
            onChange={event => {
              this.setState({ character: event.target.value })
            }}
          >
            <option key={'nocharacter'} value={undefined}>----</option>
            {_.values(this.props.characters).map(character => (
              <option key={character.uuid} value={character.uuid}>{character.name}</option>
            ))}
          </select>
        </div>
        <input className='button-primary' type='submit' value='Submit' onClick={this.submitPost} />
      </div>
    )
  }

}

NewPost.propTypes = {
  user: PropTypes.object,
  characters: PropTypes.object, // Specify more
  thread: PropTypes.string,
  onSubmit: PropTypes.func
}
