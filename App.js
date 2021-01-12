import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './firebase-config';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import UserScreen from './components/User';
import CameraScreen from './components/Camera';
import MessagesScreen from './components/Message';
import HomeScreen from './components/Home';
import LandingStackScreen from './components/LandingPage';
import { auth } from 'firebase';
import { render } from 'react-dom';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from './components/context/user';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'darkblue',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
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
