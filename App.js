import React from 'react';
import styled from 'styled-components/native';
import { StackNavigator } from 'react-navigation';
import { View, Text, AppState } from 'react-native';
import { isEmpty } from 'lodash'

import Login from './src/containers/Login';
import Home from './src/containers/Home'

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './src/reducers';
import { login } from './src/actions/index';

/**
 * Redux
 */
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Iphone>
          <Main />
        </Iphone>
      </Provider>
    );
  }
}

const createNav = token => {
  return StackNavigator({
    login: { screen: Login },
    home: { screen: Home }
  }, {
    initialRouteName: !token ? 'login' : 'home'
  })
}

class Main extends React.Component {
  render() {
    const { token } = store.getState().user
    const Nav = createNav(token)
    
    return <Nav />
  }
}

const Iphone = styled.View`
  flex: 1;
`;

export default App;
