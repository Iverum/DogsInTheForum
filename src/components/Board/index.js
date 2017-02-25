import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import firebase from 'firebase'
import uuid from 'uuid/v4'
import './index.css'
import Thread from './thread'
import NewThread from './new_thread'

export class Board extends Component {

  constructor(props) {
    super(props)
    this.startCreatingThread = this.startCreatingThread.bind(this)
    this.createThread = this.createThread.bind(this)
    this.endCreatingThread = this.endCreatingThread.bind(this)
    this.state = { creatingThread: false }
  }

  startCreatingThread() {
    this.setState({
      creatingThread: true
    })
  }

  createThread(name) {
    const newThread = {
      uuid: uuid(),
      author: this.props.user.name,
      name,
      postCount: 0
    }
    firebase.database().ref(`threads/${newThread.uuid}`).set(newThread)
  }

  endCreatingThread() {
    this.setState({
      creatingThread: false
    })
  }

  render() {
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

export default connect(state => ({
  threads: state.board,
  user: state.user
}))(Board)
