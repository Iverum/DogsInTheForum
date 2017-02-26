import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import _ from 'lodash'
import Post from './post'
import NewPost from './new_post'
import * as threadActions from './dux'
import * as userActions from '../User/dux'

export class Thread extends Component {

  constructor(props) {
    super(props)
    this.createNewPost = this.createNewPost.bind(this)
    this.updateThreadFromDatabase = this.updateThreadFromDatabase.bind(this)
  }

  componentWillMount() {
    const uuid = this.props.params.uuid
    this.postRef = firebase.database().ref(`posts/${uuid}`)
    this.postRef.off()
    this.postRef.on('child_added', this.updateThreadFromDatabase)
    this.postRef.on('child_changed', this.updateThreadFromDatabase)
  }

  componentWillUnmount() {
    this.postRef.off()
    this.postRef = null
    this.props.dispatch(threadActions.clear())
  }

  updateThreadFromDatabase(data) {
    const uuid = this.props.params.uuid
    const post = data.val()
    if (!_.has(this.props.users, post.author)) {
      firebase.database().ref(`users/${post.author}`).once('value', data => {
        this.props.dispatch(userActions.addUser(data.val()))
      })
    }
    this.props.dispatch(threadActions.addPost(uuid, post))
  }

  createNewPost(post) {
    // TODO handle post.hand & put the values somewhere
    const { threads, params } = this.props
    const thread = threads[params.uuid]
    let threadLength = 0
    if (thread) {
      threadLength = thread.length
    }
    this.postRef.push(post)
    firebase.database().ref(`threads/${params.uuid}`).child('postCount').set(threadLength + 1)
  }

  renderPosts() {
    const { threads, params } = this.props
    const thread = threads[params.uuid]
    if (!thread || thread.length === 0) { return <p>There are no posts here yet!</p>}
    return thread.map((post, i) => {
      return (
        <Post
          key={i}
          {...post}
          author={this.props.users[post.author]}
        />
      )
    })
  }

  render() {
    return (
      <div className="twelve columns">
        {this.renderPosts()}
        <hr />
        <NewPost
          user={this.props.user}
          onSubmit={this.createNewPost}
        />
      </div>
    )
  }

}

export default connect(state => ({
  threads: state.threads,
  user: state.users.currentUser,
  users: state.users.users
}))(Thread)
