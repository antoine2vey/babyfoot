import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  fetchFriends,
  updateFriendship,
  deleteFriendship,
  fetchUsers,
  addFriend
} from '../actions/friends'

import FriendList from '../components/friends/FriendList'

class Home extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.user.email + "'s friend list!"
  })

  render() {
    return (
      <View>
        <FriendList {...this.props} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.friends.friends,
  users: state.friends.users,
  pending_invites: state.friends.pending_invites,
  token: state.login.token
})

export default connect(mapStateToProps, {
  fetchFriends,
  updateFriendship,
  deleteFriendship,
  fetchUsers,
  addFriend
})(Home)
