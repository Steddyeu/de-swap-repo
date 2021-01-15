import React, { useEffect, useReducer, useContext, useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Text } from 'react-native-elements';
import { firebaseService } from '../services';
import Input from './Input';
import Message from './Message';
import { messagesReducer } from './reducer';
import firebase from '../firebase-config';
import lodash from 'lodash';

function MessageScreen({ route, navigation }) {
  const user = firebase.auth().currentUser;
  const userName = user.displayName;
  const userName2 = route.params.secondUser;
  let refCompleteSwap = { [userName]: true, [userName2]: true };

  const [messages, dispatchMessages] = useReducer(messagesReducer, []);
  const [items, setItems] = useState({});
  const [loadingImages, setLoadingImages] = useState(true);
  const [completeSwap, setCompleteSwap] = useState({});
  const [agreeSwap, setAgreeSwap] = useState(false);

  const db = firebase.firestore();

  const toggleAgreeSwap = async () => {
    Alert.alert('Swap will be confirmed when both Users have sent the Item');
    setAgreeSwap(true);
  };

  const toggleItemSent = async () => {
    // Alert.alert("Swap will be confirmed when both Users have sent the Item");
    const user = firebase.auth().currentUser.displayName;
    const dbRef = firebaseService.messageRef
      .doc(firebaseService.chatID(userName2))
      .collection('images')
      .doc(user);

    return dbRef
      .update({
        itemSent: true,
      })
      .then(() => {
        return firebaseService.messageRef
          .doc(firebaseService.chatID(userName2))
          .collection('images')
          .get()
          .then((data) => {
            const completeSwap = {};
            data.forEach((doc) => {
              const { itemSent } = doc.data();
              completeSwap[doc.id] = itemSent;
            });

            setCompleteSwap(completeSwap);
            if (lodash.isEqual(completeSwap, refCompleteSwap)) {
              const db = firebase.firestore();
              db.collection('swapped').add({
                userA: userName,
                userAItem: items[userName],
                userB: userName2,
                userBItem: items[userName2],
              });
            }
          });
      });
  };

  useEffect(
    function () {
      const messagesPromise = firebaseService.messageRef
        .doc(firebaseService.chatID(userName2))
        .collection('chats')
        .orderBy('created_at', 'desc')
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: 'add', payload: snapshot.docs });
        });

      const itemsPromise = firebaseService.messageRef
        .doc(firebaseService.chatID(userName2))
        .collection('images')
        .onSnapshot((data) => {
          const items = {};
          data.forEach((doc) => {
            const { imageURL } = doc.data();
            items[doc.id] = imageURL;
          });
          setItems(items);
          setLoadingImages(false);
        });

      const completeSwapCheckPromise = firebaseService.messageRef
        .doc(firebaseService.chatID(userName2))
        .collection('images')
        .onSnapshot((data) => {
          const completeSwap = {};
          data.forEach((doc) => {
            const { itemSent } = doc.data();
            completeSwap[doc.id] = itemSent;
          });

          // const completeSwapCheckPromise = firebaseService.messageRef
          //   .doc(firebaseService.chatID(userName2))
          //   .collection('images')
          //   .get()
          //   .then((data) => {
          //     const completeSwap = {};
          //     data.forEach((doc) => {
          //       const { itemSent } = doc.data();
          //       completeSwap[doc.id] = itemSent;
          //     });

          setCompleteSwap(completeSwap);
        });
      Promise.all([messagesPromise, itemsPromise, completeSwapCheckPromise]);
    },
    [false]
  );

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        {!loadingImages && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: items[userName] }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginRight: 'auto',
                marginLeft: 10,
                marginTop: 10,
              }}
            />
            <Image
              source={{ uri: items[userName2] }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginRight: 10,
                marginTop: 10,
              }}
            />
          </View>
        )}

        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            //console.log(item, 'item')
            return item.id;
          }}
          renderItem={function ({ item }) {
            const data = item.data();
            const side = data.user_id === userName ? 'right' : 'left';

            // const time = formatAMPM(new Date());

            return (
              <Message
                side={side}
                message={data.message}
                user={data.user_id}
                // timeSent={time}
              />
            );
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input userName2={userName2} />
        <View></View>
        {lodash.isEqual(completeSwap, refCompleteSwap) ? (
          <Text style={styles.swapAgreedIcon}>Swap Agreed!!!</Text>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.viewItemsButton}
              onPress={() => {
                navigation.navigate('OtherUser', {
                  screen: 'OtherUser',
                  params: { user: userName2 },
                });
              }}
            >
              <Text>View {userName2}'s items</Text>
            </TouchableOpacity>
            {!agreeSwap ? (
              <TouchableOpacity
                style={styles.agreeSwapButton}
                onPress={() => {
                  toggleAgreeSwap();
                }}
              >
                <Text>Agree Swap</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.confirmSwapButton}
                  onPress={() => {
                    toggleItemSent();
                  }}
                >
                  <Text>Confirm Item Sent</Text>
                </TouchableOpacity>
                {/* <Text>
                  Swap will be confirmed when both Users have sent the Item
                </Text> */}
              </View>
            )}
          </View>
        )}
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('OtherUser', {
              screen: 'OtherUser',
              params: { user: userName2 },
            });
          }}
        >
          <Text>View {userName2}'items</Text>
        </TouchableOpacity>
        {!agreeSwap ? (
          <TouchableOpacity
            onPress={() => {
              toggleAgreeSwap();
            }}
          >
            <Text>Agree Swap</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                toggleItemSent();
              }}
            >
              <Text>Confirm Item Sent</Text>
            </TouchableOpacity>
            <Text>
              Swap will be confirmed when both Users have sent the Item
            </Text>
            {lodash.isEqual(completeSwap, refCompleteSwap) && (
              <Text>Swap Agreed!!!</Text>
            )}
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    height: '95%',
    paddingBottom: 100,
  },

  imageContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  viewItemsButton: {
    backgroundColor: '#4d88ff',
    marginTop: 15,
    width: '40%',
    alignItems: 'center',
    padding: 10,
    fontSize: 20,
    borderRadius: 40,
    color: 'white',
  },
  agreeSwapButton: {
    backgroundColor: '#49d049',
    marginTop: 15,
    width: '40%',
    alignItems: 'center',
    padding: 10,
    fontSize: 20,
    borderRadius: 40,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confirmSwapButton: {
    backgroundColor: '#49d049',
    marginTop: 5,
    alignItems: 'center',
    padding: 10,
    fontSize: 20,
    borderRadius: 40,
    color: 'white',
  },
  swapAgreedIcon: {
    backgroundColor: '#49d049',
    marginTop: 20,
    width: '50%',
    marginLeft: 75,
    alignItems: 'center',
    padding: 10,
    paddingLeft: 25,
    fontSize: 20,
    borderRadius: 40,
    color: 'white',
  },
});

export default MessageScreen;
