import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const JobCartList = () => {

     const route = useRoute();
     const { product } = route.params;

      const navigation = useNavigation();
  const [serviceP_Data, setserviceP_Data] = useState("");
  const [jdata, setJData] = useState([]);
  console.log("serviceP_Data::xxx", serviceP_Data._id);

// console.log(jdata.filter((j) =>j.serviceProInfo[0].id))

//   const commonIds = jdata.filter((j) =>
//     serviceP_Data && serviceP_Data.length > 0
//       ? serviceP_Data._id === j.serviceProInfo[0].id
//       : false
//   );
//   console.log("commonIds:", commonIds);

const foundIds = [];

jdata.forEach((item) => {
  const serviceProInfo = item.serviceProInfo[0];
  if (serviceProInfo && serviceProInfo.id === serviceP_Data._id) {
    foundIds.push(item);
  }
});

console.log(foundIds);


 
    const getAllJobCarts = () => {
      fetch("https://bike-server1.onrender.com/api/newjobcart", {})
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setJData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

  const getDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem("service-user");
      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setserviceP_Data(parsedData);
      } else {
        console.log("No data found in storage");
      }
    } catch (error) {
      console.log("Error retrieving data from storage:", error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
    getAllJobCarts()
  }, []);

  const HandleOrderComplete=()=>{
    Alert.alert("Order Completed!!!")
  }

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
            #{product && product.p_id ? product.p_id.slice(-4) : ""}
          </Text>
        </View>
        <View style={{ alignItems: "left", flexDirection: "row" }}>
          <Text style={styles.topYellowBoxText}>Go Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/next.png")}
              style={styles.previousIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* /////<<<<<<< */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "rgb(248,181,15)",
          marginLeft: 20,
          textDecorationLine:"underline"
        }}
      >
        Job Card List:
      </Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {foundIds.map((item) => (
            <View key={item._id} style={styles.itemContainer}>
              <View>
                <Text style={styles.text}>JC_createdAt: {item.createdAt}</Text>
                <Text style={styles.text}>
                  p_id: {item.customerInfo[0].p_id}
                </Text>
                <Text style={styles.text}>
                  total: {item.customerInfo[0].total}
                </Text>

                {/* Mapping the 'servicing' array */}
                {item.servicing.map((service, index) => (
                  <View key={index} style={styles.servicingContainer}>
                    <Text style={styles.text}>
                      Service {index + 1}: {service}
                    </Text>
                  </View>
                ))}

                <Text style={styles.text}>
                  Location: {item.customerInfo[0].location}
                </Text>
                <Text style={styles.text}>
                  Total: {item.customerInfo[0].total}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => HandleOrderComplete()}
              >
                <Text style={styles.buttonText}>Order Complete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default JobCartList;
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

  scrollViewContent: {
    // alignItems: "flex-start",
    //  height: "140%",
  },
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 16,
    width: "100%",
    paddingTop: 25,
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(248,181,15,0.8)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 19,
    // fontWeight: "bold",
    color: "black",
  },
});