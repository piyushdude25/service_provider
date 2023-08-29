import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import Home from "./screens/Home";
import ItemDetails from "./screens/ItemDetails";
import NewOrders from "./screens/NewOrders";
import JobCart from "./screens/JobCart";
import CartPage from "./screens/CartPage";
import Test from "./screens/Test";
import VerificationForm from "./screens/OtpAuth/VerificationForm";
import DashboardScreen from "./screens/OtpAuth/DashboardScreen";
import RegisterScreen2 from "./screens/OtpAuth/RegisterScreen2";
import Login2 from "./screens/Otptest/Login2";
import VerifyOtp2 from "./screens/Otptest/VerifyOtp2";
import { StyleSheet, SafeAreaView } from "react-native";
import { StartPage } from "./screens/Pages/StartPage";
import LanguagePage from "./screens/Pages/LanguagePage";
import { GarageFormPage } from "./screens/Pages/GarageFormPage";
import OtpPage from "./screens/Pages/OtpPage";
import PhonePage from "./screens/Pages/PhonePage";
import MyAccount from "./screens/MyAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewJobcart from "./screens/NewJobcart";
import JobCartList from "./screens/JobCartList";
import { View } from "react-native";
import { Text } from "react-native";
import StartingPage from "./screens/StartingPage";
import WelcomePage from "./screens/WelcomePage";
// import StartingHome from "./StartingHome";
import StartingAuth from "./screens/StartingAuth";
import StartingHome from "./screens/StartingHome";
import Team from "./screens/Team";
import Loader from "./screens/Loader";
import AssignOrder from "./screens/AssignOrder";
// import { useNavigation } from "@react-navigation/native";
// import { ProductProvider } from "./screens/ProductContext";
// import FirebaseApp from "./screens/Authentication/FirebaseApp";

const Stack = createStackNavigator();

const App = () => {
  // const navigation = useNavigation(); // Add this line

  const [servicePIdData, setservicePIdData] = useState(null);
  console.log("servicePIdData........", servicePIdData);

  const getDataFromStorage = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem("service-user");
      if (dataFromStorage !== null) {
        const parsedData = JSON.parse(dataFromStorage);
        setservicePIdData(parsedData);
      }
    } catch (error) {
      console.log("Error retrieving data from storage:", error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  if (servicePIdData === "") {
    return null; // Return a loading state or something while waiting for data
  }
  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {servicePIdData ? (
          <>
            <Stack.Screen name="StartingHome" component={StartingHome} />
          </>
        ) : (
          <Stack.Screen name="StartingAuth" component={StartingAuth} />
        )}
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Team" component={Team} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="NewOrders" component={NewOrders} />
        <Stack.Screen name="JobCart" component={JobCart} />
        <Stack.Screen name="NewJobcart" component={NewJobcart} />
        <Stack.Screen name="JobCartList" component={JobCartList} />
        <Stack.Screen name="CartPage" component={CartPage} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Register" component={RegisterScreen2} />
        <Stack.Screen name="VerificationForm" component={VerificationForm} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login2" component={Login2} />
        <Stack.Screen name="VerifyOtp2" component={VerifyOtp2} />
        <Stack.Screen name="Loader" component={Loader} />
        <Stack.Screen name="AssignOrder" component={AssignOrder} />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // marginTop: 25,
    flex: 1,
  },
});
