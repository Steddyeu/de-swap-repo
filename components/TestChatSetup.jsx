import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../firebase-config';
import { firebaseService } from '../services';

export default function Example() {
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = firebase.auth().currentUser;
  const userName = user.displayName;

  const onSend = useCallback(
    function () {
      setIsLoading(true);
      firebaseService.createMessage({ message, userName }).then(function () {
        setIsLoading(false);
        setMessage('');
      });
    },
    [message]
  );

  return (
    <GiftedChat
      messages={message}
      onSend={(message) => onSend(message)}
      user={{
        _id: 1,
      }}
    />
  );
}
