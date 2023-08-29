import { Image, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import { ContinueButton } from "../ReuseComponents/ContinueButton"
import { useState } from "react";


export const GarageFormPage = () => {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.MainContainer}>
            <View style={styles.TopHeadingBox}>
                <View>
                    <Text style={styles.HeadTitleText}>Welcome in Greasemonkey</Text>
                </View>
                <View>
                    <Image source={require("../../assets/languageIcon.png")} style={{width:30,height:30}}/>
                </View>
            </View>
            <View>
                <TextInput style={[styles.TextInputMain]} placeholder="Full Name*"/>
            </View>
            <View>
                <TextInput style={[styles.TextInputMain]} placeholder="Garage Name*" />
            </View>
            <View>
                <TextInput style={[styles.TextInputMain]} placeholder="Garage Location*" />
            </View>
            <View>
                <View><TextInput style={[styles.TextInputMain]} placeholder="Pincode*" /></View>
                <View><TextInput style={[styles.TextInputMain]} placeholder="City State*" /></View>
            </View>
            <View style={styles.GstBox}>
                <View>
                    <Text>Do you have active GST no.</Text>
                </View>
                <View>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}/>
                </View>
            </View>
            <View>
                <TextInput style={[styles.TextInputMain]} placeholder="GST No*" />
            </View>
            <View style={styles.ContinueButton}>
                <ContinueButton onPress={() => {
                    navigation.navigate("LanguagePage")
                }} title="Continue" />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    MainContainer:{
        height: "100%",
        backgroundColor : "white",
     },
     TopHeadingBox:{
     display : "flex",
     flexDirection: "row",
     width : "85%",
     marginLeft: 30,
     marginTop: 10,
     justifyContent : "space-between"
     },
     HeadTitleText:{
     fontSize : 15,
     fontWeight : "bold",
     },
    TextInputMain:{
        border: "2px solid grey",
        borderRadius : 5,
        fontSize: 13,
        color: "grey",
        paddingLeft: 13,
        width : "85%",
        margin: "auto",
        marginVertical : 10,
        height: 35,
    },
    GstBox:{
        border: "2px solid grey",
        borderRadius : 5,
        width : "85%",
        height: 45,
        marginHorizontal : 29,
        flexDirection: "row",
        backgroundColor: "#fee191",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical:10,
    },  
    ContinueButton:{
        marginTop: 150,
    }
})