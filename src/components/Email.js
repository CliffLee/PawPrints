import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing
} from 'react-native';

class Email extends Component{

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.textLarge}>Thanks for reporting!</Text>
				<Text style={styles.text}>Your tip was sent to a nearby animal shelter.</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({

	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eb9c22',
	},
	textLarge: {
		color: '#fff',
		fontWeight: 'bold', fontSize: 24
	},
	text: {
		color: '#fff',
	}

});

export default Email;