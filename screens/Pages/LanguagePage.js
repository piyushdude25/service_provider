import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { ContinueButton } from '../ReuseComponents/ContinueButton';

export default function LanguagePage({navigation}) {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.MechnicImageBox}>
            <Image source={require("../../assets/mechnic.png")} style={styles.MechnicImage} resizeMode='contain' alt='Mechnic-image'/>
      </View>
      <View>
        <Text style={styles.chooseLangText}>Choose You Language</Text>
      </View>
      <View>
        <View style={styles.topLanguageBtn}>
          <TouchableOpacity >
              <Text style={styles.LanguageBtn}>
                English
              </Text>
          </TouchableOpacity>
          <TouchableOpacity>
              <Text style={styles.LanguageBtn}>
                Marathi
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomLanguageBtn}>
        <TouchableOpacity>
            <Text style={styles.LanguageBtn}>
               Hindi
            </Text>
         </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ContinueButton}>
        <ContinueButton onPress={()=>{
          navigation.navigate("PhonePage")
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
    MechnicImage:{
        width: 200,
        height: 250,
        margin: "auto",
        marginTop: 15
    },
    chooseLangText:{
       fontSize: 20,
       fontWeight  : "bold",
       margin: "auto",
       paddingVertical: 15,

    },
    topLanguageBtn:{
      flexDirection: "row",
      margin: "auto",
      gap: 20
    },
    bottomLanguageBtn:{
      marginTop : 20,
    },
    LanguageBtn:{
       backgroundColor: "white",
       color: "black",
       border: "3px solid #fec228",
       borderRadius : 5,
       width:  120,
       height: 50,
       paddingLeft: 25,
       paddingTop: 8,
       fontSize: 20,
       fontWeight: "bold",
       margin: "auto",
       alignItems: 'center'
    },
    ContinueButton:{
      marginTop: 50,
    }
})