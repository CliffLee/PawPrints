import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

export default class Main extends Component{

	componentDidMount(){
		setTimeout(() => {
			this.start();
		}, 1000);
	}

	render(){
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
				<Image
					style={styles.image}
					source={require('../resources/images/logo-large.png')}/>
	      	</View>
		);
	}

	start(){
		this.props.navigator.push({ title: 'Login' });
	}

}

const styles = StyleSheet.create({

	image: {
		width: 130,
		height: 100
	}

});