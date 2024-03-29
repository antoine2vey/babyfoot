import * as CONSTANTS from '../constants'
import axios from 'axios'
import { LOGGING_FAILURE, LOGGING_START, LOGGING_SUCCESS } from '../actionTypes'

export const loginSuccess = token => ({
  type: LOGGING_SUCCESS,
  token
})

export const loginStart = () => ({
  type: LOGGING_START
})

export const loginFailure = errors => ({
  type: LOGGING_FAILURE,
  errors
})

export const login = (email, password) => dispatch => {
  dispatch(loginStart())

  return new Promise((resolve, reject) => {
    axios
      .post(`${CONSTANTS.API_URL}/user/login`, { email, password })
      .then(res => {
        dispatch(loginSuccess(res.data.token))
        resolve({ token: res.data.token })
      })
      .catch(err => {
        dispatch(loginFailure(err.response.data.errors))
        reject({ errors: err.response.data.errors })
      })
  })
}
