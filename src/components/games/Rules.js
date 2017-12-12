import React from 'react'
import styled from 'styled-components/native'

const Rules = ({ rules }) => (
  <Container>
    <PlaceTitle left>Règles</PlaceTitle>
    {rules.map(rule => <Rule key={rule._id}>{rule.title}</Rule>)}
  </Container>
)

export default Rules

const Container = styled.View`
  margin-top: 10px;
`

const Rule = styled.Text``

const PlaceTitle = styled.Text`
  color: rgba(0, 0, 0, 0.2);
  text-align: ${props => (props.left ? 'left' : 'center')};
  margin-bottom: ${props => (props.left ? 8 : 0)};
`
