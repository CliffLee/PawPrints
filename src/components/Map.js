import React from 'react';
import {
  View,
  Text
} from 'react-native';

import MapView from 'react-native-maps';

export default class Main extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
        <MapView
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
