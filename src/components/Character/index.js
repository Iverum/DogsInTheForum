import React, { Component } from 'react'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import CharacterRow from './row'

export default class Character extends Component {

  render() {
    return (
      <div className='twelve columns'>
        <header className='row'>
          <h1 className="nine columns">Characters</h1>
          <input
            className="button-primary three columns"
            type="button"
            value="Create New Character"
          />
        </header>
        <div className='row'>
          <ListView
            initData={[
              { name: 'Test Character' },
              { name: 'Second Character' }
            ]}
            perPage={5}
          >
            <ListRows><CharacterRow /></ListRows>
            <Pagination className='pagination' />
          </ListView>
        </div>
      </div>
    )
  }

}
