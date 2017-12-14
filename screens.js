import { Navigation } from 'react-native-navigation'

import Login from './src/containers/Login'
import Home from './src/containers/Home'
import Games from './src/containers/Games'
import Stats from './src/containers/Stats'
import Friends from './src/containers/Friends'
import GameRoom from './src/containers/GameRoom'

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('stella.Login', () => Login, ...arguments)
  Navigation.registerComponent('stella.Games', () => Games, ...arguments)
  Navigation.registerComponent('stella.Friends', () => Home, ...arguments)
  Navigation.registerComponent('stella.Stats', () => Stats, ...arguments)
  Navigation.registerComponent('stella.Foo', () => Friends, ...arguments)
  Navigation.registerComponent('stella.GameRoom', () => GameRoom, ...arguments)
}
