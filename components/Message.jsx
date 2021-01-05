import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";

function MessageScreen() {
  return (
    <View style={styles.Message}>
      <Text>MESSAGE!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Message: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessageScreen;
