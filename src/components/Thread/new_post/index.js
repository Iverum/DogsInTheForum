import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import _ from 'lodash'
import handleCommands from './commands'

export default class NewPost extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.submitPost = this.submitPost.bind(this)
    this.state = { value: '' }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  submitPost(e) {
    if (this.props.onSubmit) {
      const post = handleCommands(this.state.value)
      post.hand = post.dice.hand
      post.dice = post.dice.rolledDice
      this.props.onSubmit({
        ...post,
        author: this.props.user.id,
        created: moment().format()
      })
      this.setState({ value: '' })
    }
  }

  render() {
    if (_.isEmpty(this.props.user)) { return null }

    console.log(this.props)
    return (
      <div className="row">
        <textarea
          className="u-full-width"
          placeholder="I cast magic missile into the darkness!"
          value={this.state.value}
          onChange={this.handleChange}
        ></textarea>
        <div className='row'>
          <label className='two columns' style={{ marginTop: '1rem', marginLeft: 0 }}>
            <input type='checkbox' />
            <span style={{ marginLeft: '1rem' }}>Show hand?</span>
          </label>
          <select className='ten columns'>
            {_.values(this.props.characters).map(character => {
              return <option key={character.uuid} value={character.uuid}>{character.name}</option>
            })}
          </select>
        </div>
        <input className="button-primary" type="submit" value="Submit" onClick={this.submitPost} />
      </div>
    )
  }

}

NewPost.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func
}
