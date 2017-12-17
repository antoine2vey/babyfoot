import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { FormLabel, FormInput, Button } from 'react-native-elements'

import axios from 'axios'

class CreateGame extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  }

  /**
   * App doesn't throw
   */
  static defaultProps = {
    teams: []
  }

  state = {
    place: '252 rue du flocon',
    teams: this.props.teams,
    selectedTeam: undefined,
    rules: []
  }

  async componentDidMount() {
    const { rules } = await fetch(`http://localhost:3000/api/rule`, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }).then(res => res.json())

    this.setState({ rules: rules.map(rule => ({ ...rule, selected: false })) })
  }

  selectTeam(selectedTeam) {
    this.setState({
      selectedTeam,
      teams: this.state.teams.map(team => {
        if (team._id === selectedTeam) {
          return {
            ...team,
            selected: !this.state.teams.find(team => team._id === selectedTeam)
              .selected
          }
        }

        return {
          ...team,
          selected: false
        }
      })
    })
  }

  selectRule(id) {
    this.setState({
      rules: this.state.rules.map(rule => {
        if (rule._id === id) {
          return {
            ...rule,
            selected: !this.state.rules.find(r => r._id === id).selected
          }
        }

        return rule
      })
    })
  }

  getSelectedTeam() {
    const hasTeamsChecked = this.state.teams.filter(t => t.selected).length
    if (hasTeamsChecked) {
      return this.state.selectedTeam
    }

    return undefined
  }

  createGame() {
    const { selectedTeam, place, rules } = this.state
    const data = {
      location: place,
      team: this.getSelectedTeam(),
      rules: rules.filter(rule => rule.selected)
    }

    axios.post(`http://localhost:3000/api/game`, data, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    })
  }

  render() {
    const { teams, rules } = this.state

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
        <FormLabel labelStyle={{ color: '#fff', fontWeight: '300' }}>
          Equipes
        </FormLabel>
        <CardContainer>
          {teams.map(team => (
            <Team
              key={team._id}
              onPress={() => this.selectTeam(team._id)}
              activeOpacity={0.9}
            >
              <Logo source={{ uri: team.logo }} />
              <TeamName numberOfLines={1}>{team.name}</TeamName>

              <SelectedOverlay selected={team.selected}>
                <SelectedOverlayCircle>
                  <Ionicon
                    name="ios-checkmark"
                    size={50}
                    color="rgba(201, 70, 70, 1)"
                    style={{ marginTop: 5 }}
                  />
                </SelectedOverlayCircle>
              </SelectedOverlay>
            </Team>
          ))}
        </CardContainer>
        <FormLabel labelStyle={{ color: '#fff', fontWeight: '300' }}>
          Règles
        </FormLabel>
        <CardContainer>
          {rules.map(rule => (
            <Team
              key={rule._id}
              onPress={() => this.selectRule(rule._id)}
              activeOpacity={0.9}
            >
              <Logo source={{ uri: rule.icon }} resizeMode="contain" />
              <TeamName>{rule.title}</TeamName>

              <SelectedOverlay selected={rule.selected}>
                <SelectedOverlayCircle>
                  <Ionicon
                    name="ios-checkmark"
                    size={50}
                    color="rgba(201, 70, 70, 1)"
                    style={{ marginTop: 5 }}
                  />
                </SelectedOverlayCircle>
              </SelectedOverlay>
            </Team>
          ))}
        </CardContainer>
        <Button
          title="Créer une partie"
          backgroundColor="#fff"
          textStyle={{ color: '#222' }}
          containerViewStyle={{ marginTop: 20 }}
          onPress={() => this.createGame()}
        />
      </CreateGameLayout>
    )
  }
}

const SelectedOverlayCircle = styled.View`
  background: #fff;
  height: 50px;
  width: 50px;
  border-radius: 25

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden
  
  shadow-color: #000
  shadow-offset: 2px 2px
  shadow-opacity: 1
  shadow-radius: 2px
`

const SelectedOverlay = styled.View`
  opacity: ${props => (props.selected ? 1 : 0)}
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, .8)
  border-radius: 6px

  display: flex;
  align-items: center;
  justify-content: center
`

const CreateGameLayout = styled.ScrollView`
  flex: 1;
  background: rgb(201, 70, 70);
`

const Team = styled.TouchableOpacity`
  background: ${props => (props.selected ? 'red' : '#fff')};
  padding: 15px;
  border-radius: 6px;
  height: 135px;

  align-items: center;
  align-self: center;
  flex-basis: 31%;
  max-width: 31%;
  margin-bottom: 10px;

  shadow-color: rgba(0,0,0,.5)
  shadow-offset: 4px 4px
  shadow-opacity: 0.25
  shadow-radius: 8px

  position: relative;
`

const Logo = styled.Image`
  width: 90px;
  height: 90px;
`

const TeamName = styled.Text`
  margin-top: 5px;
`

const CardContainer = styled.View`
  flex-direction: row
  margin: 8px 20px 0 20px
  flex: 1
  justify-content: space-between
  flex-wrap: wrap
`

const mapStateToProps = state => ({
  teams: state.games.userTeams
})

export default connect(mapStateToProps)(CreateGame)
