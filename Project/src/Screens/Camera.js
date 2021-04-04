// Camera screen -- allows user to take pictures and scan barcodes
// Source Referenced - https://www.fullstacklabs.co/blog/react-native-camera
import 'react-native-gesture-handler';
import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {View, AppRegistry,Alert, StyleSheet, Dimensions,Text, FlatList, Image} from 'react-native';
import FormButton from '../style/FormButton';
import BlurFilter from '../style/BlurFilter';
import RevBlurFilter from '../style/RevBlurFilter';
import Geolocation from '@react-native-community/geolocation';
import ViewShot, { captureScreen } from "react-native-view-shot";


export default class Camera extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
      this.state = {
      front: false,
      takingPic: false,
      readytoUpload: false,
      box: null,
      img: null,
      loading:false,
      latitude: 0,
      longitude: 0,
      barcode: null,
    };
  }

  //Handle mounting
  componentDidMount(){
    this._isMounted = true;
    this.getLocation();
  }

  //Handle unmounting
  componentWillUnmount(){
    this._isMounted = false;
  }

//When a picture is takes and we choose to save it, does a screen capture (so we can get the blur filter
//over a face) and takes us to the image page
onPicture = async() =>{
  console.log(this.state.barcode);
    const uri = await captureScreen({
      format: "jpg",
      quality: 0.8
      });
    this.props.navigation.navigate('Image', {image : uri, bcode: this.state.barcode, latitude: this.latitude, longitude: this.longitude})
  }

  //Fetch location on component load so we can add lat/long to picture (for mapping)
  getLocation(){
    Geolocation.getCurrentPosition(
			position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);
      },
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
  }

  //Handles Barcode dection -- captures barcode data and stores in state variables
  //source: https://medium.com/@goodpic/rncamera-as-a-free-barcode-scanner-lib-for-react-native-110fa0c610af
  onBarCodeRead(scanResult) {
    console.log(scanResult.type);
    console.log(scanResult.data);
    if (scanResult.data != null) {
      this.setState({barcode: scanResult.data});
    }
  }
  
  //When a face is detected (by the RN camera), captures key coordinates so we can add our blur filter
  onFaceDetected = ({faces}) => {
    if (faces[0]) {
      this.setState({
        box: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
          rightEyePosition: faces[0].rightEyePosition,
          leftEyePosition: faces[0].leftEyePosition,
        },
      });
    }else {
      this.setState({
        box: null,
      });
    }
  };

  //Handles picture capture - once completed, sets us in a ready to upload state
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
         this.setState({image:data.uri});
         console.log(data);

      }catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      }finally {
          this.setState({takingPic: false});
          this.setState({readytoUpload: true});
      }
    }
  };

  //Render function
  render(){
    //If we are ready to upload, display the captured picture and allow user to save (screen shot)
    if(this.state.readytoUpload == true){
      return (
      <ViewShot ref="viewShot" style={{flex: 1}} options={{ format: "jpg", quality: 0.9}}>
        <Image source={{ uri: this.state.image }} style={{flex:10}}/>
        {this.state.box && (
          <>
            <BlurFilter {...this.state.box} />
          </>
        )}
          <View style={styles.btnAlignment}>
          <FormButton
            buttonTitle="Save!" 
            onPress={this.onPicture}
            />
            </View>
      </ViewShot>
      );
    }
    //Otherwise, display RNCamera view for taking a picture
    else{
      return(
        <View style={{flex:3}}>
        <RNCamera
          ref = {ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={{flex: 1}}
          type={this.state.front ? RNCamera.Constants.Type.front: RNCamera.Constants.Type.back}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onCameraReady={() => this.setState({canDetectFaces: true})}
          faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
          onFacesDetected={this.state.canDetectFaces ? this.onFaceDetected: null}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
            {this.state.box && (
            <>
              <BlurFilter {...this.state.box} />
            </>
          )}
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

  image:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

AppRegistry.registerComponent('App', () => Camera)
 