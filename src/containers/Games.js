import React from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import moment from 'moment'
import 'moment/locale/fr'

import { fetchGames } from '../actions/games'
import Game from '../components/games/Game'

class Games extends React.Component {
  static navigationOptions = {
    headerStyle: {
      borderBottomColor: 'white',
      backgroundColor: 'white',
      headerLeft: null
    }
  }

  componentDidMount() {
    moment.locale('fr')
    const { token } = this.props

    this.props.fetchGames(token)
  }

  render() {
    const { games, navigation } = this.props

    return (
      <ScrollView style={{ padding: 20 }}>
        {games.map(game => (
          <Game key={game._id} game={game} navigation={navigation} />
        ))}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  token: state.login.token
})

export default connect(mapStateToProps, { fetchGames })(Games)
