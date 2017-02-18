import React, { Component } from 'react'

export default class Traits extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h2>Traits</h2>
        <div className='row'>
          <input className='two columns' type='text' placeholder='2d6' />
          <input className='ten columns' type='text' placeholder="I'm a good shot" />
        </div>
        <input className='button' type='button' value='New Trait' />
      </div>
    )
  }
}

Traits.defaultProps = {
  className: 'six columns'
}

Traits.propTypes = {
  className: React.PropTypes.string
}
