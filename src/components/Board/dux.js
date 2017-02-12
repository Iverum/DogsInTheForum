// Actions
const ADD_THREAD = "ditf/boards/ADD_THREAD"

// Reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_THREAD: {
      return [...state, action.data]
    }

    default: {
      return state
    }
  }
}

// Action creators
export function addThread(thread) {
  return {
    type: ADD_THREAD,
    data: thread
  }
}
