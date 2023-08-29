import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const window = Dimensions.get("window"); // Get the window dimensions

export default function VerifyOtp2({ navigation, route }) {
  const [code, setCode] = useState("");

  const handleSignin = async () => {
    const userData = {
      phone: route.params.phoneNumber,
      code: code,
    };
    console.log("userData:::...", userData);

    try {
      const response = await axios.post(
        "https://bike-server1.onrender.com/login2",
        userData
      );

      if (response.status === 200) {
        const userData = response.data.user;
        console.log("Login successful:", userData._id);

        AsyncStorage.setItem(
          "service-user",
          JSON.stringify(response.data.user)
        );

        navigation.navigate("Home");
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Oops! Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.toppart}>
          <View>
            <Image
              source={require("../../assets/languageIcon.png")}
              style={styles.languageIcon}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/mobileMan.png")}
            />
          </View>
        </View>
        <View style={styles.bottompart}>
          <View>
            <Text style={styles.OTPNameText}>OTP send Sucessfully</Text>
            <Text style={styles.OTPNumberText}>{route.params.phoneNumber}</Text>
          </View>

          <View style={styles.OtpBox}>
            <TextInput
              style={styles.inputBox}
              placeholder="OTP"
              value={code}
              onChangeText={setCode}
            ></TextInput>
          </View>

          <View>
            {/* <Text style={styles.agreeText}>
              Resend OTP{" "} */}
              <Text
                onPress={() => navigation.navigate("Login2")}
                style={styles.loginLink}
              >
                Resend OTP
              </Text>
            {/* </Text> */}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleSignin}
          >
            <Text style={styles.btntext}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    height: window.height,
    // borderWidth:2,
    // marginTop: 25
  },
  scrollViewContent: {
    flexGrow: 1,
    // justifyContent: "space-between",
  },
  toppart: {
    flex: 1, // Take 1/3 of the screen height
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    // borderWidth: 2,
    // paddingTop: 25,
  },
  imageContainer: {
    width: "100%",
    height: 320,
    // borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  bottompart: {
    flex: 2, // Take 2/3 of the screen height
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    // borderWidth: 2,
  },
  continueButton: {
    width: "95%",
    backgroundColor: "#F8B50F",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
  },
  btntext: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  OTPNameText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  OTPNumberText: {
    marginTop: 2,
    textAlign: "center",
    fontSize: 15,
  },
  OtpBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  inputBox: {
    width: 100,
    height: 35,
    borderRadius: 5,
    fontSize: 15,
    color: "grey",
    borderWidth: 1,
    textAlign: "center",
  },
  languageIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
    left: 150,
    right: 10,
  },
  agreeText: {
    fontSize: 14,
    color: "grey",
    textAlign: "center",
    // marginVertical: 10,
    fontWeight: "bold",
    margin: 10,
  },
  loginLink: {
    fontWeight: "bold",
    color: "#165BEC",
    textAlign: "center",
    margin: 10,
    // textDecorationLine: "underline",
  },
});
