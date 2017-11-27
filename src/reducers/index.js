import { combineReducers } from 'redux';
import login from './login'
import friends from './friends'

const rootReducer = combineReducers({
   login,
   friends
});

export default rootReducer
