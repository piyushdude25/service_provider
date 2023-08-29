import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyAccount() {
  const navigation = useNavigation();
  const [serviceProIdData, setserviceProIdData] = useState("");
  console.log("serviceProIdData;;;;;mmm", serviceProIdData);

  const handleLogout = async () => {
    // isLoggedIn(false);
    try {
      await AsyncStorage.removeItem("service-user");
      navigation.navigate("Login2"); // Navigate to the RegisterScreen after logout
    } catch (error) {
      console.log("Error while logging out:", error);
    }
  };

  const getDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem("service-user");
      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setserviceProIdData(parsedData);
      }
    } catch (error) {
      console.log("Error retrieving data from storage:", error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/backImg2.png")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      {/* ///  Top Box //>>>>>>> */}
      <View style={styles.topYellowBox}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/previous.png")}
              style={styles.previousIcon}
            />
          </TouchableOpacity>
          <Text style={styles.topYellowBoxText}>
            <Text style={styles.headingTop}>My Account</Text>
          </Text>
        </View>
      </View>
      {/* /////<<<<<<< */}
      <ScrollView>
        <View style={styles.container}>
          {/* <View style={styles.topBox}>
            <Text style={styles.headingTop}>My Account</Text>
          </View> */}

          <View style={styles.middleBox}>
            <View style={styles.middleB1}>
              <Image
                source={require("../assets/profile-user.png")}
                style={{ height: 100, width: 100 }}
              />

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.box1Text1}>vendor | </Text>
                <Text style={styles.box1Text1}>
                  #
                  {serviceProIdData && serviceProIdData._id
                    ? serviceProIdData._id.slice(-4)
                    : ""}
                </Text>
              </View>

              <Text style={styles.box1Text}>
                {serviceProIdData?.first_name}
              </Text>
              <Text style={styles.box1Text1}>
                {"+"}
                {serviceProIdData?.phone}
              </Text>
            </View>

            <View style={styles.middleB2}>
              <View style={styles.middleB2sub}>
                <Text
                  onPress={() => navigation.navigate("ProfilePage")}
                  style={styles.headingSub}
                >
                  OM SAI AUTOMOBILES
                </Text>
              </View>
              <View style={styles.middleB2sub}>
                <Text
                  onPress={() => navigation.navigate("ProfilePage")}
                  style={styles.headingSub}
                >
                  Siraspeth, Umred Road, Nagpur, MH
                </Text>
              </View>

              <View style={styles.middleB2sub}>
                <Text
                  onPress={() => navigation.navigate("ProfilePage")}
                  style={styles.headingSub}
                >
                  Documents
                </Text>
                <Text>{"->"}</Text>
              </View>
              <View style={styles.middleB2sub}>
                <Text
                  onPress={() => navigation.navigate("ProfilePage")}
                  style={styles.headingSub}
                >
                  Bank Details
                </Text>
                <Text>{"->"}</Text>
              </View>
              <View style={styles.middleB2sub}>
                <Text
                  onPress={() => navigation.navigate("ProfilePage")}
                  style={styles.headingSub}
                >
                  Privacy Policy
                </Text>
                <Text>{"->"}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBox}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.bottomheading}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ///////  Top Box >>>>>>>
  topYellowBox: {
    backgroundColor: "rgb(248,181,15)",
    // borderWidth: 1,
    paddingTop: 45,
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: 15,
    marginTop: -5,
    // marginLeft: -1,
    marginRight: -20,
    // marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previousIcon: {
    height: 30,
    width: 30,
    marginTop: -2,
    marginRight: 10,
    borderRadius: 25,
  },
  topYellowBoxText: { fontSize: 18, fontWeight: "bold" },

  ////  Top Box <<<<<
  container: {
    // paddingTop: 25,
    margin: 15,
    height: 500,
    // justifyContent:"space-between",
    // textAlign:"center",
    // alignItems:"center",
    // borderWidth: 10,
  },
  headingTop: {
    fontWeight: "bold",
    fontSize: 20,
  },
  middleBox: {
    flex: 1,
    // borderWidth: 10,
    // textAlign:"center",
    alignItems: "center",
  },
  middleB1: {
    alignItems: "center",
  },
  box1Text: {
    // fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  box1Text1: {
    color: "grey",
    fontSize: 14,

    textAlign: "center",
  },
  middleB2: {
    // borderWidth: 1,
    width: "100%",
    marginTop: 15,
  },
  middleB2sub: {
    margin: 5,
    width: "97%",
    backgroundColor: "rgb(246,213,119)",
    padding: 8,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingSub: {
    fontWeight: "700",
    fontSize: 14,
    color: "rgb(116,101,40)",
  },
  bottomBox: {
    alignItems: "center",
    margin: "5",
    width: "95%",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "rgb(248,181,15)",
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    // borderWidth: 1,
  },
  bottomheading: {
    // fontWeight: "bold",
    fontSize: 27,
  },
});
