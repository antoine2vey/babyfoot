import React from 'react'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import Friend from './Friend'

export default class FriendList extends React.Component {
  componentDidMount() {
    const { id } = this.props.navigation.state.params.user
    this.props.fetchFriends(id, this.props.token)
    this.props.fetchUsers(this.props.token)
  }

  render() {
    return (
      <View>
        <List style={{ marginTop: 0 }}>
          <Text>Tout les utilisateurs</Text>
          {this.props.users.map(user => (
            <Friend
              key={user._id}
              friend={user}
              token={this.props.token}
              canAdd
              addFriend={this.props.addFriend}
            />
          ))}
        </List>

        <List style={{ marginTop: 0 }}>
          <Text>Mes amis</Text>
          {this.props.friends.map(friend => (
            <Friend
              key={friend._id}
              friend={friend}
              deleteFriendship={this.props.deleteFriendship}
              token={this.props.token}
            />
          ))}
        </List>

        <List style={{ marginTop: 0 }}>
          <Text>Invitations</Text>
          {this.props.pending_invites.map(invite => (
            <Friend
              key={invite._id}
              friend={invite}
              showChoices
              updateFriendship={this.props.updateFriendship}
              token={this.props.token}
            />
          ))}
        </List>
      </View>
    )
  }
}
