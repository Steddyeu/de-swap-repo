import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";

function HomeScreen() {
  return (
    <View style={styles.Home}>
      <Text>HOMEPAGE!</Text>
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
