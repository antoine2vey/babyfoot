import { combineReducers } from 'redux'
import login from './login'
import friends from './friends'
import games from './games'
import rules from './rules'

const rootReducer = combineReducers({
  login,
  friends,
  games,
  rules
})

export default rootReducer
