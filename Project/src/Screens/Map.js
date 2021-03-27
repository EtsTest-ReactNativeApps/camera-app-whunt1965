
import React, {useState, useRef, useEffect} from 'react';
import MapView, {animateCamera} from 'react-native-maps';
import {StyleSheet } from 'react-native';

export default function Map(){
   const _map = useRef(null);

   const [region, setregion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
   });

   useEffect(() => {
      if(_map.current) {
        _map.current.animateCamera(
          {
            center: {
              latitude: region.latitude,
              longitude: region.longitude
            },
            zoom: 15,
          },
        );
      }
    }, []);

   return (
      <MapView
         style = {styles.map}
         ref={_map}
         showsUserLocation
         followUserLocation
         zoomEnabled 
         region={region}
         onRegionChangeComplete={region => setregion(region)}
      />
   )
}

const styles = StyleSheet.create ({
    map: {
      ...StyleSheet.absoluteFillObject,
    }
 })
