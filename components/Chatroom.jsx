import React, { useEffect, useReducer, useContext, useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import { Text } from 'react-native-elements';
import { firebaseService } from '../services';
import Input from './Input';
import Message from './Message';
import { messagesReducer } from './reducer';
import firebase from '../firebase-config';

function MessageScreen({ route, navigation }) {
  const user = firebase.auth().currentUser;
  const userName = user.displayName;
  const userName2 = route.params.secondUser;

  const [messages, dispatchMessages] = useReducer(messagesReducer, []);
  const [items, setItems] = useState({});
  const [loadingImages, setLoadingImages] = useState(true);

  // useEffect(
  //   function () {
  //     return firebaseService.messageRef
  //       .orderBy("created_at", "desc")
  //       .onSnapshot(function (snapshot) {
  //         dispatchMessages({ type: "add", payload: snapshot.docs });
  //       });
  //   },
  //   [false]
  // );

  const db = firebase.firestore();

  // useEffect(
  //   function () {
  //     return firebaseService.messageRef
  //       .doc(firebaseService.chatID(userName2))
  //       .collection("chats")
  //       .orderBy("created_at", "desc")
  //       .onSnapshot(function (snapshot) {
  //         dispatchMessages({ type: "add", payload: snapshot.docs });
  //       });
  //   },
  //   [false]
  // );

  useEffect(
    function () {
      const messagesPromise = firebaseService.messageRef
        .doc(firebaseService.chatID(userName2))
        .collection('chats')
        .orderBy('created_at', 'desc')
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: 'add', payload: snapshot.docs });
        });

      const itemsPromise = firebaseService.messageRef
        .doc(firebaseService.chatID(userName2))
        .collection('images')
        .get()
        .then((data) => {
          const items = {};
          data.forEach((doc) => {
            const { imageURL } = doc.data();

            items[doc.id] = imageURL;
          });
          setItems(items);
          setLoadingImages(false);
        });
      Promise.all([messagesPromise, itemsPromise]);
    },
    [false]
  );

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        {!loadingImages && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: items[userName] }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginRight: 'auto',
                marginLeft: 10,
                marginTop: 10,
              }}
            />
            <Image
              source={{ uri: items[userName2] }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginRight: 10,
                marginTop: 10,
              }}
            />
          </View>
        )}

        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            //console.log(item, 'item')
            return item.id;
          }}
          renderItem={function ({ item }) {
            const data = item.data();
            const side = data.user_id === userName ? 'right' : 'left';

            // const time = formatAMPM(new Date());

            return (
              <Message
                side={side}
                message={data.message}
                user={data.user_id}
                // timeSent={time}
              />
            );
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input userName2={userName2} />
        <View></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OtherUser', {
              screen: 'OtherUser',
              params: { user: userName2 },
            });
          }}
        >
          <Text>View {userName2}'items</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    height: '100%',
    paddingBottom: 100,
  },

  imageContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
});

export default MessageScreen;
