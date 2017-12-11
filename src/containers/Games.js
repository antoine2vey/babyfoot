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
      backgroundColor: 'white'
    }
  }

  componentDidMount() {
    moment.locale('fr')
    const { token } = this.props

    this.props.fetchGames(token)
  }

  render() {
    const { games } = this.props

    return (
      <ScrollView style={{ padding: 20 }}>
        {games.map(game => <Game key={game._id} game={game} />)}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  token: state.login.token
})

export default connect(mapStateToProps, { fetchGames })(Games)
