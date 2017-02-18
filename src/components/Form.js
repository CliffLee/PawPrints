import React from 'react';
import {
  View,
  Text,
  TextInput,
  DatePickerIos
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' }}>
        <Text>Last Seen</Text>
        <TouchableElastic style={{ borderWidth: 1, marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>Time</Text>
        </TouchableElastic>
        <TouchableElastic style={{ borderWidth: 1, marginBottom: 40 }}>
          <Text style={{ fontSize: 20 }}>Location</Text>
        </TouchableElastic>
        <TextInput
          style={{ borderWidth: 1, height: 100, padding: 5, fontSize: 20 }}
          placeholder="description"
          multiline={true}
        />
      </View>
    );
  }
}

// const styles = StyleSheat.c
