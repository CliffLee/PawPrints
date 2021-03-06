import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated
} from 'react-native';

import TouchableElastic from 'touchable-elastic';
import Camera from 'react-native-camera';

import { height, width } from '../globalStyles';
import { setCaptureState } from '../actions';

class Capture extends React.Component {
  componentWillMount() {
    this.confirmButtonOpacity = new Animated.Value(0);
  }

  render() {
    let { imagePath } = this.props.capture;
    let Background = imagePath ? (
      <Image
        style={styles.image}
        source={{ uri: imagePath }}
      />
    ) : (
      <Camera
        style={styles.camera}
        ref={ref => this.camera = ref}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {Background}
        </View>
        <View style={styles.controlPanel}>
          <View style={styles.f1}>
            <TouchableElastic
              onPress={() => this.cancel()}
              >
              <Text style={styles.sideButton}>Cancel</Text>
            </TouchableElastic>
          </View>
          <View style={styles.f1}>
            <TouchableElastic
              style={styles.button}
              onPress={() => this.takePicture()}
              >
              <View style={styles.innerButtonCircle} />
            </TouchableElastic>
          </View>
          <View style={styles.f1}>
            <TouchableElastic
              onPress={() => this.confirm()}
              >
              <Animated.Text style={[styles.sideButton, { opacity: this.confirmButtonOpacity }]}>
                Confirm
              </Animated.Text>
            </TouchableElastic>
          </View>
        </View>
      </View>
    );
  }

  takePicture() {
    let { imagePath } = this.props.capture;
    if (imagePath) {
      return null
    }
    this.camera.capture()
      .then(data => {
        this.props.setState({ imagePath: data.path })
        this.toggleConfirmButton(1);
      })
      .catch(err => console.error(err));
  }

  cancel() {
    if (this.props.capture.imagePath) {
      this.toggleConfirmButton(0);
      this.props.setState({ imagePath: '' });
    } else {
      this.props.navigator.pop();
    }
  }

  toggleConfirmButton(toValue) {
    Animated.timing(this.confirmButtonOpacity, {
      toValue
    }).start();
  }

  confirm() {
    if (this.props.capture.imagePath) {
      this.props.navigator.push({ title: 'PetMatcher' });
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height,
    width
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  controlPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginTop: -70
  },
  button: {
    backgroundColor: '#fff',
    height: 60,
    width: 60,
    borderRadius: 60
  },
  innerButtonCircle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 3
  },
  f1: {
    flex: 1,
    alignItems: 'center'
  },
  sideButton: {
    fontSize: 20,
    color: '#fff'
  }
});

function mapStateToProps({ capture }) {
  return {
    capture
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setState: setCaptureState
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Capture);
