//Page to display images stored in firebase
//Sources:
//https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
//https://rnfirebase.io/firestore/usage

import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { StyleSheet, ScrollView, SafeAreaView, Image, TouchableHighlight } from 'react-native';
import { AuthContext } from '../nav/AuthProvider';
import Loading from '../style/Loading';



export default function MyPhotos(navigation){
    const [docs, setdocs] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { user } = useContext(AuthContext);
    list = [];
    
    //Download all images on page load 
    useEffect( () => { 
        async function downloadImages(){
            try{
                llist = [];
                const ref = firestore().collection(user.uid);
                const snapshot = await ref.get();
                for(const doc of snapshot.docs){
                  const {Name} = doc.data();
                  const imageRef = storage().ref('/'+ Name);
                  const url = await imageRef.getDownloadURL();
                  console.log(url);
                  llist.push({
                    id: doc.id,
                    uri: url,
                    });
                }
                setdocs(llist);
                setLoading(false);
                console.log(docs);
            }
            catch(e){
                Alert.alert(
                    'Could Not Retrieve your images!'
                  );
            }
        };
        downloadImages();
    }, [] );


    //Initial screen to show loading
    if (loading) {
        return (<Loading/>)
    }

    // Screen to show all images in firebase for a user
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview}>
            {docs && docs.map((item) =>(
                <TouchableHighlight key={item.id}>
                    <Image key={Date.now()} source = {{uri: item.uri}} style={{width: 200, height: 200}}/>
                </TouchableHighlight>))}
            </ScrollView>
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
    scrollview:{
        marginHorizontal: 20,
    },
    text: {
      fontSize: 20,
      color: '#333333'
    }
  });