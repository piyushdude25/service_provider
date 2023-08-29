import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AssignOrder from "./AssignOrder";

const ItemDetails = () => {
  const route = useRoute();
  const { product } = route.params;
  console.log("product..", product);

  const navigation = useNavigation();

  const handleJobCart = (product) => {
    // navigation.navigate("JobCart", { product });
    navigation.navigate("NewJobcart", { product });
  };

  const phoneNumber = product.cusNumber; // Replace with the desired phone number

  const handleCallPress = () => {
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Phone calls are not supported on this device`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((error) => console.error(`Error opening phone app: ${error}`));
  };

  return (
    <ImageBackground
      source={require("../assets/backImg2.png")}
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <ScrollView>
        {/* ///  Top Box //>>>>>>> */}
        <View style={styles.topYellowBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/previous.png")}
              style={styles.previousIcon}
            />
          </TouchableOpacity>
          <Text style={styles.topYellowBoxText}>
            {/* <Text style={styles.p_id}> */}#
            {product && product.p_id ? product.p_id.slice(-4) : ""}
            {/* </Text> */}
          </Text>
        </View>
        {/* /////<<<<<<< */}
        <View style={styles.container}>
          <View style={styles.MsubBox}>
            {/* <Text style={styles.p_id}>
            #{product && product.p_id ? product.p_id.slice(-4) : ""}
          </Text> */}
            {/* <Text style={styles.p_id}># {product.p_id}</Text> */}
            <Text style={styles.product_name}>
              {product.category}-{product.product_name}
            </Text>
            <Text style={styles.vehicle_info}>{product.vehicle_info}</Text>

            <View style={styles.box}>
              <View style={styles.subBox}>
                <Text style={[styles.left, styles.leftText]}>
                  Pickup Location:
                </Text>
                <Text style={[styles.right, styles.rightText]}>
                  {product.location}
                </Text>
              </View>
              <View style={styles.subBox}>
                <Text style={[styles.left, styles.leftText]}>Note:</Text>
                <Text style={[styles.right, styles.rightText]}>
                  {product.note}
                </Text>
              </View>

              <View style={styles.subBox}>
                <Text style={[styles.left, styles.leftText]}>Discription:</Text>
                <Text style={[styles.right, styles.rightText]}>
                  {product.discription}
                </Text>
              </View>
              <View style={styles.subBox}>
                <Text style={[styles.left, styles.leftText]}>Status:</Text>
                <Text style={[styles.right, styles.rightText]}>
                  {product.status}
                </Text>
              </View>
              <View style={styles.subBox}>
                <Text style={[styles.left, styles.leftText]}>Total:</Text>
                <Text style={[styles.right, styles.rightText]}>
                  {product.total}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AssignOrder", { product })}
            >
              <View>
                <Text style={styles.text5}>Assign order</Text>
              </View>
            </TouchableOpacity>
            {/* <AssignOrder product={product} /> */}
          </View>

          <TouchableOpacity onPress={handleCallPress} style={styles.callBox}>
            <Text style={{ fontSize: 15 }}>Customer's No.:</Text>

            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {product && product.cusNumber ? product.cusNumber : "xxxxxxxxxx"}
            </Text>
            <Image
              source={require("../assets/phone-call.png")}
              style={styles.previousIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleJobCart(product)}>
            <View>
              <Text style={styles.text5}>Start Visit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    // borderWidth: 1,
  },

  container: {
    flex: 1,
    paddingTop: 25,
    // borderWidth:1,
    width: "100%",
    alignItems: "center",
    padding: 5,
    justifyContent: "space-between",
  },
  ///////  Top Box >>>>>>>
  topYellowBox: {
    backgroundColor: "rgb(248,181,15)",
    // borderWidth: 1,
    paddingTop: 45,
    paddingLeft: 10,
    paddingRight: 40,
    paddingBottom: 15,
    marginTop: -5,
    // marginLeft: -1,
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
  MsubBox: {
    backgroundColor: "rgba(255,228,157,0.8)",
    // paddingTop: 5,
    // borderWidth: 1,
    // borderColor: "red",
    borderRadius: 5,
    width: "auto",
    padding: 10,
    margin: 15,
    marginTop: -20,
  },
  box: {
    borderWidth: 1,
    borderColor: "rgb(113,124,133)",
    margin: 5,
    borderRadius: 3,
  },
  subBox: {
    borderWidth: 1,
    backgroundColor: "#DFD09F",
    borderColor: "rgb(113,124,133)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  callBox: {
    // flex:2,
    borderWidth: 2,
    borderRadius: 5,
    // backgroundColor: "rgb(254,204,72)",
    borderColor: "rgb(254,204,72)",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -10,
    marginTop: 15,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    width: "93%",
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
  p_id: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text5: {
    fontSize: 27,
    // fontWeight: "bold",
  },
  product_name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  vehicle_info: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(113,124,133)",
  },
});

export default ItemDetails;
