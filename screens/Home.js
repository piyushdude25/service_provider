import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [serviceP_Data, setserviceP_Data] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [status, setstatus] = useState(false);
  const [isOnDuty, setIsOnDuty] = useState(false);

  useEffect(() => {
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

    getDataFromStorage();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        if (serviceP_Data && serviceP_Data._id) {
          const response = await fetch(
            `https://bike-server1.onrender.com/api/subusers/${serviceP_Data._id}`
          );
          const data = await response.json();
          setProductsData(data.products);
          setstatus(data.status);
        }
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    };

    if (serviceP_Data) {
      fetchCustomerData();
    }
  }, [serviceP_Data]);

  useEffect(() => {
    setIsOnDuty(status);
  }, [status]);

  const handleSliderToggle = async () => {
    try {
      const apiUrl = `https://bike-server1.onrender.com/api/subusers/updatestatus/${serviceP_Data._id}`;
      const response = await axios.put(apiUrl, { status: !isOnDuty });
      console.log(response.data);
      setIsOnDuty((prevState) => !prevState);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleViewClick = () => {
    navigation.navigate("NewOrders", { productsData });
  };

  const capitalizedWord = serviceP_Data?.first_name
    ? serviceP_Data.first_name.charAt(0).toUpperCase() +
      serviceP_Data.first_name.slice(1)
    : "";

  return (
    <ImageBackground
      source={require("../assets/backImg2.png")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View>
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "black" }}
              >
                Hello, {capitalizedWord}
              </Text>
              <TouchableOpacity
                style={{ marginLeft: 150 }}
                onPress={() => navigation.navigate("MyAccount")}
              >
                <Image
                  source={require("../assets/sos.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.Btncontainer}>
              <TouchableOpacity
                style={[
                  styles.sliderButton,
                  isOnDuty ? styles.onDuty : styles.offDuty,
                  { paddingVertical: isOnDuty ? 1 : 1 },
                ]}
                onPress={handleSliderToggle}
              >
                {isOnDuty ? (
                  <View
                    style={{
                      // marginRight: 0,
                      // marginLeft: 5,
                      flexDirection: "row",
                      // borderWidth: 1,
                    }}
                  >
                    <Text style={styles.greensliderText}>On Duty</Text>
                    <Image
                      source={require("../assets/greenDot.png")}
                      style={{ width: 45, height: 45, marginLeft: 5 }}
                    />
                  </View>
                ) : (
                  <>
                    <Image
                      source={require("../assets/redDot.png")}
                      style={{ width: 45, height: 45, marginLeft: -3 }}
                    />
                    <Text style={styles.redsliderText}>Off Duty</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* <Text style={{ fontSize: 40, textAlign: "center" }}>
          {productsData ? productsData.length : "--"}
        </Text> */}

            <View style={{ flex: 3 }}>
              <View style={styles.boxs2}>
                <TouchableOpacity onPress={handleViewClick}>
                  <View
                    style={{
                      width: 150,
                      height: 120,
                      flex: 1,
                      backgroundColor: "rgba(251,221,148,0.75)",
                      // margin: 15,
                      padding: 15,
                      gap: 1,
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: 15,

                      // borderWidth: 1,
                    }}
                  >
                    <Text style={{ fontSize: 40, textAlign: "center" }}>
                      {productsData ? productsData.length : "--"}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      New Orders
                    </Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    width: 150,
                    height: 120,
                    // flex: 1,
                    backgroundColor: "rgba(251,221,148,0.75)",
                    // margin: 5,
                    // padding: 15,
                    borderRadius: 15,
                    textAlign: "center",
                    paddingTop: 15,
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 40, textAlign: "center" }}>{0}</Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    In-Progress Orders
                  </Text>
                </View>
              </View>

              {/* //////////////////////////////// */}

              <View style={styles.boxs2} onPress>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Team");
                  }}
                >
                  <View
                    style={{
                      width: 150,
                      height: 120,
                      flex: 1,
                      backgroundColor: "rgba(251,221,148,0.75)",
                      // margin: 10,
                      // padding: 55,
                      gap: 15,
                      textAlign: "center",
                      alignItems: "center",
                      borderRadius: 15,
                    }}
                  >
                    <View style={{ marginTop: 25 }}>
                      <Image
                        source={require("../assets/group.png")}
                        style={styles.icons}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Team
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <View
                  style={{
                    width: 150,
                    height: 120,
                    flex: 1,
                    backgroundColor: "rgba(251,221,148,0.75)",
                    // margin: 10,
                    borderRadius: 15,
                    textAlign: "center",
                    paddingTop: 15,
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 40, textAlign: "center" }}>{0}</Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Closed Orders
                  </Text>
                </View>
              </View>

              <View style={styles.boxs2}>
                <View
                  style={{
                    width: 150,
                    height: 120,
                    flex: 1,
                    backgroundColor: "rgba(251,221,148,0.75)",
                    gap: 15,
                    textAlign: "center",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                >
                  <View style={{ marginTop: 25 }}>
                    <Image
                      source={require("../assets/earnings.png")}
                      style={styles.icons}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Earnings
                  </Text>
                </View>

                <View
                  style={{
                    width: 150,
                    height: 120,
                    flex: 1,
                    backgroundColor: "rgba(251,221,148,0.75)",

                    gap: 15,
                    textAlign: "center",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                >
                  <View style={{ marginTop: 25 }}>
                    <Image
                      source={require("../assets/skill.png")}
                      style={styles.icons}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Skills
                  </Text>
                </View>
              </View>
            </View>
            {/* /////////////////////// */}
          </View>

          {/* <NewOrders productsData={productsData} /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  boxs2: {
    justifyContent: "space-around",
    // borderWidth: 1,
    flexDirection: "row",
    //  width:"80%",
    gap: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  scrollViewContent: {
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    // padding: 5,
    // backgroundColor: "yellow",
  },
  icons: {
    // borderWidth: 1,
    width: 30,
    height: 30,
    marginHorizontal: 5,
    alignItems: "center",
  },

  container: {
    width: "100%",
    height: "100%",
    // padding:5,
    // flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "#fff",
    borderWidth: 1,
    paddingTop: 25,
  },

  Btncontainer: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
    // padding: 30,
    // borderWidth:1
  },
  sliderButton: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgb(255,186,191)",
    backgroundColor: "rgb(255,186,191)",
    height: 40,
    width: 130,
  },
  onDuty: {
    borderColor: "green",
    backgroundColor: "rgb(218,254,189)",
  },
  offDuty: {
    borderColor: "red",
    backgroundColor: "rgb(255,186,191)",
  },
  greensliderText: {
    color: "rgb(83,151,22)",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 9,
    marginLeft: 10,
    // borderWidth: 1,
  },
  redsliderText: {
    color: "rgb(250,3,0)",
    fontSize: 20,
    fontWeight: "bold",
    // marginRight: 5,
    marginLeft: 2,
    //  borderWidth: 1,
  },
});

export default Home;
