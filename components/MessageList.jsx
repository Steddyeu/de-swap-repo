import firebase from "../firebase-config";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { firebaseService } from "../services";
import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  StyleSheet,
} from "react";
import { firestore } from "firebase";
import { List, Divider } from "react-native-paper";
import MessageScreen from "./Chatroom";
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
    // getMessage();
    const myMessages = firestore()
      .collection("messages")
      //.orderBy('chat_id')
      //.startAt('yu')
      //.endAt('yu\uf8ff')
      .where("users", "array-contains", userName)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            // _id: documentSnapshot.id,
            // // give defaults
            // name: "",
            // ...documentSnapshot.data(),

            _id: documentSnapshot.id,
            name: "User Chat",
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
    <View style={{ backgroundColor: "#ccdfff", flex: 1 }}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          //   console.log(item)
          <List.Item
            title={item._id}
            description={item.id}
            titleNumberOfLines={1}
            descriptionNumberOfLines={1}
            onPress={() => handlePress(item)}
          />
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
    </MessageStack.Navigator>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#ccdfff",
//   },
// });

// export default MessageList;
