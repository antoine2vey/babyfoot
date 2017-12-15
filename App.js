import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens'
import { View, Text, AppState, Image } from 'react-native'

import Banner from './assets/bottom-banner.jpg'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './src/reducers'
import { iconsLoaded } from './src/utils/icons'

/**
 * Redux
 */
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

registerScreens(store, Provider)

class App extends Component {
  constructor(props) {
    super(props)

    iconsLoaded.then(() => {
      this.startApp()
    })
  }

  startApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'stella.Login',
        title: 'Connexion'
      }
    })
  }
}

export default App
