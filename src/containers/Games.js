import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import 'moment/locale/fr'
import { Avatar } from 'react-native-elements'

import { fetchGames } from '../actions/games'

class Games extends React.Component {
  static navigationOptions = {
    headerStyle: {
      borderBottomColor: 'white',
      backgroundColor: 'white'
    }
  }

  constructor() {
    super()
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
        {games.map(game => {
          const [teamA, teamB] = game.teams
          console.log(teamB)

          return (
            <Game
              key={game._id}
              style={{
                backgroundColor: 'white',
                shadowColor: 'rgba(0,0,0,.5)',
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8
              }}
            >
              <Date>
                {moment(game.created_at)
                  .format('LL')
                  .toLocaleUpperCase()}
              </Date>
              <Place>Estiam</Place>
              <GameHeader>
                <TeamContainer>
                  <TeamLogo source={{ uri: teamA.logo }} />
                  <TeamName>{teamA.name}</TeamName>
                </TeamContainer>
                <Score />
                <TeamContainer>
                  {!teamB ? (
                    <View>
                      <Avatar
                        title="?"
                        rounded
                        width={70}
                        height={70}
                        activeOpacity={0.7}
                        onPress={() => console.log('Inscription')}
                      />
                      <TeamName>{'Inscris toi!'}</TeamName>
                    </View>
                  ) : (
                    <View>
                      <TeamLogo source={{ uri: teamB.logo }} />
                      <TeamName>{teamB.name}</TeamName>
                    </View>
                  )}
                </TeamContainer>
              </GameHeader>
              <Teams>
                <Team>
                  {teamA.members.map(member => (
                    <TeamMember key={member._id}>
                      <MemberAvatar source={{ uri: member.avatar }} />
                      <TeamMemberName>
                        {member.first_name} {member.last_name}
                      </TeamMemberName>
                    </TeamMember>
                  ))}
                </Team>
              </Teams>
              <Rules>
                <Place left>Règles</Place>
                {game.rules.map(rule => (
                  <Rule key={rule._id}>{rule.title}</Rule>
                ))}
              </Rules>
              <View style={{ marginTop: 15 }}>
                <Place left>Médias</Place>
                <Medias horizontal>
                  {game.medias.map((media, i) => (
                    <Media key={i} source={{ uri: media }} />
                  ))}
                </Medias>
              </View>
            </Game>
          )
        })}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  token: state.login.token
})

export default connect(mapStateToProps, { fetchGames })(Games)

const Game = styled.View`
  padding: 10px 20px;
  border-radius: 6px;
`
const Date = styled.Text`
  font-weight: 600;
  margin: 5px 0;
  color: black;
  text-align: center;
`

const Place = styled.Text`
  color: rgba(0, 0, 0, 0.2);
  text-align: ${props => (props.left ? 'left' : 'center')};
  margin-bottom: ${props => (props.left ? 8 : 0)};
`

const GameHeader = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 15px 0;
`

const TeamContainer = styled.View`
  align-items: center;
  justify-content: center;
`

const TeamLogo = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35;
`

const TeamName = styled.Text`
  color: rgba(0, 0, 0, 0.3);
  text-align: center;
  font-weight: 600;
  margin-top: 5px;
  font-size: 12px;
`

const Score = styled.View`
  flex: 1;
`

const Teams = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 5px 0;
`

const Team = styled.View`
  flex: 1;
  padding-right: 10px;
`

const TeamMember = styled.View`
  margin: 4px 0;
  flex-direction: row;
  align-items: center;
`

const MemberAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20;
`

const TeamMemberName = styled.Text`
  font-weight: 600;
  color: black;
  margin-left: 8px;
  font-size: 12px;
`

const Rules = styled.View`
  margin-top: 10px;
`

const Rule = styled.Text``

const Medias = styled.ScrollView``
const Media = styled.Image`
  height: 100px;
  width: 180px;
  margin-right: 30px;
`
