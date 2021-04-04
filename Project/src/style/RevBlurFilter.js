//'Reverse" blur filter used to transpose blur filter on a screenshot (where right and left are flipped)

import React, {useState, useEffect, useRef} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import { BlurView } from "@react-native-community/blur";

const RevBlurFilter = props =>{

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
        // left: x,
        left: rightEyePosition.x - 100,
        right: leftEyePosition.x -100,
        width,
        height,
        // transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
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

  export default RevBlurFilter;
