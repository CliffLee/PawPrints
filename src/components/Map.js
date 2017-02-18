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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
        <MapView
          style={{ flex: 1 }}
          // initialRegion={}
        />
      </View>
    );
  }

  componentDidMount() {
    getUserLocation(location => {
      console.log('LOCATION', location)
      this.props.setUserState({ location });
    });
  }
}

function mapStateToProps({ map }) {
  return {
    map
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
