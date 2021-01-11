import React, { useEffect, useReducer, useContext } from "react";
import { Button, StyleSheet, TextInput, View, FlatList, SafeAreaView, } from "react-native";
import { Text } from "react-native-elements";
import { firebaseService } from '../services'
import Input from './Input';
import ChatTest from './ChatTest'
import { messagesReducer } from './reducer'
import firebase from "../firebase-config";

function MessageScreen() {
  const mock = [
    { id: 1, message: 'Hello', side: 'left' },
    { id: 2, message: 'Hi!', side: 'right' },

  ]

  const user = firebase.auth().currentUser;
  const userName = user.displayName

  const [messages, dispatchMessages] = useReducer(messagesReducer, [])

  useEffect(
    function () {
      return firebaseService.messageRef
        .orderBy('created_at', 'desc')
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: 'add', payload: snapshot.docs })
        })
    },
    [false]
  )

  return (

    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            //console.log(item, 'item')
            return item.id
          }}
          renderItem={function ({ item }) {
            const data = item.data()
            //console.log(item.data, 'item')
            const side = data.user_id === userName ? 'right' : 'left'
            // const data = item.message
            //const side = item.id === userName ? 'right' : 'left'
            return (
              <ChatTest side={side} message={data.message} />
            )
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  messagesContainer: {
    height: '100%',
    paddingBottom: 100
  },
  inputContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: 'gray'
  }
});

export default MessageScreen;
