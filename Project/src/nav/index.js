//Allows us to use the user (from AuthContext) in all screen components
//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
export default function Providers() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}