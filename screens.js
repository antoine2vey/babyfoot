import { Navigation } from 'react-native-navigation'

import { iconsMap } from './src/utils/icons'

import Login from './src/containers/Login'
import Home from './src/containers/Home'
import Games from './src/containers/Games'
import Stats from './src/containers/Stats'
import Friends from './src/containers/Friends'
import GameRoom from './src/containers/GameRoom'
import CreateGame from './src/containers/CreateGame'

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('stella.Login', () => Login, ...arguments)
  Navigation.registerComponent('stella.Games', () => Games, ...arguments)
  Navigation.registerComponent('stella.Friends', () => Home, ...arguments)
  Navigation.registerComponent('stella.Stats', () => Stats, ...arguments)
  Navigation.registerComponent('stella.Foo', () => Friends, ...arguments)
  Navigation.registerComponent('stella.GameRoom', () => GameRoom, ...arguments)
  Navigation.registerComponent(
    'stella.CreateGame',
    () => CreateGame,
    ...arguments
  )
}

export function createMainApp(props = {}, drawerProps = {}) {
  return Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Parties',
        screen: 'stella.Games',
        title: 'Parties',
        icon: iconsMap['ios-football-outline'],
        selectedIcon: iconsMap['ios-football']
      },
      {
        label: 'Amis',
        screen: 'stella.Friends',
        title: 'Amis',
        icon: iconsMap['ios-contact-outline'],
        selectedIcon: iconsMap['ios-contact']
      },
      {
        label: 'Stats',
        screen: 'stella.Stats',
        title: 'Stats',
        icon: iconsMap['ios-stats-outline'],
        selectedIcon: iconsMap['ios-stats']
      }
    ],
    drawer: {
      // optional, add this if you want a side menu drawer in your app
      left: {
        // optional, define if you want a drawer from the left
        screen: 'stella.Foo', // unique ID registered with Navigation.registerScreen
        passProps: drawerProps // simple serializable object that will pass as props to all top screens (optional)
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
      disableOpenGesture: true // optional, can the drawer be opened with a swipe instead of button
    },
    tabsStyle: {
      tabBarLabelColor: 'rgba(204, 70, 70, .5)',
      tabBarSelectedLabelColor: 'rgb(204, 70, 70)',
      tabBarSelectedButtonColor: 'rgb(204, 70, 70)',
      tabBarBackgroundColor: 'white'
    },
    appStyle: {
      orientation: 'portrait'
    },
    passProps: props,
    animationType: 'fade'
  })
}
