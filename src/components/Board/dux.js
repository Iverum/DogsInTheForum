// Actions
const ADD_THREAD = 'ditf/boards/ADD_THREAD'
const CLEAR_THREADS = 'ditf/boards/CLEAR_THREADS'

// Reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_THREAD: {
      return [...state, action.data]
    }

    case CLEAR_THREADS: {
      return []
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

export function clear() {
  return { type: CLEAR_THREADS }
}
