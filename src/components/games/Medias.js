import React from 'react'
import styled from 'styled-components/native'

const Medias = ({ medias }) => (
  <Container>
    <PlaceTitle left>Médias</PlaceTitle>
    <MediasSlide horizontal>
      {medias.map((media, i) => <Media key={i} source={{ uri: media }} />)}
    </MediasSlide>
  </Container>
)

export default Medias

const Container = styled.View`
  margin-top: 15px;
`

const MediasSlide = styled.ScrollView``

const Media = styled.Image`
  height: 100px;
  width: 180px;
  margin-right: 30px;
`

const PlaceTitle = styled.Text`
  color: rgba(0, 0, 0, 0.2);
  text-align: ${props => (props.left ? 'left' : 'center')};
  margin-bottom: ${props => (props.left ? 8 : 0)};
`
