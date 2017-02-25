import _ from 'lodash'

// Actions
const ADD_CHARACTER = 'ditf/characters/ADD_CHARACTER'

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ADD_CHARACTER: {
      return {
        ...state,
        [action.data.uuid]: action.data
      }
    }

    default: {
      return state
    }
  }
}

// Action creators
export function addCharacter(character) {
  return {
    type: ADD_CHARACTER,
    data: character
  }
}
