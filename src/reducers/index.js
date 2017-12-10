import { combineReducers } from 'redux'
import login from './login'
import friends from './friends'
import games from './games'

const rootReducer = combineReducers({
  login,
  friends,
  games
})

export default rootReducer
