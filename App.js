import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "./firebase-config";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import UserScreen from "./components/User";
import CameraScreen from "./components/Camera";
import MessagesScreen from "./components/Message";
import HomeScreen from "./components/Home";
import LandingPage from "./components/LandingPage";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="LandingPage" component={LandingPage} />
    </Tab.Navigator>
  );
}

import { auth } from "firebase";

export default function App() {
  const dbh = firebase.firestore();
  dbh.collection("characters").doc("mario").set({
    employment: "robber-queen!",
    outfitColor: "red",
    specialAttack: "fireball",
  });

  const email = "Don@gmail.com";
  const password = "12345password";

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("hello from createuser");
    });

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
