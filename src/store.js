import { createStore, combineReducers } from 'redux'
import threadReducer from './components/Thread/dux'

const rootReducer = combineReducers({ thread: threadReducer })
const store = createStore(rootReducer)
export default store
