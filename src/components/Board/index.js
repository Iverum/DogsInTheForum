import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import firebase from 'firebase'
import uuid from 'uuid/v4'
import './index.css'
import UserDetails from '../User'
import Thread from './thread'
import * as boardActions from './dux'


export class Board extends Component {

  constructor(props) {
    super(props)
    this.updateThreadsFromDatabase = this.updateThreadsFromDatabase.bind(this)
    this.createThread = this.createThread.bind(this)
  }

  componentWillMount() {
    const database = firebase.database()
    this.boardRef = database.ref('board')
    this.boardRef.off()
    this.boardRef.on('child_added', this.updateThreadsFromDatabase)
    this.boardRef.on('child_changed', this.updateThreadsFromDatabase)
  }

  componentWillUnmount() {
    this.boardRef.off()
    this.boardRef = null
  }

  createThread() {
    const newThread = {
      uuid: uuid(),
      author: this.props.user.name,
      name: 'Thread Example',
      postCount: 0
    }
    this.boardRef.push(newThread)
  }

  updateThreadsFromDatabase(data) {
    const thread = data.val()
    this.props.dispatch(boardActions.addThread(thread))
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
        <UserDetails />
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

export default connect(state => ({
  threads: state.board,
  user: state.user
}))(Board)
