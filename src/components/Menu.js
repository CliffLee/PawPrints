import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image
} from 'react-native';

class Menu extends Component{

	render(){
		return(
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={require('../resources/images/logo-large-dog.png')}/>
	      	</View>
		);
	}

}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#f1e6bf',
		justifyContent:'center',
		alignItems: 'center'
	},

	image: {
		width: 183,
		height: 140
	},

});

export default Menu;