import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Image} from 'react-native';

const myImage = ({navigation, route}) =>{
    return (
        <View style = {{flex: 2}}>
            <Image source={{uri: route.params.image}} style={{flex: 1}} />
        </View>
    )
}

export default myImage;