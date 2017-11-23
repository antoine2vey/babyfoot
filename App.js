import React from 'react';
import styled from 'styled-components/native';
import { StackNavigator } from 'react-navigation';
import { View, Text, AppState } from 'react-native';

import Banner from './assets/bottom-banner.jpg';
import Login from './src/Login';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './src/reducers';

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
      <Iphone>
        <Login />
        <BannerBottom source={Banner} />
      </Iphone>
    );
  }
}

const Iphone = styled.View`
  flex: 1;
`;

const BannerBottom = styled.Image`
  width: 100%;
`;

export default App;
