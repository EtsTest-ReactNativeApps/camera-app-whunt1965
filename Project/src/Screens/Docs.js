//Page to display images stored in firebase
//Sources:
//https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
//https://rnfirebase.io/firestore/usage

import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { StyleSheet, FlatList, SafeAreaView, Button, View, Text, TextInput, Image, TouchableHighlight } from 'react-native';
import { AuthContext } from '../nav/AuthProvider';
import Loading from '../style/Loading';
import { set } from 'react-native-reanimated';
import FormButton from '../style/FormButton';

//Force auto refresh -- since images take a while to download (asynchronously) from firebase, used to force app to 
//refresh and display images
//source: https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function Docs(navigation){
    const [docs, setdocs] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { user } = useContext(AuthContext);
    list = [];
    const forceUpdate = useForceUpdate();

    //download from images from firebase by:
    // 1) Retrieve Image URLS from Cloud Firestore
    // 2) Download images themselves from Firebase Cloud Storage
    function downloadImages(){
        llist = [];
        const ref = firestore().collection(user.uid);
        ref.get().then(snapshot =>{
            snapshot.docs.forEach(doc=>{
                const {Name, URI} = doc.data();
                console.log(Name);
                let imageRef = storage().ref('/'+ Name);
                imageRef.getDownloadURL().then((url) => {
                    console.log(url);
                    llist.push({
                        id: doc.id,
                        uri: url,
                    });
                }).catch((e) => console.log('getting downloadURL of image error => ', e));
            })
            console.log(docs);
            setLoading(false);
        })
        return llist;
    }

    //Async function to initialize image download
    async function simulateStateChange(){
        const list = await downloadImages();
        setdocs(list);
    }

    //Initial screen to prompt user to downlaod images
    if (loading) {
        return <View style={styles.container}>
            <FormButton 
            buttonTitle="Download!" 
            onPress={() => simulateStateChange()}
            />
            </View>
    }

    // Screen to show all images in firebase for a user
    return(
        <SafeAreaView style={styles.container}>
            <FormButton 
                buttonTitle="Refresh to View" 
                onPress={() => forceUpdate()}/>
            {docs.map((item) =>(
                <TouchableHighlight key={item.id}>
                    <Image key={Date.now()} source = {{uri: item.uri}} style={{width: 200, height: 200}}/>
                </TouchableHighlight>))}
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f1'
    },
    text: {
      fontSize: 20,
      color: '#333333'
    }
  });