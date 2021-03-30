//Source: https://www.instamobile.io/mobile-development/react-native-firebase-storage/

import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Platform,
    Alert,
    Image
  } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import FormButton from '../style/FormButton';
import { AuthContext } from '../nav/AuthProvider';

const myImage = ({navigation, route}) =>{
    const [image, setImage] = useState(route.params.image);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [latitude, setLatitude] = useState(route.params.latitude);
    const [longitude, setLongitude] = useState(route.params.longitude);
    const { user } = useContext(AuthContext);
    const ref = firestore().collection(user.uid);


    async function saveImage(uploadUri, filename){
      ref.add({
        Name: filename, 
        URI: uploadUri,
        Latitude: latitude,
        Longitude: longitude,

      })
    }
    const uploadImage = async () => {
      
        const uri = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task = storage()
          .ref(filename)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
        });
        try {
          await task;
          await saveImage(uploadUri, filename);
        } catch (e) {
          console.error(e);
        }
        setUploading(false);

        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!'
        );
      };


      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: route.params.image }} style={styles.imageBox} />
            {uploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : (
              <FormButton
                buttonTitle="Upload Image"
                onPress={() => uploadImage()}
              />
            )}
          </View>
        </SafeAreaView>
      );
    }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  });

export default myImage;