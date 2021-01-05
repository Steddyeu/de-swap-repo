import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "./firebase-config";

export default function App() {
  const dbh = firebase.firestore();

  dbh.collection("characters").doc("mario")({
    employment: "robber-king",
    outfitColor: "red",
    specialAttack: "fireball",
  });
  console.log("test-test");

  return (
    <View style={styles.container}>
      <Text>Hiyah!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
