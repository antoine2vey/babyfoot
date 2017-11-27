import {
  FETCH_FRIENDS_FAILURE,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_START,
  UPDATE_FRIENDSHIP_SUCCESS,
  UPDATE_FRIENDSHIP_FAILURE,
  DELETE_FRIENDSHIP
} from '../actionTypes';

const initialState = {
  isFetching: false,
  errors: [],
  friends: [],
  pending_invites: []
};

const friends = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FRIENDS_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        friends: action.friends,
        pending_invites: action.pending_invites
      };
    case FETCH_FRIENDS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      };
    }
    case UPDATE_FRIENDSHIP_SUCCESS: {
      return {
        ...state,
        friends: [...state.friends, action.friend],
        pending_invites: state.pending_invites.filter(el => el._id !== action.friend._id)
      };
    }
    case UPDATE_FRIENDSHIP_FAILURE: {
      return {
        ...state,
        errors: action.errors
      };
    }
    case DELETE_FRIENDSHIP: {
      return {
        ...state,
        friends: state.friends.filter(el => el._id !== action.userId)
      }
    }
    default:
      return state;
  }
};

export default friends;
