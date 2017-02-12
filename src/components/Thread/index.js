import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import Post from './post'
import NewPost from './new_post'
import UserDetails from '../User'
import * as threadActions from './dux'

export class Thread extends Component {

  constructor(props) {
    super(props)
    this.createNewPost = this.createNewPost.bind(this)
    this.updateThreadFromDatabase = this.updateThreadFromDatabase.bind(this)
  }

  componentWillMount() {
    const uuid = this.props.params.uuid
    const database = firebase.database()
    const threadPath = `threads/${uuid}`
    this.threadRef = database.ref(threadPath)
    this.threadRef.off()
    this.threadRef.on('child_added', this.updateThreadFromDatabase)
    this.threadRef.on('child_changed', this.updateThreadFromDatabase)
  }

  componentWillUnmount() {
    this.threadRef.off()
    this.threadRef = null
    this.props.dispatch(threadActions.clear())
  }

  updateThreadFromDatabase(data) {
    const uuid = this.props.params.uuid
    const post = data.val()
    this.props.dispatch(threadActions.addPost(uuid, post))
  }

  createNewPost(post) {
    this.threadRef.push(post)
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
        <UserDetails />
      </div>
    )
  }

}

export default connect(state => ({
  threads: state.threads,
  user: state.user
}))(Thread)
