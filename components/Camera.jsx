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
import firebase from "../firebase-config";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

export default function Camera() {
  const [image, setImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const user = firebase.auth().currentUser;

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
    register("imageName", "imageSize");
  }, [register]);

  const onSubmit = (data) => {
    console.log("data--->", data);
    uploadImage(image, data.imageName)
      .then(() => {
        const storage = firebase.storage().ref();
        const imageRef = storage.child(`${user.displayName}/` + data.imageName);
        // console.log("data--->", imageRef);
        imageRef.getDownloadURL().then((url) => {
          //console.log(“upLoadRef--->“, url);
          // console.log(‘data---->’, data)
          const db = firebase.firestore();
          db.collection("items").add({
            name: data.imageName,
            url: url,
            size: selectedSize,
            type: selectedType,
            condition: selectedCondition,
            owner: user.displayName,
          });
          Alert.alert("Item added!");
          setImage(null);
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.overallContainer}>
      {!image ? (
        <>
          <TouchableOpacity style={styles.openCameraButton} onPress={pickImage}>
            <Text style={styles.text}>Pick image from camera roll</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.openCameraButton}
            onPress={onChooseImagePress}
          >
            <Text style={styles.text}>Open Camera</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TextInput
            style={styles.textBox}
            placeholder="...Item description..."
            onChangeText={(text) => {
              setValue("imageName", text);
            }}
          />
          <View style={styles.pickers}>
            <Picker
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
              style={styles.pickersContainer}
              selectedValue={selectedSize}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSize(itemValue)
              }
            >
              <Picker.Item label="Extra Small" value="extra small" />
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Large" value="large" />
              <Picker.Item label="Extra Large" value="extra large" />
            </Picker>

            <Picker
              style={styles.pickers}
              selectedValue={selectedCondition}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCondition(itemValue)
              }
            >
              <Picker.Item label="New" value="new" />
              <Picker.Item label="Used: Like new" value="used: like new" />
              <Picker.Item label="Used: Acceptable" value="used: acceptable" />
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
              <Text style={styles.text}>Submit item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setImage(!image)}
            >
              <Text style={styles.text}>Clear image</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccdfff",
  },
  openCameraButton: {
    borderRadius: 40,
    margin: 5,
    backgroundColor: "#1E90FF",
  },
  Camera: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 40,
    width: 370,
    height: 370,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#99bbff",
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  button: {
    marginRight: 5,
    color: "white",
    backgroundColor: "#1E90FF",
    padding: 5,
    borderRadius: 40,
  },
  pickersContainer: {
    height: 30,
    width: 200,
  },
  pickers: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },

  textBox: {
    color: "black",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 15,
    width: 240,
    height: 40,
  },
  pickers: {
    marginBottom: 0,
  },
  text: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
});
