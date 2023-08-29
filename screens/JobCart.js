import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

const JobCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
console.log("product:..::", product);

  const [formData, setFormData] = useState({
    product_name: "",
    p_id: "",
    first_name: "",
    email: "",
    location: "",
    total: "",
  });

  console.log("formData:::", formData);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      product_name: product?.product_name || "",
      p_id: product?.p_id?.toString() || "",
      location: product?.location || "",
      total: product?.total || "",
    }));
  }, [product]);

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(
        "https://bike-server1.onrender.com/api/jobcart/addjobcart",
        formData
      )
      .then((response) => {
        console.log(response.data);
        alert("Job_Cart Generated");
        handleReset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      product_name: "",
      p_id: "",
      first_name: "",
      email: "",
      location: "",
      total: "",
    });
  };

  return (
    <ImageBackground
      source={require("../assets/backImg2.png")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.input}
              value={formData.product_name}
              placeholder="Product Name"
              onChangeText={(value) => handleChange("product_name", value)}
            />
            <TextInput
              style={styles.input}
              value={formData.p_id}
              placeholder="Product ID"
              onChangeText={(value) => handleChange("p_id", value)}
            />
            <TextInput
              style={styles.input}
              value={formData.first_name}
              placeholder="First Name"
              onChangeText={(value) => handleChange("first_name", value)}
            />
            <TextInput
              style={styles.input}
              value={formData.email}
              placeholder="Email"
              onChangeText={(value) => handleChange("email", value)}
            />
            <TextInput
              style={styles.input}
              value={formData.location}
              placeholder="Location"
              onChangeText={(value) => handleChange("location", value)}
            />
            <TextInput
              style={styles.input}
              value={formData.total}
              placeholder="Total"
              onChangeText={(value) => handleChange("total", value)}
            />
          </View>

          <View style={{ width: "100%" }}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {isLoading ? (
                <Text style={styles.buttonText}>Uploading...</Text>
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset Fields</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CartPage")}
            >
              <Text style={styles.buttonText}>Go to Servicing</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    // height: "140%",
  },
  container: {
    borderWidth: 1,
    // flex: 1,
    justifyContent: "space-between",
    paddingTop: 65,
    alignItems: "flex-start",
    padding: 16,
    // backgroundColor: "#fff",
    width: "100%",
  },
  input: {
    // borderWidth: 1,
    width: "auto",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "rgb(254, 204, 72)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default JobCart;
