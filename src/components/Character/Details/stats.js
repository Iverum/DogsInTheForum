import React, { Component } from 'react'

export default class Stats extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h2>Stats</h2>
        <div className='row'>
          <label className='two columns' htmlFor='statAcuity'>Acuity</label>
          <input className='ten columns' type='text' placeholder='2d6' id='statAcuity' />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statBody'>Body</label>
          <input className='ten columns' type='text' placeholder='2d6' id='statBody' />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statHeart'>Heart</label>
          <input className='ten columns' type='text' placeholder='2d6' id='statHeart' />
        </div>
        <div className='row'>
          <label className='two columns' htmlFor='statWill'>Will</label>
          <input className='ten columns' type='text' placeholder='2d6' id='statWill' />
        </div>
      </div>
    )
  }
}

Stats.defaultProps = {
  className: 'six columns'
}

Stats.propTypes = {
  className: React.PropTypes.string
}
