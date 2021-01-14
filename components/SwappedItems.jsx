import React, { useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, Image, Text } from "react-native";
import firebase from "../firebase-config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SwappedItems() {
  const [swaps, setSwaps] = useState([]);
  const user = firebase.auth().currentUser;

  const getSwappedItems = async () => {
    const db = firebase.firestore();
    db.collection("swapped")
      .where("owner", "==", user.displayName)
      .get()
      .then((data) => {
        const swapsArray = [];

        data.forEach((doc) => {
          const { owner, url, swappedWith, swappedForUrl } = doc.data();
          const swapInfo = { owner, url, swappedWith, swappedForUrl };
          swapsArray.push(swapInfo);
        });
        setSwaps(swapsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSwappedItems();
  }, []);
  return (
    <View style={styles.swappedContainer}>
      <Text style={styles.header}>Your Swaps</Text>
      {swaps.map((swap) => {
        console.log(swap)
        return (
          <View style={styles.swapListContainer}>
            <Image
              source={{ uri: swap.url }}
              style={{ width: 140, height: 140 }}
              key={swap.url}
            ></Image>
            <MaterialCommunityIcons
              name="twitter-retweet"
              color={"darkblue"}
              size={100}
            />
            <Image
              source={{ uri: swap.swappedForUrl }}
              style={{ width: 140, height: 140 }}
              key={swap.swappedForUrl}
            ></Image>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  swappedContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 40,
    backgroundColor: "#ccdfff",
  },

  header: {
    textAlign: "center",
    fontSize: 35,
    color: "#000080",
    fontWeight: 'bold',
  },

  swapListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
