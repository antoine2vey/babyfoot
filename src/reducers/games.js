import {
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_START
} from '../actionTypes'

const initialState = {
  isFetching: false,
  errors: [],
  games: []
}

const games = (state = initialState, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case FETCH_GAMES_START:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        games: action.games
      }
    case FETCH_GAMES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      }
    }
    default:
      return state
  }
  /* eslint-enable indent */
}

export default games
