import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image
} from 'react-native';

import { width } from '../globalStyles';

import TouchableElastic from 'touchable-elastic';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

class Menu extends Component{

	render(){
		return (
			<Image source={require('../resources/images/cat.png')} style={styles.container}>
				<Text style={styles.text}>I&apos;ve</Text>
				<View style={{display: 'flex', flexDirection: 'row', margin: 20, justifyContent: 'center', alignItems: 'center'}}>
					<TouchableElastic elevation={5} style={styles.buttonLost} onPress={() => this.lost()}>
						<Image style={styles.image} source={require('../resources/images/logo-lost.png')}/>
					</TouchableElastic>
					<Text style={styles.textSmall}>OR</Text>
					<TouchableElastic style={styles.buttonFound} onPress={() => this.found()}>
						<Image style={styles.image} source={require('../resources/images/logo-found.png')}/>
					</TouchableElastic>
				</View>
				<Text style={styles.text}>a pet.</Text>
					<LoginButton
						style={styles.button}
						publishPermissions={["publish_actions"]}
						onLoginFinished={
							(error, result) => {
							 	if (error) {
							       alert("login has error: " + result.error);
							     } else if (result.isCancelled) {
							       alert("login is cancelled.");
							 	}
							}
						}
						onLogoutFinished={() => this.backToLogin()}/>
		     </Image>
		);
	}

	found(){
		this.props.navigator.push({title: 'Map'});
	}

	lost(){
		this.props.navigator.push({title: 'Form'});
	}

	backToLogin(){
		this.props.navigator.jumpBack();
	}

}

const styles = StyleSheet.create({

	text: {
		color: '#fff',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		fontSize: 48
	},

	textSmall: {
		color: '#fff',
		fontFamily: 'Helvetica',
		fontWeight: 'bold',
		fontSize: 24
	},

	container: {
		flex: 1,
		justifyContent:'center',
		alignItems: 'center',
		height: 100,
		width: null,
    	height: null,
	},

	image: {
		width: 80,
		height: 80
	},

	button: {
		backgroundColor: '#4469b0',
		width,
		height: 50,
		position: 'absolute',
		bottom: 0,
	},

	buttonLost: {
		backgroundColor: '#fff',
		height: 100,
		width: 100,
		borderRadius: 10,
		marginRight: 20,
	    shadowColor: '#000000',
	    shadowOffset: {
	      width: 0,
	      height: 1
	    },
	    shadowRadius: 1,
	    shadowOpacity: 0.2
	},

	buttonFound: {
		backgroundColor: '#fff',
		height: 100,
		width: 100,
		marginLeft: 20,
		borderRadius: 10,
	    shadowColor: '#000000',
	    shadowOffset: {
	      width: 0,
	      height: 1
	    },
	    shadowRadius: 1,
	    shadowOpacity: 0.2
	},

	buttonText: {
		color: '#fff'
	}

});

export default Menu;