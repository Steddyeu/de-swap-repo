import firebase from "../firebase-config";
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { firebaseService } from "../services";
import React, { useEffect, useReducer, useContext, useState } from "react";
import { firestore } from "firebase";
import { List, Divider } from 'react-native-paper';

const MessageList = () => {
    const [messageArray, setMessageArray] = useState([]);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMessage = async () => {
        const db = firebase.firestore()
        db.collection('messages').get().then(data => {
            data.forEach((doc) => { console.log(doc.data().message) })
        })
    }


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('messages')
            .doc('angela_angela')
            .onSnapshot((querySnapshot) => {
                const threads = querySnapshot.docs.map((documentSnapshot) => {
                    return {
                        _id: documentSnapshot.id,
                        // give defaults
                        name: '',
                        ...documentSnapshot.data(),
                    };
                });

                setThreads(threads);

                if (loading) {
                    setLoading(false);
                }
            });

        /**
         * unsubscribe listener
         */
        return () => unsubscribe();
    }, []);

    return (

        < View >
            {}
            <FlatList
                data={threads}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                    console.log(item)
                    // < List.Item
                    //     title={item.name}
                    //     description={item.doc}
                    //     titleNumberOfLines={1}
                    //     descriptionNumberOfLines={1}
                    // />
                )}
            />
        </View >
    )
    
    // return (
    //         <View >
    //             <FlatList
    //                 data={threads}
    //                 keyExtractor={(item) => item._id}
    //                 ItemSeparatorComponent={() => <Divider />}
    //                 renderItem={({ item }) => (
    //                     <List.Item
    //                         title={item.name}
    //                         description='Item description'
    //                         titleNumberOfLines={1}
    //                         descriptionNumberOfLines={1}
    //                     />
    //                 )}
    //             />
    //         </View>

        //               );
        
    

                    }
export default MessageList;