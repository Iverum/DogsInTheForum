import React, { Component } from 'react';
import Post from './post'
import NewPost from './new_post'

export default class Thread extends Component {

  render() {
    return (
      <div className="twelve columns">
        <Post />
        <Post />
        <NewPost />
      </div>
    )
  }

}
