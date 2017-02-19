import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { height, width } from '../globalStyles'

class PetDetail extends React.Component {

  sendEmail(){
    this.props.navigator.push({ title: 'Email' });
  }

  render() {
    let { data } = this.props;
    return (
      <View style={[styles.container, {paddingTop: 40, backgroundColor: '#eee'}]}>
        <Text style={{ fontSize: 30, alignSelf: 'center', fontWeight: 'bold', paddingBottom: 20 }}>Potential Match!</Text>
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
            <View style={styles.button}><Text style={styles.buttonText}>NAME</Text></View>
            <Text style={styles.dataValue}>Scoobs</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>BREED</Text></View>
            <Text style={styles.dataValue}>Pitbull Mix</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>GENDER</Text></View>
            <Text style={styles.dataValue}>Male</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>SPECIES</Text></View>
            <Text style={styles.dataValue}>Dog</Text>
          </View>
           <View style={styles.dataField}>
            <View style={styles.button}><Text style={styles.buttonText}>WEIGHT</Text></View>
            <Text style={styles.dataValue}>16.4kg</Text>
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

        <TouchableOpacity style={styles.found} onPress={() => this.sendEmail()}>
          <Text style={styles.foundText}>{`I FOUND SCOOBS!!!`}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
    paddingTop: 40
  },

  dataField: {
    width: width* 0.8,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },

  dataValue: {
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20
  },

  button: {
    backgroundColor: '#eb9c22',
    borderRadius: 10,
    width: 100,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
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

});


function mapStateToProps({ capture, lostPets }) {
  return {
    capture,
    lostPets
  };
}


export default connect(mapStateToProps)(PetDetail);
