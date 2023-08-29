import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartingAuth = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/backImg2.png")}
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <View style={styles.MainContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/mechnic.png")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <View>
              <Text style={styles.text5}>Register Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default StartingAuth;

const styles = StyleSheet.create({
  MainContainer: {
    textAlign: "center",
    alignItems: "center",
    // backgroundColor: "white",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    margin: "5",
    width: "95%",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "rgb(248,181,15)",
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    borderWidth: 1,
  },
  text5: {
    fontSize: 27,
    // fontWeight: "bold",
  },
  imageContainer: {
    width: "55%",
    height: 320,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
});
