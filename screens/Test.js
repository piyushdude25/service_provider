// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
// } from "react-native";

// const Test = () => {
//   const [focusedField, setFocusedField] = useState(null);

//   const handleFocus = (fieldName) => {
//     setFocusedField(fieldName);
//   };

//   const handleBlur = () => {
//     setFocusedField(null);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter Card Details:</Text>

//       <TextInput
//         style={[
//           styles.input,
//           focusedField === "cardNumber" && styles.focusedInput,
//         ]}
//         placeholder="Card Number"
//         onFocus={() => handleFocus("cardNumber")}
//         onBlur={handleBlur}
//       />
//       <TextInput
//         style={[
//           styles.input,
//           focusedField === "expiryDate" && styles.focusedInput,
//         ]}
//         placeholder="Expiry Date"
//         onFocus={() => handleFocus("expiryDate")}
//         onBlur={handleBlur}
//       />
//       <TextInput
//         style={[styles.input, focusedField === "cvv" && styles.focusedInput]}
//         placeholder="CVV"
//         onFocus={() => handleFocus("cvv")}
//         onBlur={handleBlur}
//       />
//       <TextInput
//         style={[
//           styles.input,
//           focusedField === "nameOnCard" && styles.focusedInput,
//         ]}
//         placeholder="Name on Card"
//         onFocus={() => handleFocus("nameOnCard")}
//         onBlur={handleBlur}
//       />

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Pay Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "80%",
//     height: 40,
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   focusedInput: {
//     borderColor: "blue", // Change to your desired focused color
//     borderWidth: 2,
//   },
//   button: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default Test;


import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Test({ navigation }) {
  const [email, setEmail] = useState("test1@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+911234567890");
  const [password, setPassword] = useState("Pass@123");

  return (
    <View style={styles.container}>
      <View style={styles.regform}>
        <Text style={styles.header}>Test Login</Text>

        <TextInput
          style={styles.textinput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <TextInput
          style={styles.textinput}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        ></TextInput>
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        ></TextInput>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            fetch("https://bike-server1.onrender.com/verify", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phoneNumber,
              }),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  navigation.navigate("VerificationForm", {
                    email,
                    phoneNumber,
                    password,
                  });
                } else {
                  Alert.alert("Error", "Could not sign up");
                }
              })
              .catch((e) => {
                Alert.alert("Error", "Could not sign up");
              });
          }}
        >
          <Text style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>

        {/* <Text>
        If you already have an account?{" "}
        <Text
          style={{
            fontWeight: "bold",
            color: "#165BEC",
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("LoginScreen2")}
        >
          Login
        </Text>
      </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#36485f",
    paddingLeft: 60,
    paddingRight: 60,
  },
  regform: {
    alignSelf: "stretch",
  },
  header: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
    borderBottomWidth: 1,
  },
  btntext: {
    color: "#fff",
    fontWeight: "bold",
  },
});
