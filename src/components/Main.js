console.disableYellowBox = true;
import React from 'react';
import {
  Navigator
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import rootReducer from '../reducers';
import Login from './Login';
import Menu from './Menu';
import Email from './Email';
import Map from '../containers/Map';
import Form from '../containers/Form';
import Capture from '../containers/Capture';
import LostPetsList from '../containers/LostPetsList';
import PetMatcher from '../containers/PetMatcher';
import PetDetail from '../containers/PetDetail';

const ROUTES = {
  Login,
  Menu,
  Map,
  Form,
  Capture,
  LostPetsList,
  PetMatcher,
  PetDetail,
  Email
};

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

const initialRouteStack = [
  { title: 'Login' },
  { title: 'Menu' }
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
          this.setState({ initialRouteIndex: 1 });
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
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Navigator
          initialRoute={initialRouteStack[this.state.initialRouteIndex]}
          configureScene={this.configureScene}
          initialRouteStack={initialRouteStack}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return (
              <Component
                navigator={navigator}
                data={route.data}/>
            );
          }}
        />
      </Provider>
    );
  }

  configureScene(route) {
    if (!['Menu', 'Form', 'Map'].includes(route.title)) {
      return Navigator.SceneConfigs.FadeAndroid
    } else {
      return Navigator.SceneConfigs.PushFromRight
    }
  }
}
