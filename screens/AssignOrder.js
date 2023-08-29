import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

const AssignOrder = () => {
    const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  console.log("product ::::::::::", product);
  const [serviceProIdData, setserviceProIdData] = useState("");
  console.log("serviceProIdData;;;;;mmmcccc:", serviceProIdData);
  const [myTeamData, setmyTeamData] = useState([]);
console.log("myTeamData;;;;;mmmcccc:", myTeamData);


  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
const fetchmyTeamData = async () => {
  try {
    if (serviceProIdData && serviceProIdData._id) {
      const response = await axios.get(
        `https://bike-server1.onrender.com/api/myteam/allmyteams/${serviceProIdData._id}`
      );

      setmyTeamData(response.data);
    } else {
      console.log("Service pro ID not found");
    }
  } catch (error) {
    console.error("Error fetching myTeam data:", error);
  }
//   setRefreshing(false);
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
     fetchmyTeamData()
   }, []);

 const handleRefresh = () => {
//    setRefreshing(true);
   fetchmyTeamData();
 };

 const allotOrder = async (memberId) => {
   setRefreshing(true);
   try {
     const response = await axios.delete(
       `https://bike-server1.onrender.com/api/myteam/${serviceProIdData._id}/member/${memberId}`
     );

     if (response.status === 200) {
       fetchmyTeamData();
       setRefreshing(false);
       Alert.alert("Success", "Team member deleted successfully.");
     } else {
       Alert.alert("Error", "Failed to delete team member.");
     }
   } catch (error) {
     console.error("Error deleting team member:", error);
     Alert.alert("Error", "An error occurred while deleting team member.");
   }
   setRefreshing(false);
 };

  return (
    <View style={{ flex: 1 }}>
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
            <Text style={styles.topYellowBoxText}>Team list</Text>
          </Text>
        </View>
        <View
          style={{
            alignItems: "left",
            flexDirection: "row",
            marginRight: 15,
          }}
        >
          <TouchableOpacity onPress={handleRefresh}>
            <Image
              style={styles.allIcon}
              source={require("../assets/reload.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* /////<<<<<<< */}
      <View
        style={{
          borderWidth: 0.5,
          borderRadius: 10,
          padding: 5,
          marginTop: 5,
          width: "100%",
        }}
      >
        <View style={styles.addTeam}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Team members</Text>
          <TouchableOpacity onPress={toggleFormVisibility}>
            {isFormVisible ? (
              <Image
                style={styles.allIcon}
                source={require("../assets/cancel.png")}
              />
            ) : (
              <Image
                style={styles.allIcon}
                source={require("../assets/down.png")}
              />
            )}
          </TouchableOpacity>
        </View>
        {isFormVisible && (
          <View>
            <View
              style={{
                borderWidth: 0.5,
                borderRadius: 15,
                padding: 10,
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                My Team List:
              </Text>

              <FlatList
                style={{
                  height: 420,
                }}
                data={myTeamData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text>Name:</Text>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>Phone:</Text>
                      <Text>{item.phone}</Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => allotOrder(item.id)}>
                        <Image
                          style={styles.allIcon}
                          source={require("../assets/success.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
        
          </View>
        )}
      </View>
    </View>
  );
};

export default AssignOrder;

const styles = StyleSheet.create({
  ///////  Top Box >>>>>>>
  topYellowBox: {
    backgroundColor: "rgb(248,181,15)",
    // borderWidth: 1,
    paddingTop: 45,
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: 15,
    // marginTop: -5,
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
  addTeam: {
    // borderWidth: 1,
    // borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  allIcon: {
    height: 30,
    width: 30,
    // marginTop: -2,
    // marginRight: 10,
    // borderRadius: 25,
  },
  container: {
    // paddingTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingBottom: 20,
    // borderWidth: 1,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#F8B50F",
    borderRadius: 5,
    paddingVertical: 10,
    // marginTop: 2,
    marginBottom: 10,
    elevation: 5,
  },
  btntext: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  tableCell: {
    flex: 1,
    marginRight: 10,
    borderRightWidth: 1,
  },
  loading: {
    marginTop: 510,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
