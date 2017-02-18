import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <TouchableElastic
          style={styles.button}
          onPress={() => this.login()}
          >
          <Text>Login</Text>
        </TouchableElastic>
      </View>
    );
  }

  login() {
    // auth stuff
    this.props.navigator.push({ title: 'Map' });
  }
}

const styles = StyleSheet.create({

	button: {
		borderWidth: 1,
		padding: 15,
		borderRadius: 5
	}

});