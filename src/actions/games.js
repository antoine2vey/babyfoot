import * as CONSTANTS from '../constants'
import axios from 'axios'
import * as ACTIONS from '../actionTypes'

export const fetchGamesSuccess = ({ games }) => ({
  type: ACTIONS.FETCH_GAMES_SUCCESS,
  games
})

export const fetchGamesFailure = errors => ({
  type: ACTIONS.FETCH_GAMES_FAILURE,
  errors
})

export const fetchGamesStart = () => ({
  type: ACTIONS.FETCH_GAMES_START
})

export const fetchGames = token => dispatch => {
  dispatch(fetchGamesStart())

  axios
    .get(`${CONSTANTS.API_URL}/game`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(
        fetchGamesSuccess({
          games: res.data.games
        })
      )
    })
    .catch(err => {
      dispatch(fetchGamesFailure(err.response.data.errors))
    })
}
