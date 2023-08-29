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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [title, setTitle] = useState("");
  const [status, setstatus] = useState("false");
  const [position, setPosition] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  console.log("signupMessage...", signupMessage);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [istitleFocused, setIstitleFocused] = useState(false);
  const [isstatusFocused, setIsstatusFocused] = useState(false);
  const [isfirst_nameFocused, setfirst_nameIsFocused] = useState(false);
  const [ispositionFocused, setpositionIsFocused] = useState(false);
  const [ispasswordFocused, setpasswordIsFocused] = useState(false);
  const [islast_nameFocused, setlast_nameIsFocused] = useState(false);
  const [isareaFocused, setareaIsFocused] = useState(false);
  const [isphoneFocused, setphoneIsFocused] = useState(false);
  const [isemailFocused, setemailIsFocused] = useState(false);

  const handleRegister = async () => {
    const userData = {
      title,
      status,
      position,
      first_name,
      last_name,
      area,
      phone,
      email,
      password,
    };

    try {
      setIsLoading(true); // Show "uploading message"
      const response = await axios.post(
        "https://bike-server1.onrender.com/api/subusers/create",
        userData
      );
      console.log(response);
      setIsLoading(false); // Hide "uploading message"
      Alert.alert("Sign up successful");
      setSignupMessage("Sign up successful");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Hide "uploading message"

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert("Sign up failed. Please try again.");
        setSignupMessage(`Sign up failed: ${error.response.data.message}`);
      } else if (error.message === "Network Error") {
        Alert.alert("Sign up failed. Please try again.");
        setSignupMessage(
          "Network error. Please check your internet connection."
        );
      } else {
        Alert.alert("Sign up failed. Please try again.");
        setSignupMessage("Sign up failed. Please try again.");
      }
    }

    setTitle("");
    // setstatus("");
    setPosition("");
    setFirst_name("");
    setLast_name("");
    setArea("");
    setPhone("");
    setEmail("");
    setPassword("");
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
      case "title":
        setIstitleFocused(true);
        break;
      // case "status":
      //   setIsstatusFocused(true);
      //   break;
      case "position":
        setpositionIsFocused(true);
        break;
      case "first_name":
        setfirst_nameIsFocused(true);
        break;
      case "last_name":
        setlast_nameIsFocused(true);
        break;
      case "area":
        setareaIsFocused(true);
        break;
      case "phone":
        setphoneIsFocused(true);
        break;
      case "email":
        setemailIsFocused(true);
        break;
      case "password":
        setpasswordIsFocused(true);
        break;
      default:
        break;
    }
  };

  const handleFieldBlur = (field) => {
    switch (field) {
      case "title":
        setIstitleFocused(false);
        break;
      // case "status":
      //   setIsstatusFocused(false);
      //   break;
      case "position":
        setpositionIsFocused(false);
        break;
      case "first_name":
        setfirst_nameIsFocused(false);
        break;
      case "last_name":
        setlast_nameIsFocused(false);
        break;
      case "area":
        setareaIsFocused(false);
        break;
      case "phone":
        setphoneIsFocused(false);
        break;
      case "email":
        setemailIsFocused(false);
        break;
      case "password":
        setpasswordIsFocused(false);
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/mobileMan.png")}
          />
        </View>

        <View style={styles.formContainer}>
          {/* <View style={styles.textContainer}>
            <Text style={styles.heading}>FAST & EASY SERVICE PROVIDING</Text>
          </View> */}

          <View style={styles.inputContainer}>
            <View style={styles.lineContainer}>
              <View style={styles.horizontalLine} />
              <Text style={styles.label}>Sign up</Text>
              <View style={styles.horizontalLine} />
            </View>

            {/* ///////////////////////////>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<< */}
            {/* <Button
              color="#000"
              title="NewJobcart"
              onPress={() => navigation.navigate("NewJobcart")}
            ></Button> */}
            {/* ///////////////////////////>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<< */}
            <TextInput
              style={[
                styles.input,
                istitleFocused ? styles.inputFocused : null,
              ]}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
              onFocus={() => handleFieldFocus("title")}
              onBlur={() => handleFieldBlur("title")}
            />

            {/* <TextInput
              style={[
                styles.input,
                isstatusFocused ? styles.inputFocused : null,
              ]}
              placeholder="Status"
              value={status}
              onChangeText={(text) => setstatus(text)}
              onFocus={() => handleFieldFocus("status")}
              onBlur={() => handleFieldBlur("status")}
            /> */}

            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  ispositionFocused ? styles.inputFocused : null,
                ]}
                placeholder="Position"
                value={position}
                onChangeText={(text) => setPosition(text)}
                onFocus={() => handleFieldFocus("position")}
                onBlur={() => handleFieldBlur("position")}
              />

              <TextInput
                style={[
                  styles.input,
                  isfirst_nameFocused ? styles.inputFocused : null,
                ]}
                placeholder="First Name"
                value={first_name}
                onChangeText={(text) => setFirst_name(text)}
                onFocus={() => handleFieldFocus("first_name")}
                onBlur={() => handleFieldBlur("first_name")}
              />
              <TextInput
                style={[
                  styles.input,
                  islast_nameFocused ? styles.inputFocused : null,
                ]}
                placeholder="Last Name"
                value={last_name}
                onChangeText={(text) => setLast_name(text)}
                onFocus={() => handleFieldFocus("last_name")}
                onBlur={() => handleFieldBlur("last_name")}
              />
              <TextInput
                style={[
                  styles.input,
                  isareaFocused ? styles.inputFocused : null,
                ]}
                placeholder="Area"
                value={area}
                onChangeText={(text) => setArea(text)}
                onFocus={() => handleFieldFocus("area")}
                onBlur={() => handleFieldBlur("area")}
              />
              <TextInput
                style={[
                  styles.input,
                  isphoneFocused ? styles.inputFocused : null,
                ]}
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                onFocus={() => handleFieldFocus("phone")}
                onBlur={() => handleFieldBlur("phone")}
              />
              <TextInput
                style={[
                  styles.input,
                  isemailFocused ? styles.inputFocused : null,
                ]}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={() => handleFieldFocus("email")}
                onBlur={() => handleFieldBlur("email")}
              />

              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={[
                    // styles.input,
                    styles.passwordInput,
                    ispasswordFocused ? styles.inputFocused : null,
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
                style={styles.signupButton}
                onPress={handleRegister}
              >
                {isLoading ? (
                  <Text style={styles.signupButtonText}>Uploading...</Text>
                ) : (
                  <Text style={styles.signupButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <Text>
                If you already have an account?{" "}
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                > */}
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#165BEC",
                    textDecorationLine: "underline",
                  }}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  Login
                </Text>
                {/* </TouchableOpacity> */}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    height: 850,
    flexGrow: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "90%",
    height: 220,
    // borderWidth: 1,
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  formContainer: {
    width: "100%",
    height: "55%",
    // margin: 0,
    padding: 15,
    // borderWidth: 1,
  },
  textContainer: {
    // marginBottom: 20,
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
    alignItems: "center",
    borderRadius: 7,
  },
  lineContainer: {
    margin: 20,
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
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 7,
    width: "100%",
  },
  input: {
    color: "black",
    fontWeight: "normal",
    width: "100%",
    height: 40,
    borderWidth: 0.5,
    marginBottom: 5,
    borderRadius: 5,
    padding: 6,
    borderColor: "grey",
  },
  inputError: {
    borderColor: "red",
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
  button: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "#F8B50F",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 5,
  },
  signupButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  loginLink: {
    fontWeight: "bold",
    color: "#165BEC",
    textDecorationLine: "underline",
  },
  inputFocused: {
    padding: 5,
    borderColor: "#F8B50F", // Change to the desired color for focused input fields
    borderWidth: 2, // Change to the desired border width for focused input fields
  },

  // Style for input fields with errors
  inputError: {
    padding: 5,
    borderColor: "red", // Change to the desired color for input fields with errors
    borderWidth: 2, // Change to the desired border width for input fields with errors
  },
});
export default RegisterScreen;
