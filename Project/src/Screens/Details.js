import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Unorderedlist from 'react-native-unordered-list';

export default function DetailsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Instructions for Usage</Text>
        <Unorderedlist bulletUnicode={0x2022}><Text style={styles.text2}>Use the Camera feature to scan a barcode and save it to Firebase!</Text></Unorderedlist>
        <Unorderedlist bulletUnicode={0x2022}><Text style={styles.text2}>Your saved photos will appear on the map!</Text></Unorderedlist>
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
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333'
    },
    text2: {
      fontSize: 16,
      color: '#333333'
    }
  });