import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import { ContinueButton } from '../ReuseComponents/ContinueButton';


export const StartPage = ({navigation}) => {
  return (
    <View style={styles.MainContainer}>
        <View style={styles.MechnicImageBox}>
            <Image source={require("../../assets/mechnic.png")} style={styles.MechnicImage} resizeMode='contain' alt='Mechnic-image'/>
        </View>
        <View style={styles.TitleTextBox}>
            <Text style={styles.TitleText}>Hello Partner!!</Text>
        </View>
        <View style={styles.TitleTextBox}>
            <Text style={styles.subTitleText}>LEARN, EARN & GROW WITH US</Text>
        </View>
        <View style={styles.TitleTextBox}>
            <Text style={styles.smallText}>Get weekly or monthly payment directly in you bank</Text>
        </View>
        <View style={styles.ContinueBtn}>
         <ContinueButton onPress={()=>{
             navigation.navigate("LanguagePage")            
         }} title="Continue"/>
        </View>
      
     </View>
  );
}


const styles = StyleSheet.create({
    MainContainer:{
       height: "100%",
       backgroundColor : "white",
    },
    MechnicImageBox:{
        marginVertical : 9,
    },
    TitleTextBox:{
      marginVertical : 7,
    },
    ContinueBtn:{
      marginTop: 15,
    },
    MechnicImage:{
        width: 200,
        height: 250,
        margin: "auto",
        marginTop: 15
    },
    TitleText:{
       fontSize: 28,
       fontWeight: "bold",
       margin: "auto"
    },
    subTitleText:{
        fontSize: 23,
        fontWeight: "bold",
        margin: "auto"
    },
    smallText:{
        fontSize: 14,
        color: "grey",
        fontWeight: 700,
        margin: "auto"
    },

})