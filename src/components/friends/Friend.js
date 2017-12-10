import React from 'react'
import { Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome
} from '@expo/vector-icons'
import styled from 'styled-components/native'

const Friend = ({
  friend,
  showChoices,
  updateFriendship,
  deleteFriendship,
  addFriend,
  token,
  canAdd
}) => (
  <FriendItem>
    <Avatar
      source={{
        uri: friend.avatar
      }}
    />
    <View
      style={{
        backgroundColor: 'white',
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        marginLeft: 25,
        paddingLeft: 25,
        borderRadius: 6,
        paddingTop: 3,
        paddingBottom: 3,
        height: 60,
        flex: 1,
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8
      }}
    >
      <ListItem
        title={`${friend.first_name.toUpperCase()} ${friend.last_name.toUpperCase()}`}
        containerStyle={{
          borderBottomWidth: 0
        }}
        titleStyle={{
          fontWeight: '600',
          fontSize: 14,
          color: 'black'
        }}
        badge={
          showChoices && {
            element: (
              <MaterialCommunityIcons
                name={'check'}
                size={28}
                color="limegreen"
                style={{ marginRight: 15 }}
                onPress={() => updateFriendship('ACCEPT', friend._id, token)}
              />
            )
          }
        }
        rightIcon={
          showChoices ? (
            <MaterialCommunityIcons
              name={'close'}
              size={28}
              color="#DA373A"
              onPress={() => updateFriendship('DENY', friend._id, token)}
            />
          ) : canAdd ? (
            <MaterialIcons
              name={'add'}
              size={28}
              color="limegreen"
              onPress={() => addFriend(friend._id, token)}
            />
          ) : (
            <FontAwesome
              name={'trash-o'}
              size={20}
              color="#DA373A"
              onPress={() => deleteFriendship(friend._id, token)}
            />
          )
        }
      />
    </View>
  </FriendItem>
)

export default Friend

const FriendItem = styled.View`
  position: relative;
  display: flex;
  z-index: -1;
`

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25;

  position: absolute;
  left: 0;
  top: 13;
  z-index: 1;
`
