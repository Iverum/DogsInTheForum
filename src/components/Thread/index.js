import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './post'
import NewPost from './new_post'
import * as threadActions from './dux'

export class Thread extends Component {

  constructor(props) {
    super(props)
    this.createNewPost = this.createNewPost.bind(this)
  }

  createNewPost(post) {
    const { dispatch } = this.props
    const { uuid } = this.props.params
    dispatch(threadActions.addPost(uuid, post))
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
        <NewPost onSubmit={this.createNewPost} />
      </div>
    )
  }

}

export default connect(state => ({ threads: state.threads }))(Thread)
