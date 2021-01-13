import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import firebase from "../firebase-config";

export default function Message({ message, side, user }) {

  let isLeftSide;
  if (side === "left") {
    isLeftSide = true;
  } else {
    isLeftSide = false;
  }

  const containerStyles = isLeftSide
    ? styles.container
    : flattenedStyles.container;
  const textContainerStyles = isLeftSide
    ? styles.textContainer
    : flattenedStyles.textContainer;
  const textStyles = isLeftSide
    ? flattenedStyles.leftText
    : flattenedStyles.rightText;

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        {/* //Avatar - may need it from props in Message.jsx? */}
        <Text style={textStyles}>{user}</Text>
        <Text style={textStyles}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textContainer: {
    width: 160,
    backgroundColor: "gray",

    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginLeft: 10,
  },
  rightContainer: {
    justifyContent: "flex-end",
  },
  rightTextContainer: {
    backgroundColor: "lightblue",
    marginRight: 10,
  },
  leftText: {
    textAlign: "left",
    fontSize: 12,
  },
  rightText: {
    textAlign: "right",
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },

});

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([
    styles.textContainer,
    styles.rightTextContainer,
  ]),
  leftText: StyleSheet.flatten([styles.leftText, styles.text]),
  rightText: StyleSheet.flatten([styles.rightText, styles.text]),
};
