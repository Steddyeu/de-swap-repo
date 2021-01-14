import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View, Image, Text } from 'react-native';
import firebase from '../firebase-config';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SwappedItems() {
  const [swaps, setSwaps] = useState([]);
  const user = firebase.auth().currentUser;

  const getSwappedItems = async () => {
    const db = firebase.firestore();
    db.collection('swapped').onSnapshot((data) => {
      const swapsArray = [];
      data.forEach((doc) => {
        const { userA, userAItem, userB, userBItem } = doc.data();

        if (userA === user.displayName || userB === user.displayName) {
          const swapInfo = { userA, userAItem, userB, userBItem };
          swapsArray.push(swapInfo);
        }
        console.log(swapsArray, 'here');
      });
      setSwaps(swapsArray);
    });
    //   .get()
    //   .then((data) => {
    //     const swapsArray = [];

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  useEffect(() => {
    getSwappedItems();
  }, []);

  return (
    <View style={styles.swappedContainer}>
      <Text style={styles.header}>Your Swaps</Text>
      {swaps.map((swap) => {
        return (
          <View style={styles.swapListContainer}>
            <Image
              source={{ uri: swap.userAItem }}
              style={{ width: 100, height: 100 }}
              key={swap.url}
            ></Image>
            <MaterialCommunityIcons
              name="twitter-retweet"
              color={'darkblue'}
              size={100}
            />
            <Image
              source={{ uri: swap.userBItem }}
              style={{ width: 100, height: 100 }}
              key={swap.url}
            ></Image>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  swappedContainer: {
    justifyContent: 'flex-start',
    marginTop: 40,
  },

  header: {
    textAlign: 'center',
    fontSize: 30,
  },

  swapListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
