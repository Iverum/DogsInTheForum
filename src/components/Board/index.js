import React, { Component } from 'react'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import Thread from './thread'

export default class Board extends Component {

  render() {
    return (
      <div className='twelve columns'>
        <h1>Board</h1>
        <ListView
          initData={[
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
            { name: 'Thread 1', postCount: 100 },
          ]}
          perPage={9}
        >
          <ListRows><Thread /></ListRows>
          <Pagination className='pagination' />
        </ListView>
      </div>
    )
  }

}
