import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import uuid from 'uuid/v4'
import './index.css'
import Thread from './thread'
import * as boardActions from './dux'

export class Board extends Component {

  constructor(props) {
    super(props)
    this.createThread = this.createThread.bind(this)
  }

  createThread() {
    this.props.dispatch(boardActions.addThread({
      uuid: uuid(),
      name: 'Thread Example',
      postCount: 0
    }))
  }

  render() {
    return (
      <div className='twelve columns'>
        <header className="row">
          <h1 className="nine columns">Board</h1>
          <input
            className="button-primary three columns"
            type="button"
            value="Create Thread"
            onClick={this.createThread}
          />
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

export default connect(state => ({ threads: state.board }))(Board)
