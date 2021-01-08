import { combineReducers } from 'redux'
import appReducer from './app-reducer'
import postsReducer from './posts-reducer'

export default combineReducers({
  appReducer,
  postsReducer
})