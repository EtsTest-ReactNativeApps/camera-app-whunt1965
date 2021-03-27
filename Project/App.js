import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Unorderedlist from 'react-native-unordered-list';
import Camera from './components/Camera'
import Map from './components/Map'
import myImage from './components/Image'


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.titleText}> Welcome to the EC500 Camera App!</Text>
      <Button
        title="Instructions"
        onPress={() => navigation.navigate('Instructions')}
      />
      <Button
        title="Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Map"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.titleText}>Instructions for Usage</Text>
      <Unorderedlist bulletUnicode={0x2022}><Text>Use the Camera feature to scan a barcode and save it to Firebase!</Text></Unorderedlist>
      <Unorderedlist bulletUnicode={0x2022}><Text>Your saved photos will appear on the map!</Text></Unorderedlist>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Instructions" component={DetailsScreen} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Image" component={myImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: 'center', 
    justifyContent: 'center'
  }
});
export default App;