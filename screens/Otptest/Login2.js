import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import PhoneInput from "react-native-phone-number-input";

export default function Login2({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log("phoneNumber::....", phoneNumber);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://bike-server1.onrender.com/verify2",
        {
          phoneNumber,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;
      setIsLoading(false);
      if (json.success) {
        navigation.navigate("VerifyOtp2", {
          phoneNumber,
        });
      } else {
        Alert.alert("Error", "Could not sign up");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error signing up:", error);
      Alert.alert("Error", "Could not sign up");
    }
  };

  return (
    // <View style={styles.container}>
    //   <View style={styles.regform}>
    //     <View style={styles.horizontalLine} />

    //     <PhoneInput
    //       //   value={phoneNumber}
    //       defaultValue={phoneNumber}
    //       defaultCode="IN"
    //       onChangeFormattedText={(text) => {
    //         setPhoneNumber(text);
    //       }}
    //       withDarkTheme
    //       withShadow
    //       autoFocus
    //     />

    //     <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
    //       {isLoading ? (
    //         <Text style={styles.signupButtonText}>Uploading...</Text>
    //       ) : (
    //         <Text style={styles.signupButtonText}>Log In</Text>
    //       )}
    //     </TouchableOpacity>

    //     <Text style={{ height: 50 }}>
    //       If You want to login by Email:{" "}
    //       <Text
    //         onPress={() => navigation.navigate("LoginScreen")}
    //         style={styles.loginLink}
    //       >
    //        Email
    //       </Text>
    //     </Text>
    //     <Text>
    //       If You have not account?{" "}
    //       <Text
    //         onPress={() => navigation.navigate("RegisterScreen")}
    //         style={styles.loginLink}
    //       >
    //         Sign Up
    //       </Text>
    //     </Text>
    //   </View>
    // </View>
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
          <View style={styles.lineContainer}>
            <View style={styles.horizontalLine} />
            <Text style={styles.label}>Sign up</Text>
            <View style={styles.horizontalLine} />
          </View>

          <View style={styles.PhoneBox}>
            <PhoneInput
              placeholder="Enter Phone Number"
              defaultValue={phoneNumber}
              defaultCode="IN"
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              withDarkTheme
              // withShadow
              autoFocus
            />
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
            {isLoading ? (
              <Text style={styles.btntext}>Uploading...</Text>
            ) : (
              <Text style={styles.btntext}>Continue</Text>
            )}
          </TouchableOpacity>
          <View style={{ padding: 3 }}>
            <Text style={styles.agreeText}>
              If You want to login by:{" "}
              <Text
                onPress={() => navigation.navigate("LoginScreen")}
                style={styles.loginLink}
              >
                Email
              </Text>
            </Text>
          </View>
          <View style={{ padding: 3 }}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    height: window.height,
   
  },
  scrollViewContent: {
    flexGrow: 1,
    // justifyContent: "space-between",
  },
  toppart: {
    flex: 1, // Take 1/3 of the screen height
    justifyContent: "center",
    alignItems: "center",
    height: 380,
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
    height: 170,
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
  },Box: {
    borderRadius: 5,
    color: "grey",
    borderWidth: 1,
    padding:2
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
    // fontWeight: "bold",
    margin: 5,
  },
  loginLink: {
    fontWeight: "bold",
    color: "#165BEC",
    textAlign: "center",
    margin: 5,
    // textDecorationLine: "underline",
  },
  lineContainer: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  horizontalLine: {
    flex: 1,
    height: 2,
    backgroundColor: "grey", // You can change the color as needed
  },

  label: {
    color:"grey",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10, // Adjust as needed
  },
});
