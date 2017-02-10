import React, { Component } from 'react'
import './index.css'
import Thread from './thread'

export default class Board extends Component {

  render() {
    return (
      <div className='twelve columns'>
        <h1>Board</h1>
        <table className='u-full-width'>
          <thead>
            <tr>
              <th>Title</th>
              <th style={{ textAlign: 'end' }}>Posts</th>
            </tr>
          </thead>
          <tbody>
            <Thread
              name="Thread 1"
              postCount={100}
            />
          </tbody>
        </table>
      </div>
    )
  }

}
