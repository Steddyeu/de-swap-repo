import { StatusBar } from "expo-status-bar";
import { Router } from '@reach/router';
import { Button, StyleSheet, Text, View } from "react-native";
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import React, { Component } from 'react';
import SignUpPage from "./components/SignUpPage";

class App extends Component {
  render() {
    return (
      <div>

        <Router>
          <LandingPage path='/' />
          <HomePage path='/home' />
          <SignUpPage path='/signup' />
        </Router>
      </div>
    );
  }
}

export default App;
