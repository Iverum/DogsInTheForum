import _ from 'lodash'

// Actions
const ADD_CHARACTER = 'ditf/characters/ADD_CHARACTER'
const ADD_PLAYER_CHARACTER = 'ditf/characters/ADD_PLAYER_CHARACTER'

// Reducer
export default function reducer(state = { player: {} }, action = {}) {
  switch (action.type) {
    case ADD_CHARACTER: {
      return {
        ...state,
        [action.data.uuid]: action.data
      }
    }

    case ADD_PLAYER_CHARACTER: {
      return {
        ...state,
        player: {
          ...state.player,
          [action.data.uuid]: action.data
        }
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

export function addPlayerCharacter(character) {
  return {
    type: ADD_PLAYER_CHARACTER,
    data: character
  }
}
