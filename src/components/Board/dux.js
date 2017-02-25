import _ from 'lodash'

// Actions
const ADD_THREAD = 'ditf/boards/ADD_THREAD'
const CLEAR_THREADS = 'ditf/boards/CLEAR_THREADS'

// Reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_THREAD: {
      /*
       * This runs the risk of becoming slow as we add more threads to a board. We
       * might want to consider indexing threads with a UUID in order to reduce the
       * time spent here.
       */
      const existingThread = _.find(state, thread => thread.uuid === action.data.uuid)
      if (!existingThread) {
        return [...state, action.data]
      }
      const newThreads = _.without(state, existingThread)
      const newThread = {
        ...existingThread,
        ...action.data
      }
      return [...newThreads, newThread]
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
