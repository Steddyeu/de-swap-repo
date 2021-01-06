import React, { Component } from "react";
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
import LandingStackScreen from "./components/LandingPage";
import { auth } from "firebase";
import { render } from "react-dom";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      {/* <Tab.Screen name="Landing" component={LandingStackScreen} /> */}
    </Tab.Navigator>
  );
}



class App extends Component {
  state = {
    isLoggedIn: false,
  }
  componentDidMount() {

    const user = firebase
      .auth()
      .currentUser;

    if (user) {
      this.setState({ isLoggedIn: true })
    } else {
      this.setState({ isLoggedIn: false })
    }
  }

  logInUser() {

  }

  render() {


    const { isLoggedIn } = this.state

    return (
      (isLoggedIn ?
        (<NavigationContainer>

          <MyTabs />

        </NavigationContainer>
        ) : (
          <NavigationContainer>

            <LandingStackScreen />
          </NavigationContainer>

        )
      )


      // <NavigationContainer>

      //   <MyTabs />

      // </NavigationContainer>

    )

  }

}
export default App