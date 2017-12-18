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

export const fetchTeamsSuccess = ({ teams }) => ({
  type: ACTIONS.FETCH_TEAMS_SUCCESS,
  teams
})

export const joinGameSuccess = ({ team, gameId }) => ({
  type: ACTIONS.JOINED_GAME_SUCCESS,
  team,
  gameId
})

export const createGameSuccess = ({ game }) => ({
  type: ACTIONS.CREATE_GAME_SUCCESS,
  game
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

export const fetchTeams = token => dispatch => {
  axios
    .get(`${CONSTANTS.API_URL}/team`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(
        fetchTeamsSuccess({
          teams: res.data.teams
        })
      )
    })
    .catch(err => {
      console.log(err)
    })
}

export const joinGame = (gameId, team, token) => dispatch => {
  axios
    .post(
      `${CONSTANTS.API_URL}/game/join/${gameId}`,
      { teamId: team._id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      dispatch(
        joinGameSuccess({
          team,
          gameId
        })
      )
    })
    .catch(err => {
      console.log(err)
    })
}

export const createGame = (data, token) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${CONSTANTS.API_URL}/game`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch(createGameSuccess({ game: res.data.game }))

        resolve(true)
      })
      .catch(err => {
        console.log(err)
        reject(false)
      })
  })
}
