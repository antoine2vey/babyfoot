import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, AlertIOS } from 'react-native'
import moment from 'moment'
import 'moment/locale/fr'

import { fetchGames, fetchTeams, joinGame } from '../actions/games'
import Game from '../components/games/Game'

class Games extends React.Component {
  constructor(props) {
    super(props)
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
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

  render() {
    const { games } = this.props

    return (
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
    )
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  token: state.login.token,
  user_teams: state.games.userTeams
})

export default connect(mapStateToProps, { fetchGames, fetchTeams, joinGame })(
  Games
)
