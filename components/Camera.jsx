import React, { useState, useEffect } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as firebase from "firebase";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

export default function Camera() {
  const [image, setImage] = useState(null);

  let photoName = "";

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
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

    console.log(result);

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
      .child("images/" + imageName);
    return ref.put(blob);
  };

  const submitPhoto = async () => {
    uploadImage(image, "test-image")
      .then(() => {
        Alert.alert("Success!");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("imageName");
  }, [register]);

  const onSubmit = (data) => {
    console.log("data--->", data.imageName);
    uploadImage(image, data.imageName)
      .then(() => {
        Alert.alert("Success!");
      })
      .catch((error) => {
        Alert.alert(error.message);
      })
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="open camera..." onPress={onChooseImagePress} />

      {image && (
        <>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Text>Image name:</Text>
          <TextInput
            onChangeText={(text) => {
              setValue("imageName", text);
            }}
          />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          <Button title="Clear" onPress={() => setImage(!image)} />
        </>
      )}
    </View>
  );
}

// export default class CameraScreen extends React.Component() {

// const styles = StyleSheet.create({
//   Camera: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default CameraScreen;
