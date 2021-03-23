/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React Native Counter Example using Hooks!

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions } from 'react-native';
import MapView from 'react-native-maps';


const App = () => {
  const [count, setCount] = useState(0);

  function getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  
  function onRegionChange(region) {
    this.setState({ region });
  }

  return (
    <View style={styles.container}>
      <View style={styles.text}>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
