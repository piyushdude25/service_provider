import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { ContinueButton } from "../ReuseComponents/ContinueButton";

export default function PhonePage({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef(null);

  const getPhoneNumber = () => {
    Alert.alert(phoneNumber);
  };

  return (
    <View style={styles.MainContainer}>
      <View>
        <Image
          source={require("../../assets/languageIcon.png")}
          style={styles.languageIcon}
        />
      </View>
      <View>
        <Image
          source={require("../../assets/mobileMan.png")}
          style={styles.mobileManBox}
          resizeMode="stretch"
        />
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 100 }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "black",
            marginLeft: 15,
          }}
        />
        <View>
          <Text
            style={{
              width: 130,
              textAlign: "center",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Log in or Sign up
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "black",
            marginRight: 15,
          }}
        />
      </View>

      <View style={styles.PhoneBox}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IN"
          layout="first"
          autoFocus
          containerStyle={styles.phoneNumberView}
          textContainerStyle={{ paddingVertical: 0 }}
          onChangeFormattedText={(text) => {
            setPhoneNumber(text);
          }}
        />
      </View>
      {/* <View>
        <ContinueButton
          onPress={() => {
            navigation.navigate("OtpPage");
          }}
          style={[styles.button, styles.buttonText]}
          title="Continue"
        />
      </View> */}
      <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
        {isLoading ? (
          <Text style={styles.signupButtonText}>Uploading...</Text>
        ) : (
          <Text style={styles.signupButtonText}>Log In</Text>
        )}
      </TouchableOpacity>
      <View>
        <Text style={styles.agreeText}>
          If You want to login by Email:{" "}
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.loginLink}
          >
            Email
          </Text>
        </Text>
      </View>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  languageIcon: {
    width: 30,
    height: 30,
    marginLeft: 350,
    marginTop: 10,
  },
  mobileManBox: {
    width: "80%",
    margin: "auto",
    height: 250,
    marginTop: 40,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 20,
    color: "black",
  },
  phoneNumberView: {
    width: "90%",
    height: 40,
    backgroundColor: "white",

    color: "white",
  },
  PhoneBox: {
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    width: "80%",
    padding: 8,
    backgroundColor: "#00B8D4",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  agreeText: {
    fontSize: 14,
    color: "grey",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
});
