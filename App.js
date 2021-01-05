import { StatusBar } from "expo-status-bar";
import { Router } from '@reach/router';
import { Button, StyleSheet, Text, View } from "react-native";
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import React, { Component } from 'react';
import SignUp from "./components/SignUp";
import Search from "./components/Search";
import Camera from "./components/Camera";
import Message from "./components/Message";
import User from "./components/User";
import firebase from "./firebase-config";


export default function App(){
  const dbh = firebase.firestore();

  dbh.collection("characters").doc("mario")({
    employment: "robber-king",
    outfitColor: "red",
    specialAttack: "fireball",
  });

 
    return (
      <div>

        <Router>
          <LandingPage path='/' />
          <Home path='/home' />
          <SignUp path='/signup' />
          <Search path='/search' />
          <Camera path='/camera' />
          <Message path='/message' />
          <User path='/user' />
        </Router>
      </div>
    );
}




