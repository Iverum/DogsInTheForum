import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import threadReducer from './components/Thread/dux'
import boardReducer from './components/Board/dux'

const rootReducer = combineReducers({
  threads: threadReducer,
  board: boardReducer,
  routing: routerReducer
})
const store = createStore(rootReducer)
export default store
