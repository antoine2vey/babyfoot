import React from 'react'
import styled from 'styled-components/native'
import { TextField } from 'react-native-material-textfield'
import { NavigationActions } from 'react-navigation'
import LoginButton from './LoginButton'
import { Text, Image, TouchableOpacity, Alert, View } from 'react-native'
import Stella from '../../assets/stella-logo.png'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Navigation } from 'react-native-navigation'

export default class LoginForm extends React.Component {
  state = {
    email: 'pierre@ewill.fr',
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

        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Parties',
              screen: 'stella.Games',
              title: 'Parties'
            },
            {
              label: 'Amis',
              screen: 'stella.Friends',
              title: 'Amis'
            },
            {
              label: 'Stats',
              screen: 'stella.Stats',
              title: 'Stats'
            }
          ],
          drawer: {
            // optional, add this if you want a side menu drawer in your app
            left: {
              // optional, define if you want a drawer from the left
              screen: 'stella.Foo', // unique ID registered with Navigation.registerScreen
              passProps: {} // simple serializable object that will pass as props to all top screens (optional)
            },
            style: {
              // ( iOS only )
              drawerShadow: false, // optional, add this if you want a side menu drawer shadow
              contentOverlayColor: 'rgba(0,0,0,0.2)',
              leftDrawerWidth: 80, // optional, add this if you want a define left drawer width (50=percent)
              shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
            },
            type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
            animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
            // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
            disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
          },
          tabsStyle: {
            tabBarLabelColor: 'rgba(204, 0, 0, .5)',
            tabBarSelectedLabelColor: 'rgb(204, 0, 0)',
            tabBarBackgroundColor: 'white',
            initialTabIndex: 1
          },
          appStyle: {
            orientation: 'portrait'
          },
          passProps: {
            user: token
          },
          animationType: 'fade'
        })
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
        '138379676931081'
      )

      if (type === 'success') {
        const response = await axios.get(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,first_name,last_name,location,friends,picture`
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
