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

export default function IndividualItem({ route }) {
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
    <View itemInfo={itemInfo} styles={styles.mainContainer}>
      <Image
        source={{ uri: itemInfo.url }}
        style={styles.image}
      />
      <View styles={styles.itemInfoContainer}>
        <Text>Owner: {itemInfo.owner}</Text>
        <Text>Size: {itemInfo.size}</Text>
        <Text>Condition: {itemInfo.condition}</Text>
        <Text>Name: {itemInfo.name}</Text>
        <Text>Item Type: {itemInfo.type}</Text>
        <Text>Description: ?!Add Descriptions!?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'green',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  itemInfoContainer: {
    marginTop: 40,
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 150,
  }
});