import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const ContinueButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#fec228",
    borderRadius: 5,
    width: "85%",
    margin: "auto",
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  appButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
