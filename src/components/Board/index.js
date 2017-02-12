import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView, ListRows, Pagination } from 'react-list-combo'
import Modal from 'react-modal'
import firebase from 'firebase'
import uuid from 'uuid/v4'
import './index.css'
import UserDetails from '../User'
import Thread from './thread'
import * as boardActions from './dux'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export class Board extends Component {

  constructor(props) {
    super(props)
    this.updateThreadsFromDatabase = this.updateThreadsFromDatabase.bind(this)
    this.createThread = this.createThread.bind(this)
    this.startCreatingThread = this.startCreatingThread.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onThreadNameChange = this.onThreadNameChange.bind(this)
    this.state = {
      threadName: '',
      creatingThread: false
    }
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
      name: this.state.threadName,
      postCount: 0
    }
    this.boardRef.push(newThread)
    this.closeModal()
  }

  updateThreadsFromDatabase(data) {
    const thread = data.val()
    this.props.dispatch(boardActions.addThread(thread))
  }

  startCreatingThread() {
    this.setState({
      creatingThread: true
    })
  }

  closeModal() {
    this.setState({
      creatingThread: false,
      threadName: ''
    })
  }

  onThreadNameChange(e) {
    this.setState({ threadName: e.target.value })
  }

  renderModal() {
    return (
      <Modal
        contentLabel='New thread name?'
        isOpen={this.state.creatingThread}
        onRequestClose={this.closeModal}
        style={customStyles}
      >
        <h1>Create New Thread</h1>
        <label htmlFor="threadName">Thread name</label>
        <input
          className="u-full-width"
          type="text"
          placeholder="My awesome thread"
          value={this.state.threadName}
          onChange={this.onThreadNameChange}
          id="threadName"
        />
        <input
          className="button-primary u-full-width"
          type="button"
          value="Create Thread"
          onClick={this.createThread}
        />
      </Modal>
    )
  }

  render() {
    return (
      <div className='twelve columns'>
        {this.renderModal()}
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
