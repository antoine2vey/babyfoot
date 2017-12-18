import React from 'react'
import styled from 'styled-components/native'
import { FormLabel } from 'react-native-elements'
import { View } from 'react-native'

const CardContainer = ({ labelText, children }) => (
  <View>
    <FormLabel labelStyle={{ color: '#fff', fontWeight: '300' }}>
      {labelText}
    </FormLabel>
    <Container>{children}</Container>
  </View>
)

export default CardContainer

const Container = styled.View`
  flex-direction: row
  margin: 8px 20px 0 20px
  display: flex;
  flex-wrap: wrap
`
