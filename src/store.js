import { createStore, combineReducers } from 'redux'
import threadReducer from './components/Thread/dux'
import boardReducer from './components/Board/dux'

const rootReducer = combineReducers({
  thread: threadReducer,
  board: boardReducer
})
const store = createStore(rootReducer)
export default store
