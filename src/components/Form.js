import React from 'react';
import {
  View,
  Text,
  TextInput,
  DatePickerIos,
  StyleSheet
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Last Seen</Text>
        <TouchableElastic style={styles.button}>
          <Text style={styles.text}>Time</Text>
        </TouchableElastic>
        <TouchableElastic style={styles.button}>
          <Text style={styles.text}>Location</Text>
        </TouchableElastic>
        <TextInput
          style={styles.multilineInput}
          placeholder="description"
          multiline={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff'
},
  button: {
    borderWidth: 1, marginBottom: 10
  },
  multilineInput: {
    height: 100,
    borderWidth: 1,
    marginBottom: 10
  },
  text: {
    fontSize: 20
  }
});
