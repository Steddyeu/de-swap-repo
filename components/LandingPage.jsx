import { StatusBar } from "expo-status-bar";
import { Link } from "@reach/router";
import { StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class LandingPage extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text h1>De-Swap</Text>
        <StatusBar style="auto" />
        <Link to={"/home"}>
          <Button
            icon={<Icon name="user" size={15} color="white" />}
            raised
            title="Log in"
          />
        </Link>
        <Link to={"/signup"}>
          <Button
            icon={<Icon name="user-plus" size={15} color="white" />}
            raised
            title="Sign up"
          />
        </Link>
      </View>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
export default LandingPage;
