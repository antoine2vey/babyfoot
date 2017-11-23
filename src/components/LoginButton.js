import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const LoginButton = props => (
  <DefaultButton onPress={props.press()} activeOpacity={0.7} {...props}>
    <InnerButton>
      {props.icon && <Ionicons name={props.icon} size={28} color={'white'} />}
      <Text style={{ color: 'white' }}>{props.text}</Text>
    </InnerButton>
  </DefaultButton>
)

LoginButton.propTypes = {
  press: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  full: PropTypes.bool,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default LoginButton

const DefaultButton = styled.TouchableOpacity`
  margin: ${({ full }) => (full ? '20px 0' : '20px 10px')};
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 6px;
  height: 45px;

  ${({ full }) => full && 'width: 100%'};
  ${({ rounded }) => rounded && 'border-radius: 10px'};
`

const InnerButton = styled.View`
  color: white;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  flex: 1;
  align-items: center;
`
