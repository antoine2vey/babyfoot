import * as CONSTANTS from '../constants'
import axios from 'axios'
import * as ACTIONS from '../actionTypes'

export const friendsFetchSuccess = ({ friends, pending_invites }) => ({
  type: ACTIONS.FETCH_FRIENDS_SUCCESS,
  friends,
  pending_invites
})

export const friendsFetchStart = () => ({
  type: ACTIONS.FETCH_FRIENDS_START
})

export const friendsFetchFailure = errors => ({
  type: ACTIONS.FETCH_FRIENDS_FAILURE,
  errors
})

export const updateFriendshipSuccess = (friend, status) => ({
  type: ACTIONS.UPDATE_FRIENDSHIP_SUCCESS,
  friend,
  status
})

export const deleteFriendshipSuccess = user => ({
  type: ACTIONS.DELETE_FRIENDSHIP,
  user
})

export const fetchUsersSuccess = users => ({
  type: ACTIONS.FETCH_USERS,
  users
})

export const friendUserSuccess = id => ({
  type: ACTIONS.FRIEND_USER,
  id
})

export const fetchFriends = token => dispatch => {
  dispatch(friendsFetchStart())

  axios
    .get(`${CONSTANTS.API_URL}/user/friends`, {
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
      )
    })
    .catch(err => {
      dispatch(friendsFetchFailure(err.response.data.errors))
    })
}

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
      dispatch(updateFriendshipSuccess(res.data.user, status))
    })
    .catch(err => {
      console.error('retarded update', err)
    })
}

export const deleteFriendship = (userId, token) => dispatch => {
  axios
    .delete(`${CONSTANTS.API_URL}/user/friendship/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      console.log(data)
      dispatch(deleteFriendshipSuccess(data.user))
    })
    .catch(err => {
      console.log('retarded delete', err)
    })
}

export const fetchUsers = token => dispatch => {
  axios
    .get(`${CONSTANTS.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch(fetchUsersSuccess(data.users))
    })
    .catch(err => {
      console.log('@@REDUX > FETCH USERS ERROR > ', err)
    })
}

export const addFriend = (id, token) => dispatch => {
  axios
    .post(
      `${CONSTANTS.API_URL}/user/friendship/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      dispatch(friendUserSuccess(id))
    })
    .catch(err => {
      console.log('@@REDUX > FRIEND USER ERROR >', err)
    })
}
