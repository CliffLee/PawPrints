import React from 'react';
import {
  View,
  Text
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <TouchableElastic
          style={{ borderWidth: 1, padding: 15, borderRadius: 5 }}
          onPress={() => this.login()}
          >
          <Text>Login</Text>
        </TouchableElastic>
      </View>
    );
  }

  login() {
    // auth stuff
    this.props.navigator.push({ title: 'Form' });
  }
}
