import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";

function CameraScreen() {
  return (
    <View style={styles.Camera}>
      <Text>CAMERA!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Camera: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CameraScreen;
