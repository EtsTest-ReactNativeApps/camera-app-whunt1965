
import 'react-native-gesture-handler';
import React from 'react';
import Providers from './src/nav';

//Main App entry point -- uses Providers for context (need to log in or logged in and can view main app)
export default function App() {
  return <Providers />;
}