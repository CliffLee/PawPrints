import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class Main extends Component{

	constructor(props){
		super(props);
		this.bounceValue = new Animated.Value(0);
		this.fadeValue = new Animated.Value(1);
	}

	componentDidMount(){
		this.bounce();
		setTimeout(() => {
			this.start();
		}, 2000);
	}

	bounce(){
		this.bounceValue.setValue(1.5);
	    Animated.spring(                          // Base: spring, decay, timing
	    	this.bounceValue,
	    	{
		        toValue: 1,
		        friction: 3,
	    	}
	    ).start();
	}

	render(){
		return (
			<View style={styles.container}>
				<Animated.Image
					style={[styles.image, {
						transform: [
				            {scale: this.bounceValue}
				        ],
				        opacity: this.fadeValue
					}]}
					source={require('../resources/images/logo-large.png')}/>
	      	</View>
		);
	}

	start(){
		this.props.navigator.push({ title: this.props.routeTitleAfterLoading });
	}
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		justifyContent:
		'center',
		alignItems: 'center',
		backgroundColor: '#f1e6bf'
	},

	image: {
		width: 183,
		height: 140
	},

	button: {
		borderWidth: 0,
		borderColor: '#eb9c22',
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#555655',
		width: 180
	},

	buttonText: {
		color: '#fff',
		fontSize: 24,
		fontFamily: 'Helvetica',
		fontWeight: '900',
		letterSpacing: 2
	}

});
