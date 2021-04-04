//Simple blur filter to blur a person's face using data from the RN camera's face detector

import React, {useState, useEffect, useRef} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import { BlurView } from "@react-native-community/blur";

const BlurFilter = props =>{

    return (
        <View style={styles.filter(props)}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={100}
          reducedTransparencyFallbackColor="white"
        />

        </View>
    )

}

const styles = StyleSheet.create({
    filter: function({width, height, x, y, rightEyePosition, leftEyePosition, yawAngle, rollAngle}) {
      return {
        position: 'absolute',
        top: rightEyePosition.y - 100,
        right: rightEyePosition.x - 100,
        left: leftEyePosition.x -100,
        width,
        height,
      };
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
  });

  export default BlurFilter;
