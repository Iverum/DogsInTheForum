import React, { Component, PropTypes } from 'react';

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
    // TODO parse post text for any special actions (ie dice rolls)
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: 'Default User',
        text: this.state.value
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
