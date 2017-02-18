console.disableYellowBox = true;
import React from 'react';
import {
  Navigator
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import Login from './components/Login';
import Map from './components/Map';
import Form from './components/Form';

const ROUTES = {
  Login,
  Map,
  Form
};

const store = createStore(
  rootReducer
);

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{ title: 'Login' }}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return (<Component navigator={navigator} />);
          }}
        />
      </Provider>
    );
  }
}
