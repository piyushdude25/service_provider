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
import LottieView from "lottie-react-native";

const StartingHome = () => {
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

          {/* <LottieView
            source={require("../assets/continueBtn.json")}
            autoPlay
            loop
          /> */}
        </View>
        {/* <View style={styles.buttonContainer}> */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Home")}
          >
            <View>
              <Text style={styles.text5}>Continue</Text>
            </View>
          </TouchableOpacity>
        {/* </View> */}
      </View>
    </ImageBackground>
  );
};

export default StartingHome;

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







//    >cli>android>app>build>
//     implementation 'com.facebook.fresco:animated-gif:2.6.0'
//     implementation 'com.facebook.fresco:animated-webp:2.0.0'
//     implementation 'com.facebook.fresco:webpsupport:2.0.0'