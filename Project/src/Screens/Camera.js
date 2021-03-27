// Source Referenced - https://www.fullstacklabs.co/blog/react-native-camera
import 'react-native-gesture-handler';
import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {View, AppRegistry,Alert, StyleSheet, Dimensions,} from 'react-native';
import FormButton from '../style/FormButton';

export default class Camera extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
      this.state = {
      takingPic: false,
      img: null
    };
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  onPicture({uri}) {
    this.setImg(uri);
    this.props.navigation.navigate('Image', {image : uri})
    // this.setImg(uri);
  }
  onBackToCamera() {
    this.setImg(null);
  }

  setImg(uri){
    this.img = uri;
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {

      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({takingPic: true});

      try {
         const data = await this.camera.takePictureAsync(options);
         this.onPicture(data);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        this.setState({takingPic: false});
      }
    }
  };
  render(){
    return(
      <View style = {{flex: 2}}>
      <RNCamera
        ref = {ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={styles.btnAlignment}>
          <FormButton
            buttonTitle="Snap!" 
            onPress={this.takePicture}
            />
          </View>
      </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

AppRegistry.registerComponent('App', () => Camera)
 