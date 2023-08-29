import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import CheckBox from "react-native-check-box";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewJobcart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  // console.log("product:..::", product);

  const [isChecked, setIsChecked] = useState({
    Mileage_Problem: false,
    Vibration_Problem: false,
    ChainBelt_Problem: false,
    Starting_Problem: false,
    Enginenoise_Problem: false,
    Handle_Adjustment: false,
    Mirror_Adjustment: false,
    HeadLight_Focus_Problem: false,
    Break_Adjustment: false,
    Choke_Problem: false,
    Self_Problem: false,
    Horn_Problem: false,
    HeadLight_Problem: false,
    Battery_Problem: false,
    Speedometer_Problem: false,
    Engine_Oil_Change: false,
    Clutch_Adj: false,
    Oil_Filter_Replacement: false,
    AirFilter_Replacement: false,
    Aparkplug_Replacement: false,
    All_Fasteners_Tight: false,
  });

  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const [formData, setFormData] = useState({
    km_reading: "",
    fuel_level: "",
    other_note: "",
  });

  const selectedOptions = Object.keys(isChecked).filter(
    (key) => isChecked[key]
  );
  // console.log("SelectedOptions1111111::", selectedOptions);

  const [serviceProIdData, setserviceProIdData] = useState("");
  //  console.log("serviceProIdData>>>>>>:", serviceProIdData);

  const serviceProInfo = [
    serviceProIdData._id,
    serviceProIdData.email,
    serviceProIdData.phone,
  ];

  // console.log("serviceProInfo111111111::::", serviceProInfo);
  const newJobcartData = {
    serviceProInfo: {
      id: serviceProIdData._id,
      email: serviceProIdData.email,
      phone: serviceProIdData.phone,
    },
    // serviceProInfo:serviceProInfo,
    customerInfo: product,
    km_reading: formData.km_reading,
    fuel_level: formData.fuel_level,
    servicing: selectedOptions,
    other_note: formData.other_note,
  };

  console.log("newJobcartData..,.,.,", newJobcartData);

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(
        "https://bike-server1.onrender.com/api/newjobcart/create",
        newJobcartData
      )
      .then((response) => {
        console.log(response.data);
        alert("New Job_Cart Generated");
        // navigation.navigate("JobCartList")
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
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
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
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
          <Text style={styles.topYellowBoxText}>Job Card</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("JobCartList", { product })}
          >
            <Image
              source={require("../assets/next.png")}
              style={styles.previousIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* /////<<<<<<< */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "30%", fontSize: 17, fontWeight: "bold" }}>
              KM Reading
            </Text>
            <TextInput
              style={styles.input}
              value={formData.km_reading}
              // placeholder="km_reading"
              onChangeText={(value) => handleChange("km_reading", value)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "30%", fontSize: 17, fontWeight: "bold" }}>
              Fuel Level
            </Text>
            <TextInput
              style={styles.input}
              value={formData.fuel_level}
              // placeholder="fuel_level"
              onChangeText={(value) => handleChange("fuel_level", value)}
            />
          </View>

          <View style={styles.middleBox}>
            <View style={styles.middleSub_Box}>
              <View style={styles.middlesubLeft}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Engine</Text>
              </View>
              <View style={styles.middlesubRight}>
                <CheckBox
                  isChecked={isChecked.Mileage_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Mileage_Problem: !isChecked.Mileage_Problem,
                    });
                  }}
                  leftText="Mileage Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />

                <CheckBox
                  isChecked={isChecked.Vibration_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Vibration_Problem: !isChecked.Vibration_Problem,
                    });
                  }}
                  leftText="Vibration Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.ChainBelt_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      ChainBelt_Problem: !isChecked.ChainBelt_Problem,
                    });
                  }}
                  leftText="Chain / Belt Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Starting_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Starting_Problem: !isChecked.Starting_Problem,
                    });
                  }}
                  leftText="Starting Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Enginenoise_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Enginenoise_Problem: !isChecked.Enginenoise_Problem,
                    });
                  }}
                  leftText="Engin Noise Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
              </View>
            </View>

            <View style={styles.middleSub_Box}>
              <View style={styles.middlesubLeft}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Frame</Text>
              </View>
              <View style={styles.middlesubRight}>
                <CheckBox
                  isChecked={isChecked.Handle_Adjustment}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Handle_Adjustment: !isChecked.Handle_Adjustment,
                    });
                  }}
                  leftText="Handle Adjustment"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />

                <CheckBox
                  isChecked={isChecked.Mirror_Adjustment}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Mirror_Adjustment: !isChecked.Mirror_Adjustment,
                    });
                  }}
                  leftText="Mirror_Adjustment"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.HeadLight_Focus_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      HeadLight_Focus_Problem:
                        !isChecked.HeadLight_Focus_Problem,
                    });
                  }}
                  leftText="HeadLight_Focus_Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Break_Adjustment}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Break_Adjustment: !isChecked.Break_Adjustment,
                    });
                  }}
                  leftText="Break_Adjustment"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Choke_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Choke_Problem: !isChecked.Choke_Problem,
                    });
                  }}
                  leftText="Choke_Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
              </View>
            </View>

            <View style={styles.middleSub_Box}>
              <View style={styles.middlesubLeft}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Electrical
                </Text>
              </View>
              <View style={styles.middlesubRight}>
                <CheckBox
                  isChecked={isChecked.Self_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Self_Problem: !isChecked.Self_Problem,
                    });
                  }}
                  leftText="Self_Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />

                <CheckBox
                  isChecked={isChecked.Horn_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Horn_Problem: !isChecked.Horn_Problem,
                    });
                  }}
                  leftText="Horn_Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.HeadLight_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      HeadLight_Problem: !isChecked.HeadLight_Problem,
                    });
                  }}
                  leftText="HeadLight_Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Battery_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Battery_Problem: !isChecked.Battery_Problem,
                    });
                  }}
                  leftText="Battery_Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Speedometer_Problem}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Speedometer_Problem: !isChecked.Speedometer_Problem,
                    });
                  }}
                  leftText="Speedometer_Problem"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
              </View>
            </View>

            <View style={styles.middleSub_Box}>
              <View style={styles.middlesubLeft}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Regular Customer Request
                </Text>
              </View>
              <View style={styles.middlesubRight}>
                <CheckBox
                  isChecked={isChecked.Engine_Oil_Change}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Engine_Oil_Change: !isChecked.Engine_Oil_Change,
                    });
                  }}
                  leftText="Engine_Oil_Change"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />

                <CheckBox
                  isChecked={isChecked.Clutch_Adj}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Clutch_Adj: !isChecked.Clutch_Adj,
                    });
                  }}
                  leftText="Clutch_Adj"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Oil_Filter_Replacement}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Oil_Filter_Replacement: !isChecked.Oil_Filter_Replacement,
                    });
                  }}
                  leftText="Oil_Filter_Replacement"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.AirFilter_Replacement}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      AirFilter_Replacement: !isChecked.AirFilter_Replacement,
                    });
                  }}
                  leftText="AirFilter_Replacement"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.Aparkplug_Replacement}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      Aparkplug_Replacement: !isChecked.Aparkplug_Replacement,
                    });
                  }}
                  leftText="Aparkplug_Replacement"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
                <CheckBox
                  isChecked={isChecked.All_Fasteners_Tight}
                  onClick={() => {
                    setIsChecked({
                      ...isChecked,
                      All_Fasteners_Tight: !isChecked.All_Fasteners_Tight,
                    });
                  }}
                  leftText="All Fasteners Tight"
                  leftTextStyle={{
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                  uncheckedCheckBoxColor="black"
                  checkedCheckBoxColor="green"
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "30%", fontSize: 15, fontWeight: "bold" }}>
              Other Note
            </Text>
            <TextInput
              style={styles.input}
              value={formData.other_note}
              // placeholder="other_note"
              onChangeText={(value) => handleChange("other_note", value)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.button}>
        <TouchableOpacity onPress={handleSubmit}>
          {isLoading ? (
            <Text style={styles.buttonText}>Uploading...</Text>
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
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
  buttonText: {
    fontSize: 27,
    // fontWeight: "bold",
    color: "black",
  },
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
    // borderWidth: 3,
    borderRadius: 15,
    // marginTop: 30,
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 15,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: "rgba(265, 238, 107 , 0.5)",
  },
  middleBox: {
    borderWidth: 1,
    margin: 5,
    // borderColor: "red",
  },
  middleSub_Box: {
    borderWidth: 0.5,
    // borderColor: "blue",
    flexDirection: "row",
  },
  middlesubLeft: {
    borderEndWidth: 1,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  middlesubRight: {
    // borderWidth: 1,
    width: "66%",
    paddingLeft: 5,
  },
  input: {
    // textAlign: "right",
    // borderWidth: 1,
    flex: 1,
    // textDecorationLine:"underline",
    borderBottomWidth: 1,
  },
});

export default NewJobcart;
