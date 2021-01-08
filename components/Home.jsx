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
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


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
<FlatList data={imageUrls} renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={{ uri: item }} style={{ width: windowWidth / 3, height: windowWidth / 3 }} />
                    </TouchableOpacity>


                )} numColumns={3} >

                </FlatList>
     
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
