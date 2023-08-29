import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

const StartingPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.agreeText}>
        If You have not account?{" "}
        <Text
          onPress={() => navigation.navigate("RegisterScreen")}
          style={styles.loginLink}
        >
          Sign Up
        </Text>
      </Text>
      <Text style={styles.agreeText}>
        If You have not account?{" "}
        <Text
          onPress={() => navigation.navigate("RegisterScreen")}
          style={styles.loginLink}
        >
          Sign Up
        </Text>
      </Text>
      <Text style={styles.agreeText}>
        If You have not account?{" "}
        <Text
          onPress={() => navigation.navigate("RegisterScreen")}
          style={styles.loginLink}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default StartingPage;
const styles = StyleSheet.create({});
