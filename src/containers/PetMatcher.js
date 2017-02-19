import React from 'react';
import TouchableElastic from 'touchable-elastic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';

import { width } from '../globalStyles'

let lostPetsData = [
  { imageUrl: 'https://facebook.github.io/react/img/logo_og.png' },
  { imageUrl: 'https://facebook.github.io/react/img/logo_og.png' },
  { imageUrl: 'https://facebook.github.io/react/img/logo_og.png' },
  { imageUrl: 'https://facebook.github.io/react/img/logo_og.png' },
  { imageUrl: 'https://facebook.github.io/react/img/logo_og.png' },
];

class PetMatcher extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{ width: width / 1.3, height: width / 1.3, justifyContent: 'flex-end', alignItems: 'flex-end' }}
            source={{ uri: this.props.capture.imagePath }}
            >
            <TouchableElastic
              onPress={this.props.navigator.pop}
              style={{padding: 10}}
              >
              <Image
                style={{height: 30, width: 30}}
                source={require('../resources/images/icons/camera.png')}
              />
            </TouchableElastic>
          </Image>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          >
          {lostPetsData.map((data, i) => {
            return (
              <View
                key={i}
                style={{ width, alignItems: 'center' }}
                >
                <TouchableWithoutFeedback onPress={() => this.onPress(data)}>
                  <Image
                    style={{width: width / 1.3, height: width / 1.3 }}
                    source={{ uri: data.imageUrl }}
                  />
                </TouchableWithoutFeedback>
              </View>
            );
          })}
          <View style={{ width, alignItems: 'center' }}>
            <View style={{width: width / 1.3, height: width / 1.3, backgroundColor: 'gray' }}>
              <Text>Didn't find any matches?</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onPress(data) {
    var delta = new Date().getTime() - this.lastPress;
    if(delta < 200) {
      this.props.navigator.push({ data, title: 'PetDetail' });
    }
    this.lastPress = new Date().getTime();
  }
}

function mapStateToProps({ capture, lostPets }) {
  return {
    capture,
    lostPets
  };
}


export default connect(mapStateToProps)(PetMatcher);
