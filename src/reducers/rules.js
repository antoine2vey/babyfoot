import {
  FETCH_RULES_FAILURE,
  FETCH_RULES_SUCCESS,
  FETCH_RULES_START,
  SELECT_RULE
} from '../actionTypes'

const initialState = {
  isFetching: false,
  errors: [],
  rules: []
}

const rules = (state = initialState, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case FETCH_RULES_START: {
      return {
        ...state,
        isFetching: true
      }
    }
    case FETCH_RULES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        rules: action.rules
      }
    }
    case FETCH_RULES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      }
    }
    case SELECT_RULE: {
      return {
        ...state,
        rules: state.rules.map(rule => {
          if (rule._id === action.ruleId) {
            return {
              ...rule,
              selected: !state.rules.find(r => r._id === action.ruleId).selected
            }
          }

          return rule
        })
      }
    }
    default:
      return state
  }
  /* eslint-enable indent */
}

export default rules
