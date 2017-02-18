import React, { Component } from 'react'

export default class Belongings extends Component {
  render() {
    return (
      <div className='row'>
        <h2>Belongings</h2>
        <div className='row'>
          <input className='two columns' type='text' placeholder='1d6' />
          <input className='ten columns' type='text' placeholder='What is this?' />
        </div>
        <input className='button' type='button' value='New Belonging' />
      </div>
    )
  }
}
