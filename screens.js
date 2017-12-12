import { Navigation } from 'react-native-navigation'

import Login from './src/containers/Login'
import Home from './src/containers/Home'
import Games from './src/containers/Games'
import Stats from './src/containers/Stats'
import Friends from './src/containers/Friends'

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('stella.Login', () => Login, store, Provider)
  Navigation.registerComponent('stella.Games', () => Games, store, Provider)
  Navigation.registerComponent('stella.Friends', () => Home, store, Provider)
  Navigation.registerComponent('stella.Stats', () => Stats, store, Provider)
  Navigation.registerComponent('stella.Foo', () => Friends)
}
