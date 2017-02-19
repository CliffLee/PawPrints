import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ListView,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import { width } from '../globalStyles'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let lostPetsData = [
  {
    uuid: '',
    imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
    location: {
      latitude: 0,
      longitude: 0
    },
    time: new Date(),
    breed: 'idk',
    name: 'Bernie',
    weight: '14',
    sex: 'Male'
  },
  {
    uuid: '',
    imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
    location: {
      latitude: 0,
      longitude: 0
    },
    time: new Date(),
    breed: 'idk',
    name: 'Bernie',
    weight: '14',
    sex: 'Male'
  }
];

class LostPetsList extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={ds.cloneWithRows(lostPetsData)}
          renderRow={(data, s, r) => this.renderRow(data, r)}
          renderSeparator={(i, r) => (<View key={r} style={styles.separator} />)}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }

  renderRow(data, key) {
    console.log('KEY', key)
    return (
      <View
        style={styles.row}
        key={key}
        >
        <View style={[styles.centerY]}>
          <Image
            style={styles.image}
            source={{ uri: data.imageUrl }}
          />
        </View>
        <View style={[{ marginLeft: 10 }, styles.centerY]}>
          <Text style={styles.infoText}>{`Name: ${data.name}`}</Text>
          <Text style={styles.infoText}>{`breed: ${data.breed}`}</Text>
          <Text style={styles.infoText}>{`weight: ${data.weight}`}</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ lostPets }) {
  return {
    lostPets
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10
  },
  separator: {
    backgroundColor: 'gray',
    height: 1
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 45
  },
  infoText: {
    fontSize: 25
  },
  centerY: {
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps)(LostPetsList);
