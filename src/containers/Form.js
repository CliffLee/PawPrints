import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  DatePickerIOS,
  StyleSheet,
  LayoutAnimation,
  Modal,
  Image
} from 'react-native';

import { width } from '../globalStyles';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import MapView from 'react-native-maps';
import TouchableElastic from 'touchable-elastic';
import {
  setFormState
} from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerHeight: 0
    }
  }

  render() {
    let { setState, form } = this.props;
    let { lastSeen, generalLocation, petDescription, generalLocationMapModalVisible } = form;

    return (
      <View style={styles.containerOuter}>

        <View style={styles.containerHeader}>
          <Text style={styles.textHeader}>
            <Image style={styles.logo} source={require('../resources/images/logo-white-img.png')}/>
            Tell us more.
          </Text>
        </View>

        <TouchableElastic style={styles.carousel}>
          <Image style={styles.image} source={require('../resources/images/upload.png')}/>
        </TouchableElastic>

        <View style={styles.container}>
          <View style={[styles.container, { paddingRight: 30, paddingLeft: 30 }]}>

            <TouchableElastic
              style={[styles.button, {marginTop: -40}]}
              onPress={() => this.toggleDatePicker()}>
              <Text style={styles.text}>
                <Image style={styles.icon} source={require('../resources/images/icons/time-o.png')}/>
                {lastSeen ? moment(lastSeen).format('MMMM D YYYY, h:mm a') : 'When last seen'}
              </Text>
            </TouchableElastic>

            <TouchableElastic
              style={styles.button}
              onPress={() => this.toggleMap()}>
              <Text style={styles.text}>
                <Image style={styles.icon} source={require('../resources/images/icons/loc-o.png')}/>
                {generalLocation || 'General location'}
              </Text>
            </TouchableElastic>

            <TextInput
              style={[styles.multilineInput, styles.text]}
              placeholder="Description of your pet."
              multiline={true}
              value={petDescription}
              onChangeText={petDescription => setState({ petDescription })} />

            <TouchableElastic
              onPress={() => this.submit()}
              style={styles.submitButton}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableElastic>

          </View>

          <View style={[styles.datePicker, { height: this.state.datePickerHeight }]}>
            <DatePickerIOS
              mode="datetime"
              maximumDate={new Date()}
              date={lastSeen || new Date()}
              onDateChange={lastSeen => setState({ lastSeen })}/>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={generalLocationMapModalVisible}
            >
            <View style={{ flex: 1, borderWidth: 10 }}>
              <MapView
                style={{ flex: 1 }}
                // initialRegion={}
                />
            </View>
          </Modal>

        </View>
      </View>
    );
  }

  toggleDatePicker() {
    let datePickerHeight = this.state.datePickerHeight > 0 ? 0 : 200;
    LayoutAnimation.easeInEaseOut();
    this.setState({ datePickerHeight });
  }

  toggleMap() {
    this.props.setState({ generalLocationMapModalVisible: !this.props.form.generalLocationMapModalVisible });
  }

  submit() {

  }
}

const styles = StyleSheet.create({
  containerOuter:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 0
  },
  containerHeader:{
    backgroundColor: '#eb9c22',
    shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 2,
      shadowOpacity: 0.3,
      width,
      alignItems: 'center'
  },
  textHeader:{
    color: '#eee',
    fontSize: 36,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width
  },
  image:{
    width: 170,
    height: 100
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 2,
      shadowOpacity: 0.2,
      backgroundColor: '#fadcae'
  },
  button: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 10,
    borderColor: '#fff',
    alignItems: 'flex-start'
  },
  multilineInput: {
    height: 100,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: '#fff'
  },
  text: {
    fontSize: 14,
    color: '#b37414'
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  datePicker: {
    borderTopWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center'
  },
  submitButton: {
    borderWidth: 0,
    backgroundColor: '#eb9c22',
    width,
    position: 'absolute',
    bottom: 0,
    height: 50
  },
  logo:{
    height: 30,
    width: 40,
    marginRight: 10
  },
  icon: {
    height: 12,
    width: 16,
    marginRight: 5
  }
});

function mapStateToProps({ form }) {
  return {
    form
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setState: setFormState
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
