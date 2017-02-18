import React from 'react';
import {
  View,
  Text,
  TextInput,
  DatePickerIOS,
  StyleSheet,
  LayoutAnimation
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerHeight: 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.container, { padding: 30 }]}>
          <TouchableElastic
            style={styles.button}
            onPress={() => this.toggleDatePicker()}
            >
            <Text style={styles.text}>Last Seen</Text>
          </TouchableElastic>
          <TouchableElastic style={styles.button}>
            <Text style={styles.text}>General Location</Text>
          </TouchableElastic>
          <TextInput
            style={[styles.multilineInput, styles.text]}
            placeholder="Pet Description"
            multiline={true}
          />
        </View>
        <View style={[styles.datePicker, { height: this.state.datePickerHeight }]}>
          <DatePickerIOS
            mode="datetime"
            date={new Date()}
          />
        </View>
      </View>
    );
  }

  toggleDatePicker() {
    let datePickerHeight = this.state.datePickerHeight > 0 ? 0 : 220;
    LayoutAnimation.easeInEaseOut();
    this.setState({ datePickerHeight });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },
  datePicker: {
    borderTopWidth: 1,
    borderColor: 'gray'
  }
});
