//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from '../style/FormButton';
import FormInput from '../style/FormInput';
import { AuthContext } from '../nav/AuthProvider'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to EC500 Camera App</Text>
      <FormInput
        value={email}
        placeholderText='Email'
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText='Password'
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <FormButton buttonTitle='Login' onPress={() => login(email, password)} />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.navButtonText}>New user? Join here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 10
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee'
  }
});
