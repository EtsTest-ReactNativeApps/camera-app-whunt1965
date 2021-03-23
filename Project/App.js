/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React Native Counter Example using Hooks!

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import 'react-native-camera'


const App = () => {
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const onRegionChange = ({region}) => setRegion(region);

  useEffect(() => {
    const geo =navigator.geolocation;
    if(!geo){
      console.log("Couldn't get geolocation")
      return;
    }
    navigator.geolocation.watchPosition(
      (position) => {
          console.log("wokeeey");
          console.log(position);
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
      });
  }, [])

  takePicture = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn('takePictureResponse ', data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.text}>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
      </View>
      <View style={styles.cam}>
      <Text style={styles.text2}>Take a Picture</Text>
      <Button
        onPress={() => takePicture()}
        title="Snap!"
      />
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
        showsUserLocation={true} 
      />
    </View>

  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cam: {
    flex: 2,
    color: '#660066',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text2:{
    color: '#660066',
    fontWeight: 'bold',
  },
  map: {
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center'
    // position: relative,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default App;
