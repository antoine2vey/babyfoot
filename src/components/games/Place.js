import React from 'react'
import styled from 'styled-components/native'

const Place = ({ left, place }) => <PlaceTitle left={left}>{place}</PlaceTitle>

export default Place

const PlaceTitle = styled.Text`
  color: rgba(0, 0, 0, 0.2);
  text-align: ${props => (props.left ? 'left' : 'center')};
  margin-bottom: ${props => (props.left ? 8 : 0)};
`
