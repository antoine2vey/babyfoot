import React from 'react'
import { ListItem } from 'react-native-elements'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const Friend = ({
  friend,
  showChoices,
  updateFriendship,
  deleteFriendship,
  addFriend,
  token,
  canAdd
}) => (
  <ListItem
    title={friend.email}
    subtitle={
      showChoices
        ? 'asked you in friend'
        : canAdd ? null : 'is friend of yours!'
    }
    badge={
      showChoices && {
        element: (
          <MaterialCommunityIcons
            name={'check-circle'}
            size={28}
            color="green"
            style={{ marginTop: 6, marginRight: 5 }}
            onPress={() => updateFriendship('ACCEPT', friend._id, token)}
          />
        )
      }
    }
    rightIcon={
      showChoices ? (
        <MaterialIcons
          name={'cancel'}
          size={28}
          color="red"
          style={{ marginTop: 6 }}
          onPress={() => updateFriendship('DENY', friend._id, token)}
        />
      ) : canAdd ? (
        <MaterialIcons
          name={'add-circle'}
          size={28}
          color="green"
          style={{ marginTop: 6 }}
          onPress={() => addFriend(friend._id, token)}
        />
      ) : (
        <MaterialIcons
          name={'delete'}
          size={28}
          color="red"
          style={{ marginTop: 6 }}
          onPress={() => deleteFriendship(friend._id, token)}
        />
      )
    }
  />
)

export default Friend
