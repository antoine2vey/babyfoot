import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import * as io from 'socket.io-client'
import { Button } from 'react-native-elements'

class GameRoom extends Component {
  constructor() {
    super()

    this.socket = io.connect('http://localhost:3000')
    this.state = {
      started: false
    }
  }

  componentDidMount() {
    const { roomId } = this.props

    this.socket.emit('JOIN_GAME', roomId)
    this.socket.on('GAME_STARTED', () => {
      this.setState((prevState, props) => ({
        started: !prevState.started
      }))
    })
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  addGoal() {
    Alert.alert('Increase score')
  }

  removeGoal() {
    Alert.alert('Decrease score')
  }

  render() {
    return (
      <View>
        <Text>game started : {this.state.started ? 'oui' : 'non'}</Text>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Button
            raised
            title={'Add goal'}
            large
            containerViewStyle={{ flex: 1 }}
            buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
            onPress={this.addGoal}
          />
          <Button
            raised
            title={'Remove goal'}
            large
            containerViewStyle={{ flex: 1 }}
            buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
            onPress={this.removeGoal}
          />
        </View>
      </View>
    )
  }
}

export default GameRoom
