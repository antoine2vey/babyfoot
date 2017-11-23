import React from 'react'
import styled from 'styled-components/native'
import { TextField } from 'react-native-material-textfield'
import { Text, Image, TouchableOpacity, Alert, View } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'

import Stella from '../../assets/stella-logo.png'
import Banner from '../../assets/bottom-banner.jpg'
import LoginButton from '../components/LoginButton'
import { login } from '../actions'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }
  static colors = {
    red: '#DA373A',
    fb: '#507CC0'
  }

  _login = () => {
    const { username, password } = this.state

    this.props.login(username, password)
      .then((res) => {
      
          const token = jwt_decode(res.token)
       
        Alert.alert('Connecté')
      })
      .catch(({errors}) => {
        const displayedErrors = errors.reduce((prev, next, i) => prev += `${next.msg}${(i === errors.length - 1) ? '' : '\n'}`, '')
        Alert.alert('Erreur', displayedErrors)
      })
  }

  _facebookLogin = () => {
    Alert.alert('Login FB')
  }

  render() {
    return (
      <View style={{flex : 1, backgroundColor: 'white'}}>
        <LoginView>
          <StellaImage source={Stella} resizeMode="contain" />

          <Form>
            <TextField
              label="Email"
              value={this.state.username}
              tintColor={Login.colors.red}
              onChangeText={username => this.setState({ username })}
            />
            <TextField
              label="Mot de passe"
              value={this.state.password}
              tintColor={Login.colors.red}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
            />
            <LoginButton
              press={() => this._login}
              color={Login.colors.red}
              full
              text="Connexion"
              shadow
            />
          </Form>
          <Text>ou</Text>
          <LoginButton
            press={() => this._facebookLogin}
            color={Login.colors.fb}
            full
            rounded
            icon="logo-facebook"
            text="Se connecter avec Facebook"
          />
        </LoginView>
        <BannerBottom source={Banner} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggingIn: state.user.isLoggingIn,
  token: state.user.token
})

export default connect(mapStateToProps, { login })(Login)

const LoginView = styled.View`
  flex: 1;
  align-items: center;
  padding: 40px;
`

const Form = styled.View`
  width: 100%;
`

const StellaImage = styled.Image`
  width: 180px;
`

const BannerBottom = styled.Image`
  width: 100%;
`;
