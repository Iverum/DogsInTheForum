import React, { Component } from 'react'
import './index.css'

export default class Board extends Component {

  render() {
    return (
      <div className='twelve columns'>
        <h1>Board</h1>
        <ul className='u-full-width'>
          <li className='row'>
            <a className='ten columns' href='#'>Thread 1</a>
            <span className='two columns'>11 posts</span>
          </li>
          <li className='row'>
            <a className='ten columns' href='#'>Thread 2</a>
            <span className='two columns'>120 posts</span>
          </li>
          <li className='row'>
            <a className='ten columns' href='#'>Thread 3</a>
            <span className='two columns'>3 posts</span>
          </li>
        </ul>
      </div>
    )
  }

}
