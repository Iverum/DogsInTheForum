import React, { Component, PropTypes } from 'react'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import './index.css'
import Thread from './thread'

export default class Board extends Component {

  render() {
    return (
      <div className='twelve columns'>
        <header className="row">
          <h1 className="nine columns">Board</h1>
          <input className="button-primary three columns" type="button" value="Create Thread" />
        </header>
        <ListView
          initData={this.props.threads}
          perPage={9}
        >
          <ListRows><Thread /></ListRows>
          <Pagination className='pagination' />
        </ListView>
      </div>
    )
  }

}

Board.defaultProps = {
  threads: []
}

Board.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired
  }))
}
