import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartPage = () => {
  const [serviceP_Data, setserviceP_Data] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [jdata, setJData] = useState([]);

  useEffect(() => {
    const getAllJobCarts = () => {
      fetch("https://bike-server1.onrender.com/api/jobcart/jobcarts", {})
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

    getAllJobCarts();
  }, []);

  const navigation = useNavigation();

  const HandleOrderComplete = () => {
    alert("Your Order is Completed");
  };

  const commonIds = jdata.filter((j) =>
    productsData && productsData.length > 0
      ? productsData.some((product) => j.p_id === product.p_id)
      : false
  );

  console.log("CartPage:", CartPage);

  ///////////////////////
  const fetchCustomerData = async () => {
    try {
      if (serviceP_Data && serviceP_Data._id) {
        const response = await fetch(
          `https://bike-server1.onrender.com/api/subusers/${serviceP_Data._id}`
        );
        const data = await response.json();
        setProductsData(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    }
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
  }, []);

  useEffect(() => {
    if (serviceP_Data) {
      fetchCustomerData();
    }
  }, [serviceP_Data]);

  return (
    <ImageBackground
      source={require("../assets/backImg2.png")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      {/* <Text>ghfjhgdjhd</Text> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {commonIds.map((item) => (
            <View key={item._id} style={styles.itemContainer}>
              <View>
                <Text style={styles.text}>{item.p_id}</Text>
                <Text style={styles.text}>{item.product_name}</Text>
                <Text style={styles.text}>{item.first_name}</Text>
                <Text style={styles.text}>{item.email}</Text>
                <Text style={styles.text}>{item.location}</Text>
                <Text style={styles.text}>{item.total}</Text>
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

const styles = StyleSheet.create({
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
    backgroundColor: "rgb(254, 204, 72)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default CartPage;
