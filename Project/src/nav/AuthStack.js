//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../Screens/SignUp';
import Login from '../Screens/Login';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ header: () => null }}
      />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}