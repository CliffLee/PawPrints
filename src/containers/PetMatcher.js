import React from 'react';
import TouchableElastic from 'touchable-elastic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Animated,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';

import { width } from '../globalStyles'

let lostPetsData = [
  { imageUrl: 'https://www.dogstrust.org.uk/dogimages/1164893_joy_20170218112127_joy_253.jpg' },
  { imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/a9/a3/46/a9a34606f68f5f86aa94833ad482e4c9.jpg' },
  { imageUrl: 'https://i.ytimg.com/vi/opKg3fyqWt4/hqdefault.jpg' },
  { imageUrl: 'https://www.dogstrust.org.uk/dogimages/1164893_joy_20170218112127_joy_253.jpg' },
  { imageUrl: 'https://i.ytimg.com/vi/opKg3fyqWt4/hqdefault.jpg' },
];

class PetMatcher extends React.Component {

  constructor(props){
    super(props);

    this.opacityValue = new Animated.Value(0);
  }

  selectMatch(callback){
    Animated.timing(this.opacityValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease
    }).start(callback);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#ffedd0' }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={[styles.image, {justifyContent: 'flex-end', alignItems: 'flex-end' }]}
            source={{ uri: this.props.capture.imagePath }}>
            <TouchableElastic
              onPress={this.props.navigator.pop}
              style={{padding: 10}}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../resources/images/icons/camera.png')}/>
            </TouchableElastic>
          </Image>
        </View>
        <Text style={styles.headerText}>DOUBLE TAP PHOTO BELOW TO MATCH</Text>
        <ScrollView
          style={{ flex: 1, marginTop: 20 }}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}>
          {lostPetsData.map((data, i) => {
            return (
              <View
                key={i}
                style={{ width, alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => this.onPress(data)}>
                  <Image
                    style={styles.image}
                    source={{ uri: data.imageUrl }}>
                      <Animated.Image
                        style={{height: width * 0.3, width: width * 0.3, opacity: this.opacityValue}} 
                        source={require('../resources/images/logo-white-img.png')}/>
                  </Image>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
          <View style={{ width, alignItems: 'center' }}>
            <View style={[styles.image, {alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Didn&apos;t find any matches?</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onPress(data) {
    var delta = new Date().getTime() - this.lastPress;
    if(delta < 200) {
      this.selectMatch(() => {
        setTimeout(() => {
          this.props.navigator.push({ data, title: 'PetDetail' });
        }, 500);
      });
    }
    this.lastPress = new Date().getTime();
  }
}

const styles = StyleSheet.create({

  headerText: {
    fontWeight: 'bold'
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: 'gray',
    borderWidth: 5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }

});

function mapStateToProps({ capture, lostPets }) {
  return {
    capture,
    lostPets
  };
}


export default connect(mapStateToProps)(PetMatcher);
