//Sources
//https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
//https://rnfirebase.io/firestore/usage

import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, FlatList, SafeAreaView, Button, View, Text, TextInput } from 'react-native';
import { AuthContext } from '../nav/AuthProvider';
import Loading from '../style/Loading';
import { set } from 'react-native-reanimated';

export default function Docs(navigation){
    const [docs, setdocs] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { user } = useContext(AuthContext);
    const ref = firestore().collection(user.uid);

    let list = [];

    useEffect(() => {
        ref.onSnapshot(querySnapshot =>{
            querySnapshot.forEach(doc => {
            const {Name, URI} = doc.data();
            list.push({
                id: doc.id,
                Name,
            });
        
        setdocs(list);
        if(loading){
            setLoading(false);
        }
        })});
    }, []);

    // const renderItemComponent = ({ item }) => (
    //     <Text style={styles.text}>{item.Name}</Text>
    //   );

    ListItem = (name)=>{
        <View style={{flexDirection: 'row'}}>
            <Text>{name}</Text>
        </View>
    }

    // console.log(docs)
    if (loading) {
        return <Loading />;
    }

    return(
        <View style={styles.container}>{docs.map((item) =>(<Text>{item.Name}</Text>))}</View>
    )

    // return(
    //     <SafeAreaView style={styles.container}>
    //     <Text>Docs</Text>
    //      <FlatList 
    //         style={{flex: 2}}
    //         data={docs}
    //         renderItem={({item}) => {console.log(item.Name);return <ListItem name={item.Name}></ListItem>}}
    //         keyExtractor={(item) => item.id}
    //     />
    //     </SafeAreaView>
    // )
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