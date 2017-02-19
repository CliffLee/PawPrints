import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { height, width } from '../globalStyles'

class PetDetail extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <View style={[styles.container, {paddingTop: 40, backgroundColor: '#eee'}]}>
        <Text style={{ fontSize: 30, alignSelf: 'center', fontWeight: 'bold', paddingBottom: 10 }}>Potential Match!</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            style={{width: width * 0.4, height: width * 0.4}}
            source={{ uri: data.imageUrl }}/>
          <Image
            style={{width: width * 0.4, height: width * 0.4}}
            source={{ uri: this.props.capture.imagePath }}/>
        </View>
        <View style={styles.container}>
          <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Name</Text></View>
            <Text style={styles.dataValue}>fdsafdsafds</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Breed</Text></View>
            <Text style={styles.dataValue}>{data.breed}</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Gender</Text></View>
            <Text style={styles.dataValue}>{data.sex}</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Species</Text></View>
            <Text style={styles.dataValue}>{data.species}</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Weight</Text></View>
            <Text >{data.weight}</Text>
          </View>
           {/*<View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Last Seen</Text></View>
            <Text></Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Time</Text></View>
            <Text>{data.time}</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>Location</Text></View>
            <Text>{data.latlong}</Text>
          </View>*/}
        </View>

        <TouchableOpacity style={styles.found}>
          <Text style={styles.foundText}>{`I FOUND ${data.name}!!!`}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {

  container: {
     flex: 1,
     color: '#eee',
     alignItems: 'center',
     paddingTop: 10,
     paddingBottom: 50
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eb9c22',
    width: 80,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: -8,
    marginLeft: 6
  },

  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 10,
  },

  dataField: {
    flex: 1,
    backgroundColor: '#fff',
    width: width * 0.8,
    borderRadius: 10,
    borderCollapse: 'separate',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'flex-start',
    overflow: 'hidden',
  },

  dataValue: {
    marginLeft: 100,
  },

  found: {
    height: 50,
    backgroundColor: '#eb9c22',
    position: 'absolute',
    bottom: 0,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  foundText: {
    color: '#fff',
    fontWeight: 'bold',
  }

}


function mapStateToProps({ capture, lostPets }) {
  return {
    capture,
    lostPets
  };
}


export default connect(mapStateToProps)(PetDetail);
