import React from 'react'
import styled from 'styled-components/native'

import Date from './Date'
import Place from './Place'
import GameHeader from './GameHeader'
import Teams from './Teams'
import Rules from './Rules'
import Medias from './Medias'
import { TouchableOpacity, Text } from 'react-native'

const Game = props => {
  const { teams, created_at, rules, medias } = props.game

  return (
    <GameCard>
      <Date date={created_at} />
      <Place place={'Estiam'} />
      <GameHeader {...props.game} {...props} />
      <Teams teams={teams} />
      <Rules rules={rules} />
      <Medias medias={medias} />
      <TouchableOpacity onPress={props.joinMatch}>
        <Text>Join this match</Text>
      </TouchableOpacity>
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
