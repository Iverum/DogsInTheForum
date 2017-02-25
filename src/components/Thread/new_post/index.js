import React, { Component, PropTypes } from 'react'
import md5 from 'md5'
import handleCommands from './commands'

function buildGravatarURL(email) {
  const hash = md5(email.toLowerCase().trim())
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=175`
}

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
      post.userDice = post.dice
      delete post.dice
      this.props.onSubmit({
        username: this.props.user.name,
        imageURL: buildGravatarURL(this.props.user.email),
        ...post
      })
      this.setState({ value: '' })
    }
  }

  render() {
    if (!this.props.user.name) { return null }

    return (
      <div className="row">
        <textarea
          className="u-full-width"
          placeholder="I cast magic missile into the darkness!"
          value={this.state.value}
          onChange={this.handleChange}
        ></textarea>
        <input className="button-primary" type="submit" value="Submit" onClick={this.submitPost} />
      </div>
    )
  }

}

NewPost.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func
}
