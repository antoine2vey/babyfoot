import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { FormLabel, FormInput } from 'react-native-elements'

class CreateGame extends Component {
  static navigatorStyle = {
    tabBarHidden: true,
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    navBarBackgroundColor: 'transparent'
  }

  state = {
    place: ''
  }

  render() {
    console.log(this.props.teams)

    return (
      <CreateGameLayout>
        <FormLabel labelStyle={{ color: '#fff', fontWeight: '300' }}>
          Lieu
        </FormLabel>
        <FormInput
          inputStyle={{ color: '#fff' }}
          containerStyle={{ borderBottomColor: '#fff', borderBottomWidth: 1.3 }}
          onChangeText={place => this.setState({ place })}
          value={this.state.place}
        />
      </CreateGameLayout>
    )
  }
}

const CreateGameLayout = styled.ScrollView`
  flex: 1;
  background: rgb(201, 70, 70);
`

const mapStateToProps = state => ({
  teams: state.games.userTeams
})

export default connect(mapStateToProps)(CreateGame)
