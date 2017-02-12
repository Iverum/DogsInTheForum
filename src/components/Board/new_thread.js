import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

export default class NewThreadDialog extends Component {
  constructor(props) {
    super(props)
    this.createThread = this.createThread.bind(this)
    this.startCreatingThread = this.startCreatingThread.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onThreadNameChange = this.onThreadNameChange.bind(this)
    this.state = {
      threadName: ''
    }
  }

  startCreatingThread() {
    this.setState({
      threadName: ''
    })
  }

  closeModal() {
    this.setState({
      threadName: ''
    })
    this.props.onRequestClose()
  }

  onThreadNameChange(e) {
    this.setState({ threadName: e.target.value })
  }

  createThread() {
    this.props.onSubmit(this.state.threadName)
    this.closeModal()
  }

  render() {
    return (
      <Modal
        contentLabel='New thread name?'
        isOpen={this.props.isVisible}
        onRequestClose={this.props.onRequestClose}
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

}

NewThreadDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
}
