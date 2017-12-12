import React from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import moment from 'moment'
import 'moment/locale/fr'

import { fetchGames, fetchTeams, joinGame } from '../actions/games'
import Game from '../components/games/Game'

class Games extends React.Component {
  static navigationOptions = {
    headerStyle: {
      borderBottomColor: 'white',
      backgroundColor: 'white'
    }
  }

  componentDidMount() {
    moment.locale('fr')
    const { token } = this.props

    this.props.fetchGames(token)
    this.props.fetchTeams(token)
  }

  render() {
    const { games, navigator, user_teams } = this.props
    console.log(this.props)
    return (
      <ScrollView style={{ padding: 20 }}>
        {games.map(game => <Game key={game._id} game={game} {...this.props} />)}
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
