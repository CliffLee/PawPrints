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
  }
];

class LostPetsList extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={ds.cloneWithRows(lostPetsData)}
          renderRow={(data, i) => this.renderRow(data, i)}
          renderSeparator={() => (<View style={styles.separator} />)}
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
        <View style={{ flex: 1 }}>
          <Image
            style={styles.image}
            source={{ uri: data.imageUrl }}
          />
        </View>
        <View style={{ flex: 5 }}>
          <Text>{data.name}</Text>
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
    padding: 5
  },
  separator: {
    backgroundColor: 'gray'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35
  }
});

export default connect(mapStateToProps)(LostPetsList);
