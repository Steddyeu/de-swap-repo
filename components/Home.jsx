import React, { useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, Image } from "react-native";
import { Text } from "react-native-elements";
import firebase from "../firebase-config";

function HomeScreen() {
  const [imageUrls, setImageUrls] = useState([]);

  const getImage = async (uri, imageName) => {
    const ref = firebase.storage().ref().child("homepage-test");
    const res = await ref.listAll();
    Promise.all(
      res.items.map((itemRef) => {
        return itemRef.getDownloadURL().then((url) => {
          return url;
        });
      })
    ).then((imageUrls) => {
      setImageUrls(imageUrls)
    });
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.Home}>
      <Text>homepage!</Text>
      {imageUrls.map((imageUrl) => {
        return (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 130, height: 130 }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
