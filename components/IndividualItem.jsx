import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import firebase from "../firebase-config";

export default function IndividualItem({ route, navigation }) {
  const [itemInfo, setItemInfo] = useState({});

  const getItem = async () => {
    const db = firebase.firestore();
    const url = route.params.itemUrl;

    db.collection("items")
      .where("url", "==", url)
      .get()
      .then((item) => {
        item.forEach((doc) => {
          const { owner, url, size, condition, name, type } = doc.data();
          const itemData = { owner, url, size, condition, name, type };
          setItemInfo(itemData);
          console.log(itemInfo);
        });
      });
  };
  useEffect(() => {
    getItem();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.owner}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("OtherUser", {
              screen: "OtherUser",
              params: { user: itemInfo.owner },
            });
          }}
        >
          <Image
            source={{
              uri:
                "data:image/png;base64,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",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        {itemInfo.owner}'s item
      </Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: itemInfo.url }} style={styles.image} />
      </View>
      <View style={styles.itemInfoContainer}>
        <View>
          <Text style={styles.textItem}>
            <Text style={styles.label}>Name: </Text> {itemInfo.name}
            <Text style={styles.label}> Size: </Text> {itemInfo.size}
          </Text>
        </View>

        <Text style={styles.textItem}>
          <Text style={styles.label}>Condition: </Text>
          {itemInfo.condition} <Text style={styles.label}> Type: </Text>
          {itemInfo.type}
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.button}>Request to Swap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#ccdfff",

    flex: 1,
  },

  itemInfoContainer: {
    fontSize: 30,
    marginTop: 10,
    marginLeft: 30,
  },

  image: {
    width: 400,
    height: 400,
  },
  textItem: {
    fontSize: 17,
  },
  label: {
    fontWeight: "bold",
  },
  owner: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 20,
    backgroundColor: "#ccdfff",
    color: "black",

    marginLeft: 10,
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "white",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1E90FF",
    marginTop: 15,
    padding: 10,
    fontSize: 20,
    borderRadius: 40,
    color: "white",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "red",
  },
});
