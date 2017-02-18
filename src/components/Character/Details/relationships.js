import React, { Component } from 'react'

export default class Relationships extends Component {
  render() {
    return (
      <div className='row'>
        <h2>Relationships</h2>
        <div className='row'>
          <input className='two columns' type='text' placeholder='2d6' />
          <input className='ten columns' type='text' placeholder='Who is this?' />
        </div>
        <input className='button' type='button' value='New Relationship' />
      </div>
    )
  }
}
