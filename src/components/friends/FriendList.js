import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

import Friend from './Friend'

export default class FriendList extends React.Component {
  componentDidMount() {
    const { id } = this.props.navigation.state.params.user
    this.props.fetchFriends(id, this.props.token)
    this.props.fetchUsers(this.props.token)
  }

  render() {
    return (
      <FriendListContainer>
        <Heading>Invitations</Heading>
        <FriendListPart>
          {this.props.pending_invites.length ? (
            this.props.pending_invites.map(invite => (
              <Friend
                key={invite._id}
                friend={invite}
                showChoices
                updateFriendship={this.props.updateFriendship}
                token={this.props.token}
              />
            ))
          ) : (
            <Empty>Aucune invitation reçue!</Empty>
          )}
        </FriendListPart>

        <FriendListPart>
          <Heading>Mes amis</Heading>
          {this.props.friends.length ? (
            this.props.friends.map(friend => (
              <Friend
                key={friend._id}
                friend={friend}
                deleteFriendship={this.props.deleteFriendship}
                token={this.props.token}
              />
            ))
          ) : (
            <Empty>Aucun amis!</Empty>
          )}
        </FriendListPart>

        <FriendListPart>
          <Heading>Tout les utilisateurs</Heading>
          {this.props.users.length ? (
            this.props.users.map(user => (
              <Friend
                key={user._id}
                friend={user}
                token={this.props.token}
                canAdd
                addFriend={this.props.addFriend}
              />
            ))
          ) : (
            <Empty>Aucun utilisteur!</Empty>
          )}
        </FriendListPart>
      </FriendListContainer>
    )
  }
}

const FriendListContainer = styled.ScrollView`
  padding: 20px;
  background-color: transparent;
  height: 100%;
`

const FriendListPart = styled.View`
  margin-bottom: 15px;
`

const Heading = styled.Text`
  color: rgb(164, 164, 164);
  margin-bottom: 8px;
`

const Empty = styled.Text`
  color: rgba(164, 164, 164, 0.3);
  font-size: 16px;
`
