import React from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import Friend from './Friend';

export default class FriendList extends React.Component {
  componentDidMount() {
    const { id } = this.props.navigation.state.params.user;
    this.props.fetchFriends(id, this.props.token);
  }

  render() {
    return (
      <View>
        <List containerStyle={{ marginTop: 0 }}>
          {this.props.friends.map(friend => (
            <Friend
              key={friend._id}
              friend={friend}
              deleteFriendship={this.props.deleteFriendship}
              token={this.props.token}
            />
          ))}
        </List>

        <List>
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
    );
  }
}
