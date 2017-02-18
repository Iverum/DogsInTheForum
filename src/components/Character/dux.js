// Actions
const ADD_CHARACTER = 'ditf/characters/ADD_CHARACTER'
const CLEAR_CHARACTERS = 'ditf/characters/CLEAR_CHARACTERS'

// Reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_CHARACTER: {
      return [...state, action.data]
    }

    case CLEAR_CHARACTERS: {
      return []
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

export function clear() {
  return { type: CLEAR_CHARACTERS }
}
