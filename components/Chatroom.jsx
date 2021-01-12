import React, { useEffect, useReducer, useContext } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-elements";
import { firebaseService } from "../services";
import Input from "./Input";
import Message from "./Message";
import { messagesReducer } from "./reducer";
import firebase from "../firebase-config";

function MessageScreen() {
  const user = firebase.auth().currentUser;
  const userName = user.displayName;

  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(
    function () {
      return firebaseService.messageRef
        .orderBy("created_at", "desc")
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: "add", payload: snapshot.docs });
        });
    },
    [false]
  );

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            //console.log(item, 'item')
            return item.id;
          }}
          renderItem={function ({ item }) {
            const data = item.data();
            const side = data.user_id === userName ? "right" : "left";

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
        <Input />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    height: "100%",
    paddingBottom: 100,
  },
  inputContainer: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: "gray",
  },
});

export default MessageScreen;
