import React, { useState } from "react";
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login2 from "./Otptest/Login2";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleSignin = async () => {
    const userData = {
      email,
      password,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://bike-server1.onrender.com/api/subusers/servicelogin",
        userData
      );
      console.log(response);
      setIsLoading(false);
      if (response.status === 200) {
        setEmail("");
        setPassword("");

        // Save user information in local storage
        AsyncStorage.setItem("service-user", JSON.stringify(response.data));
        Alert.alert("Welcome back! You have successfully logged in.");
        setLoginMessage("Login successful");
        navigation.navigate("Home");
      } else {
        console.log("Authentication failed");
        // Display an error message or take appropriate action
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Hide "uploading message"

      // Show error alert
      Alert.alert(
        "Oops! Something went wrong. Please check your credentials and try again."
      );
      setLoginMessage("Login failed. Please try again.");
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // Password validation (check if password contains at least one special character and one number)
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;

    if (text.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!specialCharacterRegex.test(text)) {
      setPasswordError("Password must contain at least one special character.");
    } else if (!numberRegex.test(text)) {
      setPasswordError("Password must contain at least one number.");
    } else {
      setPasswordError("");
    }
  };

  const handleFieldFocus = (field) => {
    switch (field) {
      case "name":
        setIsNameFocused(true);
        break;
      case "email":
        setIsEmailFocused(true);
        break;
      case "password":
        setIsPasswordFocused(true);
        break;
      default:
        break;
    }
  };

  const handleFieldBlur = (field) => {
    switch (field) {
      case "name":
        setIsNameFocused(false);
        break;
      case "email":
        setIsEmailFocused(false);
        break;
      case "password":
        setIsPasswordFocused(false);
        break;
      default:
        break;
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
              source={require("../assets/languageIcon.png")}
              style={styles.languageIcon}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              // source={require("../assets/loading1.gif")}
              source={require("../assets/mobileMan.png")}
            />
          </View>
        </View>

        <View style={styles.bottompart}>
          <View style={styles.inputContainer}>
            <View style={styles.lineContainer}>
              <View style={styles.horizontalLine} />
              <Text style={styles.label}>Login</Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  isEmailFocused ? styles.inputFocused : null,
                ]}
                placeholder="Email Id:"
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={[
                    // styles.input,
                    styles.passwordInput,
                    isPasswordFocused ? styles.inputFocused : null,
                    passwordError ? styles.inputError : null,
                  ]}
                  placeholder="Password :"
                  value={password}
                  onChangeText={handlePasswordChange}
                  onFocus={() => handleFieldFocus("password")}
                  onBlur={() => handleFieldBlur("password")}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.passwordVisibilityIcon}
                  onPress={handlePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <Image
                      source={require("../assets/cartoon-eyes.png")}
                      style={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/eyes.png")}
                      style={{ width: 30, height: 30 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleSignin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text style={styles.btntext}>Updating...</Text>
                ) : (
                  // <View
                  //   style={{ justifyContent: "center", alignItems: "center" }}
                  // >
                  // <Image
                  //     source={require("../assets/loading1.gif")}
                  //     style={{ width: 200, height: 200, resizeMode: "contain" }}
                  //   />
                  // <Text>asdfghjk</Text>
                  // {/* </View> */}
                  <Text style={styles.btntext}>Log In</Text>
                )}
              </TouchableOpacity>

              <View style={{ padding: 3 }}>
                <Text style={styles.agreeText}>
                  If You want to login by Phone:{" "}
                  <Text
                    onPress={() => navigation.navigate("Login2")}
                    style={styles.loginLink}
                  >
                    OTP
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    height: 600,
  },
  loginButton: {
    backgroundColor: "#FEC324",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 5,
  },
  loginButtonText: {
    color: "black",
    fontWeight: "normal",
    textAlign: "center",
  },
  languageIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
    left: 150,
    right: 10,
  },
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 6,
    height: 43,
  },
  passwordInput: {
    flex: 1,
    color: "black",
    fontWeight: "normal",
  },
  passwordVisibilityIcon: {
    padding: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    height: 500,
    padding: 15,
  },
  textContainer: {
    // margin: 20,
    // borderWidth: 1,
  },
  heading: {
    fontSize: 26,
    color: "#39588f",
    fontWeight: "bold",
    textAlign: "center",
  },
  subheading: {
    marginTop: 5,
    fontSize: 16.5,
    color: "#39588f",
    textAlign: "center",
  },
  inputContainer: {
    flex: 2,
    width: "100%",
    // borderWidth: 1,
    borderRadius: 7,
    alignItems: "center",
  },
  lineContainer: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  horizontalLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#000", // You can change the color as needed
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10, // Adjust as needed
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 7,
    width: "100%",
  },
  input: {
    height: 40,
    color: "black",
    fontWeight: "normal",
    width: "100%",
    borderWidth: 0.5,
    marginBottom: 5,
    borderRadius: 5,
    padding: 6,
    borderColor: "grey",
  },
  button: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  loginLink: {
    fontWeight: "bold",
    color: "#165BEC",
    textDecorationLine: "underline",
  },
  inputFocused: {
    padding: 5,
    borderColor: "#ffbe28", // Change to the desired color for focused input fields
    borderWidth: 2, // Change to the desired border width for focused input fields
  },

  // Style for input fields with errors
  inputError: {
    padding: 5,
    borderColor: "red", // Change to the desired color for input fields with errors
    borderWidth: 2, // Change to the desired border width for input fields with errors
  },

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
    height: 350,
    // borderWidth: 2,
    // paddingTop: 25,
  },
  imageContainer: {
    width: "100%",
    height: 300,
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
    height: 270,
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
  Box: {
    borderRadius: 5,
    color: "grey",
    borderWidth: 1,
    padding: 2,
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
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10, // Adjust as needed
  },
});

export default LoginScreen;
