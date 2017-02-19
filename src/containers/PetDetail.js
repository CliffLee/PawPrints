import React from 'react';
import TouchableElastic from 'touchable-elastic';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text
} from 'react-native';

import { width } from '../globalStyles'

class PetDetail extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text style={{ fontSize: 30, alignSelf: 'center' }}>Potential Match!</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            style={{width: width / 2.1, height: width / 2.1}}
            source={{ uri: data.imageUrl }}
          />
          <Image
            style={{width: width / 2.1, height: width / 2.1}}
            source={{ uri: this.props.capture.imagePath }}
          />
        </View>
        <View>
          <Text>{`Name ${data.name}`}</Text>
          <Text>{`Breed ${data.breed}`}</Text>
          <Text>{`Gender ${data.sex}`}</Text>
          <Text>{`Species ${data.species}`}</Text>
          <Text>{`Weight ${data.weight}`}</Text>
        </View>
        <View>
          <Text>Last Seen</Text>
          <Text>{`Time ${data.time}`}</Text>
          <Text>{`Location ${data.latlong}`}</Text>
        </View>

        <TouchableElastic>
          <Text>{`I FOUND ${data.name}!!!`}</Text>
        </TouchableElastic>
      </View>
    );
  }
}


function mapStateToProps({ capture, lostPets }) {
  return {
    capture,
    lostPets
  };
}


export default connect(mapStateToProps)(PetDetail);
