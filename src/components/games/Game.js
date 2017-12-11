import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import Date from './Date'
import Place from './Place'
import GameHeader from './GameHeader'
import Teams from './Teams'
import Rules from './Rules'
import Medias from './Medias'

const Game = ({ game, navigation }) => {
  const { teams, created_at, rules, medias } = game

  return (
    <GameCard>
      <Date date={created_at} />
      <Place place={'Estiam'} />
      <GameHeader teams={teams} navigation={navigation} />
      <Teams teams={teams} />
      <Rules rules={rules} />
      <Medias medias={medias} />
    </GameCard>
  )
}

export default Game

const GameCard = styled.View`
  padding: 10px 20px;
  border-radius: 6px;
  background-color: white;
  shadow-color: rgba(0, 0, 0, 0.5);
  shadow-offset: 4px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8;
`
