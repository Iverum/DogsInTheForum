import _ from 'lodash'

// Actions
const ADD_POST = 'ditf/threads/ADD_POST'
const CLEAR_POSTS = 'ditf/threads/CLEAR_POSTS'

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ADD_POST: {
      const currentPosts = state[action.thread] || []
      /*
       * This runs the risk of becoming slow as we add more posts to a thread. We
       * might want to consider indexing posts with a UUID in order to reduce the
       * time spent here.
       */
      if (_.find(currentPosts, post => _.isEqual(post, action.data))) {
        return state
      }
      const newPosts = [...currentPosts, action.data]
      return {
        ...state,
        [action.thread]: newPosts
      }
    }

    case CLEAR_POSTS: {
      return {}
    }

    default: {
      return state
    }
  }
}

// Action creators
export function addPost(thread, post) {
  return {
    type: ADD_POST,
    data: post,
    thread
  }
}

export function clear() {
  return { type: CLEAR_POSTS }
}
