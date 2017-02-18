import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends React.Component {
  render() {
    return (
      <Image source={require('../resources/images/dog.png')} style={styles.container}>
      	<Image
			style={styles.image}
			source={require('../resources/images/logo-white.png')}/>
        <TouchableElastic
          style={styles.button}
          onPress={() => this.login()}
          >
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableElastic>
      </Image>
    );
  }

  login() {
    // auth stuff
    this.props.navigator.push({ title: 'Map' });
  }
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		width: null,
    	height: null,
		justifyContent:'center',
		alignItems: 'center'
	},

	button: {
		borderWidth: 0,
		padding: 20,
		borderRadius: 10,
		width: 180,
		backgroundColor: '#eb9c22'
	},

	buttonText: {
		color: '#fff'
	},

	image: {
		width: 200,
		height: 150
	}

});