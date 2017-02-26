// Actions
const LOG_IN = 'ditf/users/LOG_IN'
const LOG_OUT = 'ditf/users/LOG_OFF'
const ADD_USER = 'ditf/users/ADD_USER'

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        currentUser: action.data
      }
    }

    case LOG_OUT: {
      return {}
    }

    case ADD_USER: {
      const currentUsers = state.users
      return {
        ...state,
        users: {
          ...currentUsers,
          [action.data.id]: action.data
        }
      }
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

export function addUser(user) {
  return {
    type: ADD_USER,
    data: user
  }
}
