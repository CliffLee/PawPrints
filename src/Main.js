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
import Map from './components/Map';
import Form from './components/Form';

const ROUTES = {
  Loading,
  Login,
  Map,
  Form
};

const store = createStore(
  rootReducer
);

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeTitleAfterLoading: null
    };
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken()
      .then(data => {
        if (data) {
          this.setState({ routeTitleAfterLoading: 'Map' });
          AccessToken.refreshCurrentAccessTokenAsync();
        } else {
          this.setState({ routeTitleAfterLoading: 'Login' });
        }
      })
  }

  render() {
    if (!this.state.routeTitleAfterLoading) {
      return null;
    }

    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{ title: 'Loading' }}
          configureScene={(route, navigator) => Navigator.SceneConfigs.FadeAndroid}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return (
              <Component
                navigator={navigator}
                routeTitleAfterLoading={this.state.routeTitleAfterLoading}
              />
            );
          }}
        />
      </Provider>
    );
  }
}
