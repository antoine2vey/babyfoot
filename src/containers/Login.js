import React from 'react'
import styled from 'styled-components/native'
import { TextField } from 'react-native-material-textfield'
import { Text, Image, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
//import * as jwt from 'jsonwebtoken'

import Stella from '../../assets/stella-logo.png'
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

        //const token = jwt.decode(res.token) 

        //console.log(token)

        // Décoder le token ici et envoyer via route param
        console.log(res.token)
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
