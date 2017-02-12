// Actions
const LOG_IN = 'ditf/user/LOG_IN'
const LOG_OUT = 'ditf/user/LOG_OFF'

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOG_IN: {
      return action.data
    }

    case LOG_OUT: {
      return {}
    }

    default: {
      return state
    }
  }
}

export function logIn(user) {
  return {
    type: LOG_IN,
    data: user
  }
}

export function logOut() {
  return { type: LOG_OUT }
}
