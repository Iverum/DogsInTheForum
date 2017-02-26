import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import firebase from 'firebase'
import moment from 'moment'
import uuid from 'uuid/v4'
import './index.css'
import Thread from './thread'
import NewThread from './new_thread'
import * as boardActions from './dux'
import * as userActions from '../User/dux'

export class Board extends Component {

  constructor(props) {
    super(props)
    this.updateThreadsFromDatabase = this.updateThreadsFromDatabase.bind(this)
    this.startCreatingThread = this.startCreatingThread.bind(this)
    this.createThread = this.createThread.bind(this)
    this.endCreatingThread = this.endCreatingThread.bind(this)
    this.state = { creatingThread: false }
  }

  componentWillMount() {
    this.boardRef = firebase.database().ref('threads')
    this.boardRef.off()
    this.boardRef.on('child_added', this.updateThreadsFromDatabase)
    this.boardRef.on('child_changed', this.updateThreadsFromDatabase)
  }

  componentWillUnmount() {
    this.boardRef.off()
    this.boardRef = null
    this.props.dispatch(boardActions.clear())
  }

  startCreatingThread() {
    this.setState({
      creatingThread: true
    })
  }

  createThread(name) {
    const now = moment().format()
    const newThread = {
      uuid: uuid(),
      author: this.props.user.id,
      name,
      postCount: 0,
      created: now,
      updated: now
    }
    firebase.database().ref(`threads/${newThread.uuid}`).set(newThread)
  }

  endCreatingThread() {
    this.setState({
      creatingThread: false
    })
  }

  updateThreadsFromDatabase(data) {
    const thread = data.val()
    firebase.database().ref(`users/${thread.author}`).once('value', data => {
      this.props.dispatch(userActions.addUser(data.val()))
    })
    this.props.dispatch(boardActions.addThread(thread))
  }

  render() {
    const threads = this.props.threads.map(thread => {
      return {
        ...thread,
        author: this.props.users[thread.author].name
      }
    })

    return (
      <div className='twelve columns'>
        <NewThread
          isVisible={this.state.creatingThread}
          onSubmit={this.createThread}
          onRequestClose={this.endCreatingThread}
        />
        <header className="row">
          <h1 className="nine columns">Board</h1>
          <input
            className="button-primary three columns"
            type="button"
            value="Create Thread"
            onClick={this.startCreatingThread}
          />
        </header>
        <ListView
          initData={threads}
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

export default connect(state => ({
  threads: state.board,
  user: state.users.currentUser,
  users: state.users.users
}))(Board)
