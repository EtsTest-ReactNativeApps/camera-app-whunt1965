//Simple Home screen -- contains navigation links (buttons) to navigate to app components
//Logout invokes Auth context to deauthorize user (they will need to log back in to return to Home)
import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../nav/AuthProvider';
import FormButton from '../style/FormButton';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Welcome to the EC500 Camera App!</Text>
      <FormButton
        buttonTitle="Instructions"
        onPress={() => navigation.navigate('Instructions')}
      />
      <FormButton
        buttonTitle="My Photos"
        onPress={() => navigation.navigate('MyPhotos')}
      />
      <FormButton
        buttonTitle="Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <FormButton
        buttonTitle="Map"
        onPress={() => navigation.navigate('Map')}
      />
      <FormButton 
        buttonTitle='Logout' 
        onPress={() => logout()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1'
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});