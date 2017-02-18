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
  Modal
} from 'react-native';

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
      <View style={styles.container}>
        <View style={[styles.container, { padding: 30 }]}>
          <TouchableElastic
            style={styles.button}
            onPress={() => this.toggleDatePicker()}
            >
            <Text style={styles.text}>{lastSeen ? moment(lastSeen).format('MMMM D YYYY, h:mm a') : 'Last Seen'}</Text>
          </TouchableElastic>
          <TouchableElastic
            style={styles.button}
            onPress={() => this.toggleMap()}
            >
            <Text style={styles.text}>{generalLocation || 'General Location'}</Text>
          </TouchableElastic>
          <TextInput
            style={[styles.multilineInput, styles.text]}
            placeholder="Pet Description"
            multiline={true}
            value={petDescription}
            onChangeText={petDescription => setState({ petDescription })}
          />
          <TouchableElastic
            onPress={() => this.submit()}
            style={styles.submitButton}
            >
            <Text>Submit</Text>
          </TouchableElastic>
        </View>
        <View style={[styles.datePicker, { height: this.state.datePickerHeight }]}>
          <DatePickerIOS
            mode="datetime"
            maximumDate={new Date()}
            date={lastSeen || new Date()}
            onDateChange={lastSeen => setState({ lastSeen })}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={generalLocationMapModalVisible}
          >
          <View style={{ flex: 1, borderWidth: 10 }}>

          </View>
        </Modal>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
},
  button: {
    borderWidth: 1, marginBottom: 10
  },
  multilineInput: {
    height: 100,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5
  },
  text: {
    fontSize: 20
  },
  datePicker: {
    borderTopWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center'
  },
  submitButton: {
    borderWidth: 1,
    padding: 10
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
