import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { View, Text, AppState } from 'react-native'

import Login from './src/containers/Login'
import Home from './src/containers/Home'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './src/reducers'
import { login } from './src/actions/login'

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
        screen: TabNavigator({
          Amis: {
            screen: Home
          }
        })
      }
    },
    {
      initialRouteName: !token ? 'login' : 'app'
    }
  )
}

class Main extends React.Component {
  render() {
    const { token } = store.getState().login
    const Nav = createNav(token)

    return <Nav />
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
