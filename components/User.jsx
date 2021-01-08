import React, { useContext } from 'react';
import { Button, StyleSheet, TextInput, View, Image, TouchableOpacity, } from 'react-native';
import { Text } from 'react-native-elements';
import firebase from '../firebase-config';
import { UserContext } from './context/user';
import UserItemList from './UserItemList';

function UserScreen() {
  const { logInUser } = useContext(UserContext);
  const user = firebase.auth().currentUser;
  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logInUser();
      });
  };

  return (
    <View style={styles.User}>
      <View style={styles.userContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={() => signOutUser()} >
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={{ width: 150, height: 150, borderRadius: 150 }} />
        <Text style={styles.userName}>{user.displayName}</Text>

      </View>

      <UserItemList />
    </View>

  );
}

const styles = StyleSheet.create({
  User: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',

  },
  userContainer: {
    marginTop: 40,
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',

  },
  userName: {
    marginTop: 10,
    //fontFamily:
    textTransform: "capitalize"
  },
  signOutButton: {
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 300,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'lightblue'
  }
});

export default UserScreen;
