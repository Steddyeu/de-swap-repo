import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const App = () => {
  return (
    <View style={styles.landingPage}>
      <Text h1>De-Swap</Text>

      <Button
        style={styles.button}
        raised
        title="Sign Up"
        icon={<Icon name="user" size={25} color="white" />}
      />
      <Button
        raised
        title="Log In"
        icon={<Icon name="arrow-right" size={20} color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  landingPage: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#20232a",
  },
});

export default App;
