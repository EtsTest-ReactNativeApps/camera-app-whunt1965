// Main navigation stack for a logged in user
//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home';
import Camera from '../Screens/Camera'
import DetailsScreen from '../Screens/Details'
import Map from '../Screens/Map'
import myImage from '../Screens/Image'
import MyPhotos from '../Screens/MyPhotos'

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name="Instructions" component={DetailsScreen} />
      <Stack.Screen name="MyPhotos" component={MyPhotos} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Image" component={myImage} />
    </Stack.Navigator>
  );
}