import React from 'react'
import { View, Text } from 'react-native'

export default class Home extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const { email } = this.props.navigation.state.params.user
    return (
      <View>
        <Text>{email.toUpperCase()}</Text>
      </View>
    )
  }
}
