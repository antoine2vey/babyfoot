import React from 'react'
import styled from 'styled-components/native'
import { TextField } from 'react-native-material-textfield'
import { Text, Image, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'

import Stella from '../assets/stella-logo.png'
import LoginButton from './components/LoginButton'

export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }
  static colors = {
    red: '#DA373A',
    fb: '#507CC0'
  }

  _login = () => { 


    const username = this.state.username , password = this.state.password

    Alert.alert(username)
    
    axios.post('https://babyfootapi-mmxfclutov.now.sh/api/user/login', {username, password})
    .then(response => {

      const token = response.data.token 
      Alert.alert(token)
    })
    .catch(error =>{
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
