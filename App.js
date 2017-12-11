import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { View, Text, AppState, Image } from 'react-native'

import Login from './src/containers/Login'
import Home from './src/containers/Home'
import Games from './src/containers/Games'
import Stats from './src/containers/Stats'
import Friends from './src/containers/Friends'

import Banner from './assets/bottom-banner.jpg'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './src/reducers'

/**
 * Redux
 */
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(rootReducer, applyMiddleware(...middleware))
const createNav = token => {
  return StackNavigator(
    {
      login: { screen: Login },
      app: {
        screen: TabNavigator(
          {
            Parties: {
              screen: Games
            },
            Amis: {
              screen: Home
            },
            Stats: {
              screen: Stats
            }
          },
          {
            initialRouteName: 'Parties',
            swipeEnabled: true,
            tabBarPosition: 'top',
            animationEnabled: true,
            tabBarOptions: {
              activeTintColor: 'rgba(202,0,0,1)',
              inactiveTintColor: 'rgba(202,0,0,.2)',
              labelStyle: {
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 15
              },
              style: {
                shadowColor: 'rgba(0,0,0,.5)',
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                borderTopWidth: 0,
                backgroundColor: 'white'
              }
            }
          }
        )
      },
      test: {
        screen: Friends
      }
    },
    {
      initialRouteName: !token ? 'login' : 'app',
      headerMode: 'screen',
      cardStyle: {
        backgroundColor: 'white'
      }
    }
  )
}

class Main extends React.Component {
  render() {
    const { token } = store.getState().login
    const Nav = createNav(token)

    return (
      <View style={{ flex: 1 }}>
        <Nav />
        <Image source={Banner} style={{ width: '100%' }} />
      </View>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App
