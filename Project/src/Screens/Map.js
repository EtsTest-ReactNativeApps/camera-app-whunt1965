//source https://medium.com/@arvind.chak128/how-to-auto-zoom-into-your-current-location-using-react-native-maps-88f9b3063fe7

import React, {PureComponent, useContext} from 'react';
// import React, {useState, useRef, useEffect} from 'react';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import FormButton from '../style/FormButton';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../nav/AuthProvider';
import { LOADIPHLPAPI } from 'dns';


export default class Map extends PureComponent {
  static contextType = AuthContext;
  // _isMounted = false;
  constructor(props) {
    super(props);
      this.state = {
        initialRegion: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }, 
        markers: [],
    };
  }
  

  componentDidMount(){
    const user = this.context.user;
    this.getCurrentLocation();
    this.getMarkers(user);
   }

   goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  async getCurrentLocation() {
    Geolocation.getCurrentPosition(
        position => {
        let region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: 5,
                longitudeDelta: 5
            };
            this.setState({
                initialRegion: region
            });
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        }
    );
  }

  async getMarkers(user){
    const fs = firestore().collection(user.uid);
    // let llist = [];
    fs.get().then(snapshot =>{
      snapshot.docs.forEach(doc=>{
     const {Latitude, Longitude} = doc.data();
      this.state.markers.push({
          id: doc.id,
          latitude : Latitude,
          longitude : Longitude
        });
        console.log(this.state.markers);
      })
    })
  }


  render(){
    return(
      <MapView
            style={styles.map}
            region={this.state.mapRegion}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
            onMapReady={this.goToInitialLocation.bind(this)}
            initialRegion={this.state.initialRegion}>

      {this.state.markers.map((val, index) => {
        console.log(val.latitude);
        console.log("HIIIII");
        return (<MapView.Marker
          key={index}
          coordinate={{
          latitude: val.latitude,
          longitude: val.longitude
          }}
          title = {"parking markers"}
         />); 
 })}
    </MapView>
    )
  }
}


// export default function Map(){
//    const _map = useRef(null);

//    const [region, setregion] = useState({
//       latitude: 37.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//    });

//    function getLocation(){
//     Geolocation.getCurrentPosition(
// 			position => {
//         setregion({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//         _map.animateToRegion(region)
//         console.log(latitude);
//         console.log(longitude);
//       },
// 			error => Alert.alert(error.message),
// 			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//     _map.animateToRegion(region)
//   }

//    useEffect(() => {
//       if(_map.current) {
//         _map.current.animateCamera(
//           {
//             center: {
//               latitude: region.latitude,
//               longitude: region.longitude
//             },
//             zoom: 15,
//           },
//         );
//       }
//     }, [region]);

//    return (
//       <MapView
//          style = {styles.map}
//          ref={_map}
//          showsUserLocation
//          followUserLocation
//          zoomEnabled 
//          region={region}
//          onRegionChangeComplete={region => setregion(region)}
//       >
//       <FormButton 
//       buttonTitle="Show Me Where I am!"
//       onpress={() => getLocation()}/>
//       </MapView>
//    )
// }

const styles = StyleSheet.create ({
    map: {
      ...StyleSheet.absoluteFillObject,
    }
 })
