import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import TouchableElastic from 'touchable-elastic';
import MapView from 'react-native-maps';

import { getUserLocation } from '../utils'
import { setInitialRegion, setUserState, setMapState } from '../actions';
import { width, height } from '../globalStyles';

class Map extends React.Component {

  constructor(props){
    super(props);
    this.state = {region: null};
  }

  getInitialRegion(){ // throws error; reserved function name
    var initLat = this.state.region.latitude,
        initLong = this.state.region.longitude;

    return {
        latitude: initLat,
        longitude: initLong,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
  }

  onRegionChange(region){
    this.setState({region});
  }

  render() {

    if(this.state.region == null){
      return (
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
          </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
        <MapView
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
          initialRegion={this.getInitialRegion()}
          showsUserLocation={true}/>
        <TouchableElastic
          style={styles.petFoundButton}
          onPress={() => this.props.navigator.push({ title: 'Capture' })}
          >
           <Text style={styles.petFoundText}>
            <Image style={styles.logo} source={require('../resources/images/logo-white-img.png')}/>
            FOUND
          </Text>
        </TouchableElastic>
      </View>
    );
  }

  componentWillMount() {
    getUserLocation(location => {
      console.log('LOCATION', location)
      this.props.setUserState({ location });
      this.setState({region: location})
    });
  }
}

const styles = StyleSheet.create({
  petFoundButton: {
    position: 'absolute',
    width: 200,
    height: 40,
    left: width / 2 - 102,
    bottom: 30,
    backgroundColor: '#eb9c22',
    borderRadius: 100
  },
  petFoundText: {
    fontSize: 20,
    color: '#fff',
    marginTop: -5
  },
  logo: {
    width: 30,
    height: 25,
    marginRight: 10,
    marginTop: 5
  }
});

function mapStateToProps({ map, initialRegion }) {
  return {
    map, initialRegion
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setInitialRegion,
    setUserState,
    setState: setMapState
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
