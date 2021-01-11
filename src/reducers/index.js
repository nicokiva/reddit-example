import { combineReducers } from 'redux'
import postsReducer from './posts-reducer'
import appReducer from './app-reducer'

export default combineReducers({
  postsReducer,
  appReducer
})