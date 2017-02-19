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

import { getUserLocation, getAddress } from '../utils'
import { setInitialRegion, setUserState, setMapState, setFormState } from '../actions';
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

    let centerMarker = this.props.select ? (
      <Image
        style={{ height: 40, width: 40, position: 'absolute', zIndex: 99, left: width / 2 - 20, top: (height - 180) / 2 }}
        source={require('../resources/images/icons/paw.png')}
      />
    ) : null;

    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
        {centerMarker}
        <MapView
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
          initialRegion={this.getInitialRegion()}
          showsUserLocation={!this.props.select}/>

        {!this.props.select && <TouchableElastic
          style={styles.petFoundButton}
          onPress={() => this.props.navigator.push({ title: 'Capture' })}
          >
           <Text style={styles.petFoundText}>
            <Image style={styles.logo} source={require('../resources/images/logo-white-img.png')}/>
            FOUND
          </Text>
        </TouchableElastic>}
        {
          this.props.select &&
          <View style={styles.locationBox}>
            <Image style={styles.icon} source={require('../resources/images/icons/loc-o.png')}/>
            <Text style={styles.locationText}>Longitude:{this.state.region.longitude}</Text>
            <Text style={styles.locationText}>Latitude: {this.state.region.latitude}</Text>
            <TouchableElastic
              style={styles.petFoundButton}
              onPress={() => this.onHere()}
              >
             <Text style={styles.petFoundText}>HERE</Text>
            </TouchableElastic>
          </View>
        }
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

  onHere() {
    let { latitude, longitude } = this.state.region;
    getAddress(latitude, longitude, address => {
      this.props.setFormState({
        generalLocationAddress: address
      });
    });
    this.props.setFormState({
      generalLocation: {
        lat: latitude,
        lon: longitude
      },
      generalLocationMapModalVisible: false
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
  },
  /*styles for form*/
  locationBox: {
    height: 180,
    alignItems: 'center',
    paddingTop: 20
  },
  icon: {
    height: 25,
    width: 20,
    marginBottom: 10
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
    setFormState,
    setState: setMapState
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
