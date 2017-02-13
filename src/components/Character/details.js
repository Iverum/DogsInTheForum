import React, { Component } from 'react'

export default class CharacterDetails extends Component {

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

  renderBasicInformation() {
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

  renderStats(wrapperClass = 'six columns') {
    return (
      <div className={wrapperClass}>
        <h2>Stats</h2>
        <div className='row'>
          <label className='two columns' htmlFor='statAcuity'>Acuity</label>
          <input type='text' placeholder='2d6' id='statAcuity' />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statBody'>Body</label>
          <input type='text' placeholder='2d6' id='statBody' />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statHeart'>Heart</label>
          <input type='text' placeholder='2d6' id='statHeart' />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statWill'>Will</label>
          <input type='text' placeholder='2d6' id='statWill' />
        </div>
      </div>
    )
  }

  renderTraits(wrapperClass = 'six columns') {
    return (
      <div className={wrapperClass}>
        <h2>Traits</h2>
        <div className='row'>
          <input className='two columns' type='text' placeholder='2d6' />
          <input type='text' placeholder="I'm a good shot" />
        </div>
        <input className='button' type='button' value='New Trait' />
      </div>
    )
  }

  render() {
    return (
      <form className='twelve columns'>
        {this.renderBasicInformation()}
        <hr />
        <div className='row'>
          {this.renderStats()}
          {this.renderTraits()}
        </div>
        <hr />
        <input className='button-primary' type='submit' value='Update Character' />
      </form>
    )
  }

}
