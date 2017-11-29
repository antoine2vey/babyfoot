import React from 'react'
import styled from 'styled-components/native'
import { TextField } from 'react-native-material-textfield'
import { NavigationActions } from 'react-navigation'
import LoginButton from './LoginButton'
import { Text, Image, TouchableOpacity, Alert, View } from 'react-native'
import Stella from '../../assets/stella-logo.png'
import jwt_decode from 'jwt-decode'

export default class LoginForm extends React.Component {
  state = {
    email: 'getfriends',
    password: 'admin'
  }

  /**
   * Default colors
   */
  static colors = {
    red: '#DA373A',
    fb: '#507CC0'
  }

  _login = () => {
    const { email, password } = this.state

    this.props
      .login(email, password)
      .then(res => {
        const token = jwt_decode(res.token)
        const navigateAction = NavigationActions.navigate({
          routeName: 'app',
          params: { user: token }
        })

        this.props.navigation.dispatch(navigateAction)
      })
      .catch(err => {
        console.log('Error at login', err)
        const displayedErrors = err.errors.reduce(
          (prev, next, i) =>
            (prev += `${next.msg}${i === err.errors.length - 1 ? '' : '\n'}`),
          ''
        )
        Alert.alert('Erreur', displayedErrors)
      })
  }

  _facebookLogin = async () => {
    try {
      console.log('Starting Facebook call')
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '138379676931081',
        {
          permissions: [
            'email',
            'user_location',
            'user_friends',
            'public_profile'
          ],
          behavior: 'web'
        }
      )
      console.log('finished')

      if (type === 'success') {
        const response = await axios.get(
          `https://graph.facebook.com/me?access_token=${
            token
          }&fields=email,first_name,last_name,location,friends,picture`
        )

        console.log(response.data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <LoginView>
        <StellaImage source={Stella} resizeMode="contain" />
        <Form>
          <TextField
            label="Email"
            value={this.state.email}
            tintColor={LoginForm.colors.red}
            onChangeText={email => this.setState({ email })}
          />
          <TextField
            label="Mot de passe"
            value={this.state.password}
            tintColor={LoginForm.colors.red}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
          <LoginButton
            press={() => this._login}
            bgColor={LoginForm.colors.red}
            full
            text="Connexion"
            shadow
          />
        </Form>
        <Text>ou</Text>
        <LoginButton
          press={() => this._facebookLogin}
          bgColor={LoginForm.colors.fb}
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
