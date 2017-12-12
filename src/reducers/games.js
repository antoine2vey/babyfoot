import {
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_START,
  FETCH_TEAMS_SUCCESS,
  JOINED_GAME_SUCCESS
} from '../actionTypes'

const initialState = {
  isFetching: false,
  errors: [],
  games: [],
  userTeams: []
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
    case FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        userTeams: action.teams
      }
    }
    case JOINED_GAME_SUCCESS: {
      return {
        ...state,
        games: state.games.map(game => {
          if (game._id !== action.gameId) {
            return game
          }

          return {
            ...game,
            teams: [...game.teams, action.team]
          }
        })
      }
    }
    default:
      return state
  }
  /* eslint-enable indent */
}

export default games
