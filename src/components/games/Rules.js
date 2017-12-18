import React from 'react'
import styled from 'styled-components/native'

const Rules = ({ rules }) => (
  <Container>
    <PlaceTitle left>Règles</PlaceTitle>
    <PlaceContainer>
      {rules.map((rule, i) => (
        <Rule key={rule._id}>
          {rule.title}
          {i === rules.length - 1 ? '' : ', '}
        </Rule>
      ))}
    </PlaceContainer>
  </Container>
)

export default Rules

const Container = styled.View`
  margin-top: 10px;
`

const Rule = styled.Text``

const PlaceContainer = styled.View`
  flex-direction: row;
`

const PlaceTitle = styled.Text`
  color: rgba(0, 0, 0, 0.2);
  text-align: ${props => (props.left ? 'left' : 'center')};
  margin-bottom: ${props => (props.left ? 8 : 0)};
`
