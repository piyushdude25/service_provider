import React from 'react';
import { View,StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ContinueButton } from '../ReuseComponents/ContinueButton';

export default function OtpPage({ navigation }) {
  return (
    <View style={styles.MainContainer}>
      <View>
        <Image source={require("../../assets/languageIcon.png")} style={styles.languageIcon}/>
      </View>
      <View>
        <Image source={require("../../assets/mobileMan.png")} style={styles.mobileManBox} resizeMode="stretch" />
      </View>
      <View>
        <Text style={styles.OTPNameText}>OTP send Sucessfully</Text>
      </View>
      <View style={{flexDirection:"row", paddingLeft: 150}}>
        <Text style={styles.PhoneText}>9125464764</Text>
         <Image source={require("../../assets/editIcon.png")} style={{width:10,height:10,marginLeft:5,marginTop:5}}></Image>
      </View>
      <View style={styles.OtpBox}>
        <View><TextInput placeholder='OTP' style={styles.inputBox} /></View>
        <View>
          <TouchableOpacity>
            <Text style={styles.verifyBtn}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.ResendText}>Resend OTP | OTP will expire within 00:00</Text>
      </View>
      <View style={styles.ContinueButton}>
        <ContinueButton onPress={() => {
          navigation.navigate("GarageFormPage")
        }} title="Continue" />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "white",
    height: "100%"
  },
  languageIcon:{
    width:30,
    height:30,
    marginLeft: 350,
    marginTop:10,
  },
  mobileManBox:{
   width : "80%",
   margin : "auto",
   height: 250,
   marginTop: 40,
  }, 
  OtpBox:{
    display: "flex",
    flexDirection: "row",
    justifyContent : "center",   
    marginTop: 20,
    gap: 10,
  },
  inputBox : {
    border: "2px solid black", 
    width: 100, 
    height: 35,
    borderRadius: 5,
    marginLeft : -30,
    fontSize: 15,
    color : "grey",
    paddingLeft: 10,
  },
  verifyBtn: {
     backgroundColor : "#fec228",
     width : 60,
     textAlign : 'center',
     paddingTop : 5,
     fontSize : 14,
     fontWeight : 500,
     borderRadius : 5,
     height :35,
  },
  ContinueButton: {
    marginVertical: 10,
  },
  OTPNameText:{
    marginTop: 80,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  PhoneText: {
    fontSize : 13,
    fontWeight : 500,
    textAlign : "center"
  },
  ResendText:{
    margin: "auto",
    marginVertical: 10,
    fontSize : 12,
    fontWeight : 500,
  }

})