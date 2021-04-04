//Simple Input form used by login and signup screens
//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1
  }
});