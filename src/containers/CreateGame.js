import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { fetchRulesIfNeeded, selectRule } from '../actions/rules'
import { createGame } from '../actions/games'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { FormLabel, FormInput, Button } from 'react-native-elements'

import Location from '../components/games/create/Location'
import Rules from '../components/games/create/Rules'
import Teams from '../components/games/create/Teams'

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
    selectedTeam: undefined
  }

  async componentDidMount() {
    const { fetchRulesIfNeeded, token } = this.props

    fetchRulesIfNeeded(token)
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

  getSelectedTeam() {
    const hasTeamsChecked = this.state.teams.filter(t => t.selected).length
    if (hasTeamsChecked) {
      return this.state.selectedTeam
    }

    return undefined
  }

  createGame() {
    const { selectedTeam, place } = this.state
    const { token, createGame, navigator, rules } = this.props

    const data = {
      location: place,
      team: this.getSelectedTeam(),
      rules: rules.filter(rule => rule.selected)
    }

    createGame(data, token).then(() => {
      navigator.pop()
    })
  }

  render() {
    const { teams, place } = this.state
    const { selectRule, rules } = this.props

    return (
      <CreateGameLayout>
        <Location place={place} setPlace={place => this.setState({ place })} />
        <Teams
          teams={teams}
          label={'Équipes'}
          selectTeam={id => this.selectTeam(id)}
        />
        <Rules
          rules={rules}
          label={'Règles'}
          selectRule={id => selectRule(id)}
        />
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

const CreateGameLayout = styled.ScrollView`
  flex: 1;
  background: rgb(201, 70, 70);
`

const mapStateToProps = state => ({
  teams: state.games.userTeams,
  rules: state.rules.rules
})

export default connect(mapStateToProps, {
  fetchRulesIfNeeded,
  createGame,
  selectRule
})(CreateGame)
