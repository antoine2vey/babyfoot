import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Avatar } from 'react-native-elements'

const GameHeader = ({ teams: [teamA, teamB] }) => (
  <Container>
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

export default GameHeader

const Score = styled.View`
  flex: 1;
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
