//Simple map that displays user location and pins of locations where stored photos were taken
//source https://medium.com/@arvind.chak128/how-to-auto-zoom-into-your-current-location-using-react-native-maps-88f9b3063fe7

import React, {PureComponent, useContext} from 'react';
// import React, {useState, useRef, useEffect} from 'react';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import {StyleSheet, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AuthContext } from '../nav/AuthProvider';
import Loading from '../style/Loading';


export default class Map extends PureComponent {
  static contextType = AuthContext;//context to get uid for firebase
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
        loading: true,
    };
  }

  //handles mounting
  componentDidMount(){
    this.getCurrentLocation();
    const user = this.context.user;
    // this.getMarkers(user).then(()=>{
    //   this.setState({
    //     // markers: data,
    //     loading: false
    // });
    // });
    this.getMarkers(user);
    console.log(this.state.markers);
    this.forceUpdate();
   }
  //handle zoom to initial location
  goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  //retrieves curent location from Geolocation
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

  //retrieve image lat/long from firebase and display as markers on map (with image in callout)
  async getMarkers(user){
    const fs = firestore().collection(user.uid);
    let llist = [];
    const snapshot = await fs.get();
    for(const doc of snapshot.docs){
      const {Latitude, Longitude, Name} = doc.data();
      const imageRef = storage().ref('/'+ Name);
      const url = await imageRef.getDownloadURL();
      console.log(url);
      llist.push({
          id: doc.id,
          latitude : Latitude,
          longitude : Longitude,
          title: Name,
          uri: url,
        });
    }
    this.setState({
      markers: llist,
      loading: false
    });
  }

  //render map
  render(){
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    console.log(this.state.markers);
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
        return (<MapView.Marker
          key={index}
          coordinate={{
          latitude: val.latitude,
          longitude: val.longitude
          }}
          title = {val.title}
         >
        <MapView.Callout>
          <Image source = {{uri: val.uri}} style={{width: 200, height: 200}}/>
        </MapView.Callout>  
        </MapView.Marker>); 
      })}
    </MapView>
    )
  }
}


const styles = StyleSheet.create ({
    map: {
      ...StyleSheet.absoluteFillObject,
    }
 })
