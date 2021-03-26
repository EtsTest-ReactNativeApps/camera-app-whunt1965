
import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet } from 'react-native';

const Map = () => {
   return (
      <MapView
         style = {styles.map}
         // showsUserLocation
         // followUserLocation
         // zoomEnabled 
         initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
      />
   )
}

// export default class Map extends React.Component {

//    // constructor(props) {
//    //    super(props);
//    //      this.state = {
//    //       region: {
//    //          latitude: 37.78825,
//    //          longitude: -122.4324,
//    //          latitudeDelta: 0.0922,
//    //          longitudeDelta: 0.0421,
//    //        },
//    //    };
//    //  }

//    //  getInitialState() {
//    //      return {
//    //        region: new AnimatedRegion({
//    //          latitude: LATITUDE,
//    //          longitude: LONGITUDE,
//    //          latitudeDelta: LATITUDE_DELTA,
//    //          longitudeDelta: LONGITUDE_DELTA,
//    //        }),
//    //      };
//    //    }
      
//    //    onRegionChange(region) {
//    //      this.state.region.setValue(region);
//    //    }
      
//    //    render() {
//    //      return (
//    //          <MapView
//    //          style = {styles.map}
//    //          showsUserLocation
//    //          followUserLocation
//    //          zoomEnabled
//    //       />
//    //      //   <Animated
//    //      //     region={this.state.region}
//    //      //     onRegionChange={this.onRegionChange}
//    //      //   />
//    //      );
//    //    }
//    render(){
//       return (
//          <MapView
//          style={{ flex: 1 }}
//          showsUserLocation
//          initialRegion={{
//              latitude: 37.78825,
//              longitude: -122.4324,
//              latitudeDelta: 0.0922,
//              longitudeDelta: 0.0421,
//          }}
//        />
//       )
//    }

// }

const styles = StyleSheet.create ({
    map: {
      ...StyleSheet.absoluteFillObject,
    }
 })

 export default Map;