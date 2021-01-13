import React, { useState, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Text } from 'react-native-elements';
import firebase from '../firebase-config';
import { Dimensions } from 'react-native';
import UserItemList from './UserItemList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IndividualItem from './IndividualItem';
import OtherUserScreen from './OtherUser';
// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Item" component={IndividualItem} />
      <HomeStack.Screen name="OtherUser" component={OtherUserScreen} />
    </HomeStack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [imageUrls, setImageUrls] = useState([]);

  const getImage = async () => {
    const db = firebase.firestore();
    db.collection('items')
      .get()
      .then((images) => {
        const imageArray = [];
        images.forEach((doc) => {
          const { owner, url } = doc.data();
          const user = firebase.auth().currentUser;
          if (owner != user.displayName) {
            imageArray.push(url);
          }
        });
        setImageUrls(imageArray);
        // console.log("--->", imageArray);
      });
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.Home}>
      <View style={styles.header}>
        <Image source={require('../images/logo.png')} />
      </View>
      <View style={styles.images}>
        <UserItemList imageUrls={imageUrls} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  header: {
    flex: 0.2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  images: {
    flex: 0.8,
  },
});

export default HomeStackScreen;
