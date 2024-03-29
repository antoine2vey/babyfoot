import { LOGGING_FAILURE, LOGGING_START, LOGGING_SUCCESS } from '../actionTypes'

const initialState = {
  isLoggingIn: false,
  token: '',
  errors: []
}

const login = (state = initialState, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case LOGGING_START:
      return {
        ...state,
        isLoggingIn: true
      }
    case LOGGING_SUCCESS:
      return {
        ...state,
        isLoggingIn: initialState.isLoggingIn,
        errors: initialState.errors,
        token: action.token
      }
    case LOGGING_FAILURE:
      return {
        ...state,
        isLoggingIn: initialState.isLoggingIn,
        errors: action.errors,
        token: initialState.token
      }
    default:
      return state
  }
}

export default login
