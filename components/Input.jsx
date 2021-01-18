import React, { useCallback, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import firebase from '../firebase-config';

import { firebaseService } from '../services';

export default function Input({ userName2 }) {
  const user = firebase.auth().currentUser;
  const userName = user.displayName;

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = useCallback(
    function () {
      setIsLoading(true);
      firebaseService
        .createMessage({ message, userName, userName2 })
        .then(function () {
          setIsLoading(false);
          setMessage('');
        });
    },
    [message]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write your message"
        />
      </View>

      <Button onPress={handlePress} title="send" />

      {isLoading}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputContainer: {
    width: '70%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
