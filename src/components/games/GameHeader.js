import React from 'react'
import { View, ActionSheetIOS, Alert, Text } from 'react-native'
import styled from 'styled-components/native'
import { Avatar } from 'react-native-elements'

class GameHeader extends React.Component {
  inscription() {
    const teamToString = this.props.user_teams.map(t => t.name)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', ...teamToString],
        cancelButtonIndex: 0
      },
      index => {
        if (index === 0) {
          return
        }

        const selectedTeam = this.props.user_teams[index - 1]

        Alert.alert(
          'Inscription',
          `Vous allez inscrire ${selectedTeam.name} à ce tournoi`,
          [
            {
              text: 'Annuler',
              onPress: () => console.log('Annulation inscription'),
              style: 'cancel'
            },
            {
              text: 'Valider',
              onPress: () => {
                const { game, token } = this.props
                this.props.joinGame(game._id, selectedTeam, token)
              }
            }
          ]
        )
      }
    )
  }

  render() {
    const { teams: [teamA, teamB] } = this.props

    return (
      <Container>
        <TeamContainer>
          <TeamLogo source={{ uri: teamA.logo }} />
          <TeamName>{teamA.name}</TeamName>
        </TeamContainer>
        <Score>
          <Text style={{ fontWeight: '600', fontSize: 22 }}>VS</Text>
        </Score>
        <TeamContainer>
          {!teamB ? (
            <View>
              <Avatar
                title="?"
                rounded
                width={70}
                height={70}
                activeOpacity={0.7}
                onPress={() => this.inscription()}
              />
              <TeamName>Inscris toi!</TeamName>
            </View>
          ) : (
            <View>
              <TeamLogo source={{ uri: teamB.logo }} />
              <TeamName>{teamB.name}</TeamName>
            </View>
          )}
        </TeamContainer>
      </Container>
    )
  }
}

export default GameHeader

const Score = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Container = styled.View`
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
