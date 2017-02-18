import React, { Component } from 'react'

export default class BasicInfo extends Component {
  renderName(wrapperClass = 'row') {
    return (
      <div className={wrapperClass}>
        <label htmlFor='characterName'>Name</label>
        <input className='u-full-width' type='text' placeholder='John Doe' id='characterName' />
      </div>
    )
  }

  renderBackground(wrapperClass = 'row') {
    return (
      <div className={wrapperClass}>
        <label htmlFor='characterBackground'>Background</label>
        <input className='u-full-width' type='text' placeholder='Well Rounded' id='characterBackground' />
      </div>
    )
  }

  renderDescription(wrapperClass = 'six columns') {
    return (
      <div className={wrapperClass}>
        <label htmlFor='characterDescription'>Description</label>
        <textarea className='u-full-width' placeholder='Very average' id='characterDescription'></textarea>
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
