import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text
} from 'react-native';

import MapView from 'react-native-maps';

import { getUserLocation } from '../utils'
import { setInitialRegion, setUserState, setMapState } from '../actions';

class Map extends React.Component {

  constructor(props){
    super(props);
    this.state = {region: null};
  }

  getInitialState(){
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
          initialRegion={this.getInitialState()}/>
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
