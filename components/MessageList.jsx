import firebase from "../firebase-config";
import { Text, View, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { firebaseService } from "../services";
import React, { useEffect, useReducer, useContext, useState } from "react";
import { firestore } from "firebase";
import { Avatar, List, Divider } from "react-native-paper";
import MessageScreen from "./Chatroom";
import OtherUserScreen from "./OtherUser";
import { createStackNavigator } from "@react-navigation/stack";

const MessageList = ({ navigation }) => {
  const [messageArray, setMessageArray] = useState([]);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = firebase.auth().currentUser;
  const userName = user.displayName;

  const getMessage = async () => {
    const db = firebase.firestore();
    db.collection("messages")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          console.log(doc.data());
        });
      });
  };

  useEffect(() => {
    const myMessages = firestore()
      .collection("messages")
      .where("users", "array-contains", userName)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.data().chat_id,
            name: documentSnapshot.data().users.filter((user) => {
              return user !== userName;
            }),
            avatar:
              "https://freeiconshop.com/wp-content/uploads/edd/refresh-double-flat.png",
            ...documentSnapshot.data(),
          };
        });
        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    return () => myMessages();
  }, []);

  const handlePress = (item) => {
    const secondUser = item.users.filter((user) => {
      return user !== userName;
    });
    navigation.navigate("Chatroom", { secondUser: secondUser[0] });
  };

  return (
    <View
      style={{
        backgroundColor: "#ccdfff",
        flex: 1,
      }}
    >
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          //   console.log(item)

          <>
            <View style={styles.chatroomContainer}>
              <Avatar.Image
                source={{
                  uri: item.avatar,
                }}
                size={65}
              />
              <List.Item
                title={item.name}
                description={`You are currently swapping with ${item.name}!`}
                titleNumberOfLines={1}
                descriptionNumberOfLines={1}
                onPress={() => handlePress(item)}
                style={{
                  backgroundColor: "#ccdfff",
                  flex: 1,
                }}
              />
            </View>
          </>
        )}
      />
    </View>
  );
};

const MessageStack = createStackNavigator();

export default function MessageStackScreen() {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="My Messages" component={MessageList} />
      <MessageStack.Screen name="Chatroom" component={MessageScreen} />
      <MessageStack.Screen name="OtherUser" component={OtherUserScreen} />
    </MessageStack.Navigator>
  );
}

const styles = StyleSheet.create({
  chatroomContainer: {
    backgroundColor: "#ccdfff",
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
  },
});
