import React, { PropTypes, Component } from 'react';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends React.Component {

	constructor(props){
		super(props);

		this.marginValue = new Animated.Value(-60);
	}

	render() {
  	return (
    	<Image source={require('../resources/images/dog.png')} style={styles.container}>
      	<Animated.Image
				style={[styles.image, {marginTop: this.marginValue}]}
				source={require('../resources/images/logo-white.png')}/>
      	<TouchableElastic>
	      	<LoginButton
	      	  style={styles.button}
	          publishPermissions={["publish_actions"]}
	          onLoginFinished={
	            (error, result) => {
	              if (error) {
	                alert("login has error: " + result.error);
	              } else if (result.isCancelled) {
	                alert("login is cancelled.");
	              } else {
	                AccessToken.getCurrentAccessToken()
                    .then(() => this.props.navigator.jumpForward())
	              }
	            }
	          }
	          onLogoutFinished={() => alert("logout.")}
          />
    		</TouchableElastic>
      </Image>
    );
  }

  componentDidMount(){
		this.animateIn();
	}

	animateIn(){
		Animated.timing(this.marginValue, {
			toValue: 0,
			duration: 300,
			easing: Easing.ease
		}).start();
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
		backgroundColor: '#4469b0',
		width: 200,
		height: 30,

	},

	image: {
		width: 200,
		height: 150,
	}

});
