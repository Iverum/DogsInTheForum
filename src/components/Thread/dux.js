// Actions
const ADD_POST = 'ditf/threads/ADD_POST'
const CLEAR_POSTS = 'ditf/threads/CLEAR_POSTS'

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ADD_POST: {
      const currentPosts = state[action.thread] || []
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
