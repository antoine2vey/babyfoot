import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, AlertIOS, StyleSheet, View } from 'react-native'
import moment from 'moment'
import 'moment/locale/fr'

import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { fetchGames, fetchTeams, joinGame } from '../actions/games'
import Game from '../components/games/Game'

class Games extends React.Component {
  constructor(props) {
    super(props)
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.red = 'rgba(203, 70, 70, 1)'
  }

  static navigatorButtons = {
    leftButtons: [
      {
        systemItem: 'save',
        id: 'menu'
      }
    ]
  }

  onNavigatorEvent(event) {
    // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'menu') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true,
          to: 'open'
        })
      }
    }
  }

  componentDidMount() {
    moment.locale('fr')
    const { token } = this.props

    this.props.fetchGames(token)
    this.props.fetchTeams(token)
  }

  joinMatch(id) {
    this.props.navigator.push({
      screen: 'stella.GameRoom',
      title: 'Partie en cours',
      passProps: {
        roomId: id
      }
    })
  }

  createMatch() {
    const { token, navigator } = this.props

    navigator.push({
      screen: 'stella.CreateGame',
      title: 'Créer une partie',
      passProps: { token }
    })
  }

  render() {
    const { games } = this.props

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ padding: 20 }}>
          {games.map(game => (
            <Game
              key={game._id}
              game={game}
              joinMatch={() => this.joinMatch(game._id)}
              {...this.props}
            />
          ))}
        </ScrollView>
        <ActionButton buttonColor="rgba(203, 70, 70, 1)" spacing={10}>
          <ActionButton.Item
            buttonColor="rgba(203, 70, 70, 1)"
            onPress={() => {}}
            size={40}
          >
            <Icon name="ios-people" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="rgba(203, 70, 70, 1)"
            onPress={() => this.createMatch()}
            size={40}
          >
            <Icon name="ios-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
})

const mapStateToProps = state => ({
  games: state.games.games,
  token: state.login.token,
  user_teams: state.games.userTeams
})

export default connect(mapStateToProps, { fetchGames, fetchTeams, joinGame })(
  Games
)
