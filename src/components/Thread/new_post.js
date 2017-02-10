import React, { Component, PropTypes } from 'react';

function parseText(text) {
  const rollRegExp = /\[\[roll (\d*)(d\d+)\]\]/g
  let dice = []
  let die
  function convertMatchIntoDie(match, index) {
    if (die && index === 1) {
      dice.push(die)
    }
    if (index === 1) {
      die = { number: (match || 1) }
    } else if (index === 2) {
      die.size = match
    }
  }

  let matches = rollRegExp.exec(text)
  while (matches !== null) {
    matches.forEach(convertMatchIntoDie)
    matches = rollRegExp.exec(text)
  }
  if (die) { dice.push(die) }
  const newText = text.replace(rollRegExp, '').trim()
  return { dice, text: newText }
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
      const postInfo = parseText(this.state.value)
      this.props.onSubmit({
        username: 'Default User',
        text: postInfo.text
      })
      this.setState({ value: '' })
    }
  }

  render() {
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
  onSubmit: PropTypes.func
}
