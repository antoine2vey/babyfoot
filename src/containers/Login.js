import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm'
import { login } from '../actions/login'

const Login = props => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <LoginForm {...props} />
  </View>
)

const mapStateToProps = state => ({
  isLoggingIn: state.login.isLoggingIn,
  token: state.login.token
})

export default connect(mapStateToProps, { login })(Login)

const BannerBottom = styled.Image`
  width: 100%;
`
