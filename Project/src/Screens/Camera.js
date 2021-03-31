// Source Referenced - https://www.fullstacklabs.co/blog/react-native-camera
import 'react-native-gesture-handler';
import React, {PureComponent} from 'react';
import {RNCamera,  FaceDetector } from 'react-native-camera';
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
      takingPic: false,
      readytoUpload: false,
      box: null,
      img: null,
      loading:false,
      latitude: 0,
      longitude: 0,
      googleResponse: null
    };
  }

  componentDidMount(){
    this._isMounted = true;
    this.getLocation();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

onPicture = async() =>{

 const uri = await captureScreen({
    format: "jpg",
    quality: 0.8
    });
    uri=>(console.log(uri));

    // captureScreen({
    //   format: "jpg",
    //   quality: 0.8
    // }).then(
    //   uri=>(console.log(uri)
    //   // uri=>(this.props.navigation.navigate('Image', {image : uri, latitude: this.latitude, longitude: this.longitude})
    // ));
    this.props.navigation.navigate('Image', {image : uri, latitude: this.latitude, longitude: this.longitude})
    // this.setImg(uri);
  }
  
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

  onBackToCamera() {
    this.setImg(null);
  }

  setImg({uri}){
    this.img = uri;
  }

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
    } else {
      this.setState({
        box: null,
      });
    }
  };

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
        //  console.log(data);
        //  this.setImg(data);
        //  this.setState({readytoUpload: true});
        // console.log(this.state.readytoUpload);

        // const data = await captureScreen({
        //   format: "jpg",
        //   quality: 0.8
        // });
        // const data = await this.refs.viewShot.capture();
        console.log(data);
        //  this.getLocation();
        // await this.submitToGoogle(data.base64);
        //  this.onPicture(data);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        // this.setImg(data);
        // this.setImg(data);
        this.setState({takingPic: false});
        this.setState({readytoUpload: true});
        console.log(this.state.readytoUpload);
      }
    }
  };

  // submitToGoogle = async (data) => {
	// 	try {
	// 		this.setState({ uploading: true });
  //     const imageURI = data;
  //     // console.log(imageURI);
	// 		let body = JSON.stringify({
	// 			requests: [
	// 				{
	// 					features: [
	// 						{ type: 'FACE_DETECTION', maxResults: 1 },
	// 					],
	// 					image: {
  //             content: imageURI,
	// 						// source: {
	// 						// 	imageUri: imageURI
	// 						// }
	// 					}
	// 				}
	// 			]
  //     });
  //     let response = await fetch(
	// 			'https://vision.googleapis.com/v1/images:annotate?key=' +
  //       'AIzaSyD8OSVEJbvN_kEtFCnd-9up5QiMSrwoLJI',
	// 			{
	// 				headers: {
	// 					Accept: 'application/json',
	// 					'Content-Type': 'application/json'
	// 				},
	// 				method: 'POST',
	// 				body: body
				// }
	// 		);
	// 		let responseJson = await response.json();
	// 		console.log(responseJson);
	// 		this.setState({
	// 			googleResponse: responseJson,
	// 			uploading: false
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
  // };
  




  render(){
    if(this.state.readytoUpload == true){
      return (
      <ViewShot ref="viewShot" style={{flex: 1}} options={{ format: "jpg", quality: 0.9}}>
        <Image source={{ uri: this.state.image }} style={{flex:10}}/>
        <>
            <RevBlurFilter {...this.state.box} />
          </>
          <View style={styles.btnAlignment}>
          <FormButton
            buttonTitle="Save!" 
            onPress={this.onPicture}
            />
            </View>
      </ViewShot>
      );
    }
    else{
    return(
      <View style={{flex:3}}>
      {/* // <ViewShot style = {{flex: 2}} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}> */}
      <RNCamera
        ref = {ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.front}
        onCameraReady={() => this.setState({canDetectFaces: true})}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={this.state.canDetectFaces ? this.onFaceDetected: null}
        // onFacesDetected={this.onFaceDetected}
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

        {/* {this.state.googleResponse && (
							<FlatList style = {{flex: 2}}
								data={this.state.googleResponse.responses[0].labelAnnotations}
								extraData={this.state}
								keyExtractor={this._keyExtractor}
								renderItem={({ item }) => <Text>Item: {item.description}</Text>}
							/>
            )} */}
        <View style={styles.btnAlignment}>
          <FormButton
            buttonTitle="Snap!" 
            onPress={this.takePicture}
            />
          </View>
      </RNCamera>
      {/* // </ViewShot> */}
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
 