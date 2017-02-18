import React from 'react';
import {
  Navigator
} from 'react-native';

import Login from './components/Login';
import Map from './components/Map';
import Form from './components/Form';

const ROUTES = {
  Login,
  Map,
  Form
};

export default class Main extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Login' }}
        renderScene={(route, navigator) => {
          let Component = ROUTES[route.title];
          return (<Component navigator={navigator} />);
        }}
      />
    );
  }
}
