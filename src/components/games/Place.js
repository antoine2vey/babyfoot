import React from 'react'
import styled from 'styled-components/native'
import openMap from 'react-native-open-maps'
import { Text, TouchableOpacity } from 'react-native'
const Place = ({ left, place }) => (
  <TouchableOpacity left={left}>
    <PlaceTitle
      onPress={() =>
        openMap({ latitude: place.lat, longitude: place.lng, zoomLevel: 18 })
      }
    >
      {place.name}
    </PlaceTitle>
  </TouchableOpacity>
)

export default Place

const PlaceTitle = styled.Text`
  color: rgba(0, 0, 0, 0.2);
  text-align: ${props => (props.left ? 'left' : 'center')};
  margin-bottom: ${props => (props.left ? 8 : 0)};
`
