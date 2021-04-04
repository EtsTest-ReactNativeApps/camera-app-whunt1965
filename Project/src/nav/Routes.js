//Checks for changes in authorization sttaus and provides the correct navigation based on 
//whether or not a user is logged in

//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/

import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './MainStack';
import { AuthContext } from './AuthProvider';
import Loading from '../style/Loading';

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
      setLoading(false);
    }
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
    if (loading) {
      return <Loading />;
    }
    return (
      <NavigationContainer>
        {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }