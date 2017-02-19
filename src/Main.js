console.disableYellowBox = true;
import React from 'react';
import {
  Navigator
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


import rootReducer from './reducers';
import Loading from './components/Loading';
import Login from './components/Login';
import Menu from './components/Menu';
import Map from './components/Map';
import Form from './components/Form';
import Capture from './components/Capture';

const ROUTES = {
  Loading,
  Login,
  Menu,
  Map,
  Form,
  Capture
};

const store = createStore(
  rootReducer
);

const initialRouteStack = [
  { title: 'Login' },
  { title: 'Map' }
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRouteIndex: null
    };
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken()
      .then(data => {
        if (data) {
<<<<<<< HEAD
          this.setState({ initialRouteIndex: 1 });
=======
          this.setState({ routeTitleAfterLoading: 'Menu' });
>>>>>>> 5ed6eddf05b92aef3dc93a98a2eb54d47c7d65b1
          AccessToken.refreshCurrentAccessTokenAsync();
        } else {
          this.setState({ initialRouteIndex: 0 });
        }
      })
  }

  render() {
    if (this.state.initialRouteIndex === null) {
      return null;
    }

    return (
      <Provider store={store}>
        <Navigator
          initialRoute={initialRouteStack[this.state.initialRouteIndex]}
          configureScene={(route, navigator) => Navigator.SceneConfigs.FadeAndroid}
          initialRouteStack={initialRouteStack}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return (
              <Component
                navigator={navigator}
              />
            );
          }}
        />
      </Provider>
    );
  }
}
