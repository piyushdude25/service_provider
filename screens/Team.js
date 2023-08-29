import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import Loader from "./Loader";

const Team = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceProIdData, setserviceProIdData] = useState("");
  const [myTeamData, setmyTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("myTeamData:", myTeamData);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = async () => {
    const team_member_Data = {
      name,
      phone,
    };

    try {
      setIsLoading(true);

      if (serviceProIdData && serviceProIdData._id) {
        const response = await axios.post(
          `https://bike-server1.onrender.com/api/myteam/register/${serviceProIdData._id}`,
          team_member_Data
        );
        Alert.alert("Team Member Added");
        setIsLoading(false);
      } else {
        Alert.alert("Service pro ID not found");
        console.log("Service pro ID not found");
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);

      Alert.alert(
        "Oops! Something went wrong. Please check your credentials and try again."
      );
    }
    setName("");
    setPhone("");
    setIsFormVisible(!isFormVisible);
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
    setRefreshing(false);
  };

  useEffect(() => {
    getDataFromStorage();
    fetchmyTeamData();
  }, []);
  useEffect(() => {
    fetchmyTeamData();
  }, [serviceProIdData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchmyTeamData();
  };

  const handleDelete = async (memberId) => {
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
    <>
      {refreshing ? (
        <View
          style={{
            marginTop: 300,
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              height: 100,
              width: 100,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <ActivityIndicator size="large" color="red" />
            <Text style={styles.btntext}>Loading...</Text>
          </View>
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
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
                  <Text style={styles.topYellowBoxText}>Team</Text>
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
            <View style={styles.container}>
              <View
                style={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                  padding: 5,
                  marginTop: 5,
                }}
              >
                <View style={styles.addTeam}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Team member's reigstration
                  </Text>
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
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      value={name}
                      onChangeText={setName}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />

                    
                    <TouchableOpacity
                      style={styles.continueButton}
                      onPress={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Text style={styles.btntext}>Updating...</Text>
                      ) : (
                        <Text style={styles.btntext}>Add Member</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>

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
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                          <Image
                            style={styles.allIcon}
                            source={require("../assets/delete.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

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

export default Team;
