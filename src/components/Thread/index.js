import React, { Component } from 'react';
import { connect } from 'react-redux'
import Post from './post'
import NewPost from './new_post'
import * as threadActions from './dux';

class Thread extends Component {

  constructor(props) {
    super(props)
    this.createNewPost = this.createNewPost.bind(this)
  }

  createNewPost(post) {
    this.props.dispatch(threadActions.addPost(post))
  }

  renderPosts() {
    if (this.props.thread.length === 0) { return <p>There are no posts here yet!</p>}
    return this.props.thread.map((post, i) => {
      return (
        <Post
          key={i}
          {...post}
        />
      )
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="twelve columns">
        {this.renderPosts()}
        <hr />
        <NewPost onSubmit={this.createNewPost} />
      </div>
    )
  }

}

export default connect(state => ({ thread: state.thread }))(Thread)
