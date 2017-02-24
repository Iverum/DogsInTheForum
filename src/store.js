import { createStore, combineReducers, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import persistState from 'redux-localstorage'

import threadReducer from './components/Thread/dux'
import boardReducer from './components/Board/dux'
import userReducer from './components/User/dux'
import characterReducer from './components/Character/dux'

const rootReducer = combineReducers({
  threads: threadReducer,
  board: boardReducer,
  user: userReducer,
  characters: characterReducer,
  routing: routerReducer
})

const middleware = compose(
  persistState(['threads', 'board', 'user', 'characters'])
)

const store = createStore(rootReducer, {}, middleware)
export default store
