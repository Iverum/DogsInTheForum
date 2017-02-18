import React, { Component } from 'react'

export default class BasicInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { character: this.props.character }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      character: nextProps.character
    })
  }

  renderName(wrapperClass = 'row') {
    return (
      <div className={wrapperClass}>
        <label htmlFor='characterName'>Name</label>
        <input
          className='u-full-width'
          type='text'
          placeholder='John Doe'
          id='characterName'
          value={this.state.character.name}
          onChange={event => {
            this.props.onChange('name', event.target.value)
          }}
        />
      </div>
    )
  }

  renderBackground(wrapperClass = 'row') {
    return (
      <div className={wrapperClass}>
        <label htmlFor='characterBackground'>Background</label>
        <select
          id='characterBackground'
          className='u-full-width'
          value={this.state.character.background}
          onChange={event => {
            this.props.onChange('background', event.target.value)
          }}
        >
          {Object.keys(this.props.backgrounds).map(background => {
            return <option key={background} value={background}>{background}</option>
          })}
        </select>
      </div>
    )
  }

  renderDescription(wrapperClass = 'six columns') {
    return (
      <div className={wrapperClass}>
        <label htmlFor='characterDescription'>Description</label>
        <textarea
          className='u-full-width'
          placeholder='Very average'
          id='characterDescription'
          value={this.state.character.description}
          onChange={event => {
            this.props.onChange('description', event.target.value)
          }}
        ></textarea>
      </div>
    )
  }

  render() {
    return (
      <div className='row'>
        <div className='six columns'>
          {this.renderName()}
          {this.renderBackground()}
        </div>
        {this.renderDescription()}
      </div>
    )
  }
}
