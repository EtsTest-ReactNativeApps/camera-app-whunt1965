/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React Native Counter Example using Hooks!

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions, SafeAreaView, TouchableHighlight, Image } from 'react-native';
import MapView from 'react-native-maps';
import Camera from './components/Camera';


const App = () => {
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [img, setImg] = useState(null);

  function onPicture({uri}) {
    setImg(uri);
  }

  function onBackToCamera() {
    setImg(null);
  }
  
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.text}>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
      </View>
      <View style = {{flex: 2}}>
      {img ? (
          <TouchableHighlight
            style={{flex: 1}}
            onPress={() => {
              onBackToCamera();
            }}>
            <Image source={{uri: img}} style={{flex: 1}} />
          </TouchableHighlight>
        ) : (
          <Camera onPicture={onPicture} />
        )}
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
        showsUserLocation={true} 
      />
    </SafeAreaView>

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
