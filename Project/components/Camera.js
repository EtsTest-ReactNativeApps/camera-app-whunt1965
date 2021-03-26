// Source Referenced - https://www.fullstacklabs.co/blog/react-native-camera
import 'react-native-gesture-handler';
import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {View, AppRegistry, TouchableOpacity, Alert, StyleSheet, Button, Text, Dimensions, TouchableHighlight, Image} from 'react-native';

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
        <TouchableOpacity
          activeOpacity={.5}
          style={styles.btnAlignment}
          onPress={this.takePicture}>
          <Button title="camera" flex={2} color="red" />
        </TouchableOpacity>
      </RNCamera>
      </View>
    );
  }
}

//   render(){
//     return(
//       <View style = {{flex: 2}}>
//       {this.img ? (
//         <TouchableHighlight
//           style={{flex: 1}}>
//           <Image source={{uri: this.img}} style={{flex: 2}} />
//         </TouchableHighlight>
//       ) : (
//       <RNCamera
//         ref = {ref => {
//           this.camera = ref;
//         }}
//         captureAudio={false}
//         style={{flex: 1}}
//         type={RNCamera.Constants.Type.back}
//         androidCameraPermissionOptions={{
//           title: 'Permission to use camera',
//           message: 'We need your permission to use your camera',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}>
//         <TouchableOpacity
//           activeOpacity={.5}
//           style={styles.btnAlignment}
//           onPress={this.takePicture}>
//           {/* <Icon name="camera" size={50} color="#fff" /> */}
//           <Button title="camera" flex={2} color="red" />
//         </TouchableOpacity>
//       </RNCamera>
//       )}
//       </View>
//     );
//   }
// }

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
 