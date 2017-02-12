import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import threadReducer from './components/Thread/dux'
import boardReducer from './components/Board/dux'
import userReducer from './components/User/dux'

const rootReducer = combineReducers({
  threads: threadReducer,
  board: boardReducer,
  user: userReducer,
  routing: routerReducer
})
const store = createStore(rootReducer)
export default store
