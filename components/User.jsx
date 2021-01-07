import React, { useContext } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-elements';
import firebase from '../firebase-config';
import { UserContext } from './context/user';

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
      <Text>{user.displayName}</Text>
      <Button title="Sign Out" onPress={() => signOutUser()} />
    </View>
  );
}

const styles = StyleSheet.create({
  User: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserScreen;
