import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-elements';
import firebase from '../firebase-config';
import { UserContext } from './context/user';
import UserItemList from './UserItemList';

function UserScreen() {
  const { logInUser } = useContext(UserContext);
  const [imageUrls, setImageUrls] = useState([]);

  const user = firebase.auth().currentUser;
  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logInUser();
      });
  };

  const getImage = async () => {
    const db = firebase.firestore();
    db.collection('items')
      .get()
      .then((images) => {
        const imageArray = [];
        images.forEach((doc) => {
          const { owner, url } = doc.data();
          const user = firebase.auth().currentUser;
          if (owner == user.displayName) {
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
    <View style={styles.User}>
      <View style={styles.userContainer}>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => signOutUser()}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://reactjs.org/logo-og.png' }}
          style={{ width: 150, height: 150, borderRadius: 150 }}
        />
        <Text style={styles.userName}>{user.displayName}</Text>
      </View>
      <View style={styles.images}>
        <UserItemList imageUrls={imageUrls} />
      </View>
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
    textTransform: 'capitalize',
  },
  signOutButton: {
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 300,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'lightblue',
  },

  images: {
    flex: 0.6,
  },
});

export default UserScreen;
