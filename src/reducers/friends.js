import {
  FETCH_FRIENDS_FAILURE,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_START,
  UPDATE_FRIENDSHIP_SUCCESS,
  UPDATE_FRIENDSHIP_FAILURE,
  DELETE_FRIENDSHIP,
  FETCH_USERS,
  FRIEND_USER
} from '../actionTypes'

const initialState = {
  isFetching: false,
  errors: [],
  friends: [],
  users: [],
  pending_invites: []
}

const friends = (state = initialState, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case FETCH_USERS: {
      return {
        ...state,
        users: action.users
      }
    }
    case FETCH_FRIENDS_START:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        friends: action.friends,
        pending_invites: action.pending_invites
      }
    case FETCH_FRIENDS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      }
    }
    case UPDATE_FRIENDSHIP_SUCCESS: {
      if (action.status === 'ACCEPT') {
        // If we accept, add to friends
        return {
          ...state,
          friends: [...state.friends, action.friend],
          pending_invites: state.pending_invites.filter(
            el => el._id !== action.friend._id
          )
        }
      }

      // If we refuse, add to users
      return {
        ...state,
        users: [...state.users, action.friend],
        pending_invites: state.pending_invites.filter(
          el => el._id !== action.friend._id
        )
      }
    }
    case UPDATE_FRIENDSHIP_FAILURE: {
      return {
        ...state,
        errors: action.errors
      }
    }
    case DELETE_FRIENDSHIP: {
      return {
        ...state,
        friends: state.friends.filter(el => el._id !== action.user._id),
        users: [...state.users, action.user]
      }
    }
    case FRIEND_USER: {
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.id)
      }
    }
    default:
      return state
  }
  /* eslint-enable indent */
}

export default friends
