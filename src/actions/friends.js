import * as CONSTANTS from '../constants';
import axios from 'axios';
import * as ACTIONS from '../actionTypes';

export const friendsFetchSuccess = ({ friends, pending_invites }) => ({
  type: ACTIONS.FETCH_FRIENDS_SUCCESS,
  friends,
  pending_invites
});

export const friendsFetchStart = () => ({
  type: ACTIONS.FETCH_FRIENDS_START
});

export const friendsFetchFailure = errors => ({
  type: ACTIONS.FETCH_FRIENDS_FAILURE,
  errors
});

export const updateFriendshipSuccess = friend => ({
  type: ACTIONS.UPDATE_FRIENDSHIP_SUCCESS,
  friend
});

export const deleteFriendshipSuccess = userId => ({
  type: ACTIONS.DELETE_FRIENDSHIP,
  userId
})

export const fetchFriends = (userId, token) => dispatch => {
  dispatch(friendsFetchStart());

  axios
    .get(`${CONSTANTS.API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(
        friendsFetchSuccess({
          friends: res.data.user.friends,
          pending_invites: res.data.user.pending_invites
        })
      );
    })
    .catch(err => {
      dispatch(friendsFetchFailure(err.response.data.errors));
    });
};

export const updateFriendship = (status, friendId, token) => dispatch => {
  axios
    .put(
      `${CONSTANTS.API_URL}/user/friendship/${friendId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      dispatch(updateFriendshipSuccess(res.data.user));
    })
    .catch(err => {
      console.error('retarded update', err);
    });
};

export const deleteFriendship = (userId, token) => dispatch => {
  axios
    .delete(`${CONSTANTS.API_URL}/user/friendship/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(deleteFriendshipSuccess(res.data.id));
    })
    .catch(err => {
      console.log('retarded delete', err);;;
    });
}
