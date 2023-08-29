import React, { Component } from "react";
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
import { useNavigation } from "@react-navigation/native";

const WelcomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={{alignItems:"center"}}>
      <Text style={styles.agreeText}>
        If You have not account?{" "}
        <Text
          onPress={() => navigation.navigate("Home")}
          style={styles.loginLink}
        >
          Home
        </Text>
      </Text>
      <Text style={styles.agreeText}>
        If You have not account?{" "}
        <Text
          onPress={() => navigation.navigate("RegisterScreen")}
          style={styles.loginLink}
        >
          RegisterScreen
        </Text>
      </Text>
      <Text style={styles.agreeText}>
        If You have not account?{" "}
        <Text
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.loginLink}
        >
          LoginScreen
        </Text>
      </Text>
    </View>
  );
};

export default WelcomePage;
const styles = StyleSheet.create({})