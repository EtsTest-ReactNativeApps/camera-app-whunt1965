// Simple form button used throughout the app (created here for consistent styling)
//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function FormButton({ buttonTitle, ...rest }) {
    return (
      <TouchableOpacity style={styles.buttonContainer} {...rest}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: windowWidth / 2,
      height: windowHeight / 15,
      backgroundColor: '#6646ee',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    },
    buttonText: {
      fontSize: 18,
      color: '#ffffff'
    }
  });

