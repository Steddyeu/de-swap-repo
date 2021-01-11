import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text } from "react-native-elements";
import firebase from "../firebase-config";
import { Dimensions } from "react-native";
import UserItemList from "./UserItemList";
// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

function HomeScreen() {
  const [imageUrls, setImageUrls] = useState([]);

  // const getImage = async (uri, imageName) => {
  //   const ref = firebase.storage().ref().child("homepage-test");
  //   const res = await ref.listAll();
  //   Promise.all(
  //     res.items.map((itemRef) => {
  //       return itemRef.getDownloadURL().then((url) => {
  //         return url;
  //       });
  //     })
  //   ).then((imageUrls) => {
  //     setImageUrls(imageUrls);
  //   });
  // };
  const getImage = async () => {
    const db = firebase.firestore();
    db.collection("items")
      .get()
      .then((images) => {
        const imageArray = [];
        images.forEach((doc) => {
          const { owner, url } = doc.data();
          const user = firebase.auth().currentUser;
          if(owner != user.displayName) {
            imageArray.push(url)
          }
        });
        setImageUrls(imageArray);
       // console.log("--->", imageArray);
      });
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.Home}>
      <View style={styles.header}>
        <Text>homepage!</Text>
      </View>

      <View style={styles.images}>
        <UserItemList imageUrls={imageUrls} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "stretch",
  },

  header: {
    flex: 0.2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  images: {
    flex: 0.8,
  },
});

export default HomeScreen;
