import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
} from "react-native";
import { Dimensions } from "react-native";
import HomeScreen from "./Home";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function UserItemList(props) {
  return (
    <View style={styles.itemList}>
      <FlatList
        data={props.imageUrls}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Item", { itemUrl: item });
            }}
          >
            <Image
              source={{ uri: item }}
              style={{ width: windowWidth / 3, height: windowWidth / 3 }}
            />
          </TouchableOpacity>
        )}
        numColumns={3}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  itemList: {
    flex: 1,
  },
});
export default UserItemList;
