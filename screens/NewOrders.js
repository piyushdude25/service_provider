import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const NewOrders = () => {
  const route = useRoute();
  const { productsData } = route.params;

  const navigation = useNavigation();

  const handleDetailsClick = (product) => {
    navigation.navigate("ItemDetails", { product });
  };

  const uniqueItems = productsData.map((item, index) => ({
    ...item,
    key: `${item.p_id}_${index}`, // Generate a unique key using ID and index
  }));

  return (
    <ImageBackground
      source={require("../assets/backImg2.png")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* ///  Top Box //>>>>>>> */}
          <View style={styles.topYellowBox}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/previous.png")}
                style={styles.previousIcon}
              />
            </TouchableOpacity>
            <Text style={styles.topYellowBoxText}>New Order</Text>
          </View>
          {/* /////<<<<<<< */}
          {productsData && productsData.length > 0 ? (
            productsData.map((product) => (
              <View key={product.p_id} style={styles.subBox}>
                <View style={styles.subBox2}>
                  <Text style={styles.text1}>
                    {product.category}-{product.product_name}
                  </Text>
                  <Text style={styles.text2}>
                    #{product && product.p_id ? product.p_id.slice(-4) : ""}
                  </Text>
                  {/* <Text style={styles.text2}>#{product.p_id}</Text> */}
                  <Text style={styles.text3}>{product.vehicle_info}</Text>
                  {/* <View style={styles.locationBox}>
                  <Text style={styles.text4}>{product.location}</Text>
                </View> */}
                  <View style={styles.box}>
                    <View style={styles.subBox3}>
                      <Text style={[styles.left, styles.leftText]}>
                        Location:
                      </Text>
                      <Text style={[styles.right, styles.rightText]}>
                        {product.location}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleDetailsClick(product)}
                    >
                      <View style={styles.viewBtn}>
                        <Text style={styles.text5}>View Order</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No products available</Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: "flex-start",
    //  height: 600,
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 30,
    padding: 5,
  },
  ///////  Top Box >>>>>>>
  topYellowBox: {
    backgroundColor: "rgb(248,181,15)",
    // borderWidth: 1,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 40,
    paddingBottom: 15,
    marginTop: -30,
    marginLeft: -15,
    marginRight: -15,
    marginBottom: 15,
    flexDirection: "row",
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

  text1: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(99,101,105)",
  },
  locationBox: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "E5CE9D",
    borderRadius: 5,
    width: "auto",
    padding: 5,
    margin: "auto",
    marginTop: 5,
  },
  text4: {
    fontSize: 18,
    fontWeight: "bold",
    borderColor: "E5CE9D",
  },
  text5: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subBox2: {
    backgroundColor: "rgba(251,221,148,0.6)",
    paddingTop: 5,
    // borderWidth: 1,
    // borderColor: "red",
    borderRadius: 5,

    padding: 10,
  },
  subBox: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    width: "auto",
  },

  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },

  viewBtn: {
    backgroundColor: "rgba(248,181,15,0.7)",
    width: 120,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
  box: {
    width: "90%",
    backgroundColor: "#DFD09F",
    // borderWidth: 10,
    borderColor: "rgb(113,124,133)",
    margin: 5,
    borderRadius: 3,
  },
  subBox3: {
    borderWidth: 1,
    borderColor: "rgb(113,124,133)",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
  },
  left: {
    width: "40%",
    color: "rgb(113,124,133)",
    fontWeight: "bold",
  },
  right: {
    width: "60%",
    fontWeight: "bold",
  },
  leftText: {
    textAlign: "left",
  },
  rightText: {
    textAlign: "left",
    marginLeft: 5,
  },
});

export default NewOrders;
