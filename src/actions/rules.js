import * as CONSTANTS from '../constants'
import axios from 'axios'
import {
  FETCH_RULES_FAILURE,
  FETCH_RULES_SUCCESS,
  FETCH_RULES_START,
  SELECT_RULE
} from '../actionTypes'

export const fetchRulesSuccess = rules => ({
  type: FETCH_RULES_SUCCESS,
  rules
})

export const fetchRulesStart = () => ({
  type: FETCH_RULES_START
})

export const fetchRulesFailure = errors => ({
  type: FETCH_RULES_FAILURE,
  errors
})

export const _selectRule = ruleId => ({
  type: SELECT_RULE,
  ruleId
})

export const selectRule = id => dispatch => dispatch(_selectRule(id))

const fetchRules = token => dispatch => {
  dispatch(fetchRulesStart())

  axios
    .get(`${CONSTANTS.API_URL}/rule`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      dispatch(fetchRulesSuccess(res.data.rules))
    })
    .catch(err => {
      dispatch(fetchRulesFailure(err.response.data.errors))
    })
}

const shouldFetchRules = state => {
  if (!state.rules.rules.length) {
    return true
  }

  return false
}

export const fetchRulesIfNeeded = token => (dispatch, getState) => {
  if (shouldFetchRules(getState())) {
    return dispatch(fetchRules(token))
  }

  return Promise.resolve()
}
