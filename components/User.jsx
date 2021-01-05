import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";

function UserScreen() {
  return (
    <View style={styles.User}>
      <Text>USER!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  User: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserScreen;
