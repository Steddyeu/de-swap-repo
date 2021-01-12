import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Platform } from "react-native";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  Button,
  text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import firebase from '../firebase-config';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

export default function Camera() {
  const [image, setImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const user = firebase.auth().currentUser;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase
      .storage()
      .ref()
      .child(`${user.displayName}/` + imageName);
    return ref.put(blob);
  };

  // const submitPhoto = async () => {
  //   uploadImage(image, "test-image")
  //     .then(() => {
  //       Alert.alert("Success!");
  //     })
  //     .catch((error) => {
  //       Alert.alert(error.message);
  //     });
  // };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register('imageName', 'imageSize');
  }, [register]);

  const onSubmit = (data) => {
    console.log('data--->', data);
    uploadImage(image, data.imageName)
      .then(() => {
        const storage = firebase.storage().ref();
        const imageRef = storage.child(`${user.displayName}/` + data.imageName);
        // console.log("data--->", imageRef);
        imageRef.getDownloadURL().then((url) => {
          //console.log(“upLoadRef--->“, url);
          // console.log(‘data---->’, data)
          const db = firebase.firestore();
          db.collection('items').add({
            name: data.imageName,
            url: url,
            size: selectedSize,
            type: selectedType,
            condition: selectedCondition,
            owner: user.displayName,
          });
          Alert.alert('Item added!');
          setImage(null);
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="open camera..." onPress={onChooseImagePress} />

      {image && (
        <>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Text>Image name:</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(text) => {
              setValue('imageName', text);
            }}
          />
          <View style={styles.pickers}>
            <Picker
              style={{ height: 30, width: 150 }}
              selectedValue={selectedType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedType(itemValue)
              }
            >
              <Picker.Item label="Accessories" value="accessories" />
              <Picker.Item label="Top" value="top" />
              <Picker.Item label="Outerwear" value="outerwear" />
              <Picker.Item label="Bottoms" value="bottoms" />
              <Picker.Item label="Footwear" value="footwear" />
            </Picker>

            <Picker
              style={{ height: 30, width: 100 }}
              selectedValue={selectedSize}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSize(itemValue)
              }
            >
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Large" value="large" />
            </Picker>

            <Picker
              style={{ height: 50, width: 150 }}
              selectedValue={selectedCondition}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCondition(itemValue)
              }
            >
              <Picker.Item label="New" value="new" />
              <Picker.Item label="Used: Like new" value="used: like new" />
              <Picker.Item label="Used: Accpetable" value="used: accpetable" />
              <Picker.Item
                label="Used: Heavy signs of wear"
                value="used: heavy signs of wear"
              />
            </Picker>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setImage(!image)}
            >
              <Text>Clear</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Camera: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  button: {
    margin: 5,
    color: 'blue',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },

  pickers: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },

  textBox: {
    color: 'red',
    borderBottomColor: 'red',
    paddingRight: 100,
    marginBottom: 10,
    marginTop: 10,
  },
});
