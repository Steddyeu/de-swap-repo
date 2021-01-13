import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "./firebase-config";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import UserStackScreen from "./components/User";
import Example from "./components/TestChatSetup";
import CameraScreen from "./components/Camera";
import MessagesScreen from "./components/Message";
import HomeStackScreen from "./components/Home";
import LandingStackScreen from "./components/LandingPage";
import { auth } from "firebase";
import { render } from "react-dom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "./components/context/user";
import MessageList from "./components/MessageList";
import SwappedItems from "./components/SwappedItems";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "darkblue",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarLabel: "Add Item",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        //component={MessagesScreen}
        component={MessageList}
        // component={MessageStackScreen}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SwappedItems"
        component={SwappedItems}
        options={{
          tabBarLabel: "Swapped",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="twitter-retweet"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

class App extends Component {
  state = {
    isLoggedIn: false,
  };
  componentDidMount() {
    const user = firebase.auth().currentUser;

    if (user) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  logInUser = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <UserContext.Provider value={{ isLoggedIn, logInUser: this.logInUser }}>
        {isLoggedIn ? (
          <NavigationContainer>
            <MyTabs />
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <LandingStackScreen />
          </NavigationContainer>
        )}
      </UserContext.Provider>
    );
  }
}
export default App;
