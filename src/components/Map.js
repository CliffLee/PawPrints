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
    this.state = {initialRegion: null};
  }

  render() {

    var initLat = null,
        initLong = null;

    if(this.state.initialRegion == null){
      return (
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
          </View>
      );
    }

    initLat = this.state.initialRegion.latitude;
    initLong = this.state.initialRegion.longitude;

    console.log(initLat);
    console.log(initLong)

    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>

        <MapView
          style={{ flex: 1 }}
            initialRegion={{
                          latitude: initLat,
                          longitude: initLong,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421
                        }}
        />
      </View>
    );
  }

  componentWillMount() {
    getUserLocation(location => {
      console.log('LOCATION', location)
      this.props.setUserState({ location });
      this.setState({initialRegion: location})
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
