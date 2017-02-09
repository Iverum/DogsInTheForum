// Actions
const ADD_POST = "ditf/threads/ADD_POST"

// Reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_POST: {
      return [...state, action.data]
    }

    default: {
      return state
    }
  }
}

// Action creators
export function addPost(post) {
  return {
    type: ADD_POST,
    data: post
  }
}
