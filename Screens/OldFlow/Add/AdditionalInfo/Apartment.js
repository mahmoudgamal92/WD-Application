import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome
} from "@expo/vector-icons";
import styles from "./../../../theme/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from 'react-native-element-dropdown';
import Constants from 'expo-constants';

export default function Apartment({ route, navigation }) {
  const [bedrooms, setBedRooms] = useState("");
  const [bathrooms, setBathRooms] = useState("");
  const [floor, setFloor] = useState("");
  const { prop_owner,adv_title,adv_type,prop_type,prop_price,prop_space,prop_desc} = route.params; 

  const _proceed = () => {
 if (bedrooms== "" || bathrooms == "" || floor == "")
 {
alert("جميع البيانات إجبارية")
 }
 else{
    navigation.navigate("AddMap",
    {
      prop_owner: prop_owner,
      adv_title: adv_title,
      adv_type: adv_type,
      prop_type: prop_type,
      prop_price: prop_price,
      prop_space: prop_space,
      prop_desc: prop_desc,
      bedrooms : bedrooms,
      bathrooms : bathrooms,
      floor : floor,
      street_width : "",
      meter_price : "",
      prop_front : "",
      
    });
 }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        width: "100%"
      }}
    >
      <View
        style={{
          paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight * 1.2 : Constants.statusBarHeight * 0.4,
          paddingHorizontal: 20,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          backgroundColor: "#fe7e25",
          alignItems: "center",
          height: 60,
          width: "100%"
        }}
      >
        <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
         بيانات إضافية تخص الشقة
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}

        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"

        }}
      >



        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={styles.InputLabel}>
           عدد غرف النوم 
          </Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <View style={{ width: "80%" }}>
              <TextInput
                onChangeText={value => setBedRooms(value)}
                placeholder="أدخل عدد غرف النوم "
                keyboardType="number-pad"
                style={[styles.InputText, {
                  borderRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10
                }]}
              />
            </View>

            <View style={{ width: "20%", alignItems: "center", justifyContent: "center", height: 50, backgroundColor: "#DDDDDD", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
              <FontAwesome name="bed" size={24} color="grey" />
            </View>
          </View>

        </View>



        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={styles.InputLabel}>
          عدد دورات المياة
          </Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <View style={{ width: "80%" }}>
              <TextInput
                onChangeText={value => setBathRooms(value)}
                placeholder="أدخل   عدد دورات المياة "
                keyboardType="number-pad"
                style={[styles.InputText, {
                  borderRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10
                }]}
              />
            </View>

            <View style={{ width: "20%", alignItems: "center", justifyContent: "center", height: 50, backgroundColor: "#DDDDDD", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
            <FontAwesome name="bathtub" size={24} color="grey" />
            </View>
          </View>

        </View>



        
        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={styles.InputLabel}>
        الدور 
          </Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <View style={{ width: "80%" }}>
              <TextInput
                onChangeText={value => setFloor(value)}
                placeholder="أدخل الدور الحالي للشقة"
                keyboardType="number-pad"
                style={[styles.InputText, {
                  borderRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10
                }]}
              />
            </View>

            <View style={{ width: "20%", alignItems: "center", justifyContent: "center", height: 50, backgroundColor: "#DDDDDD", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
            <Feather name="home" size={24} color="grey" />
            </View>
          </View>

        </View>

       
        <TouchableOpacity
          onPress={() => _proceed()}
          style={{
            backgroundColor: "#230d33",
            padding: 10,
            borderRadius: 10,
            width: "80%",
            flexDirection: "row-reverse",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 40
          }}
        >
    
            <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Bold"
                }}
              >
                التالي
              </Text>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="#FFF"
              />
            </View>
       
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const innserstyle = StyleSheet.create({
  dropdown: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily: "Regular",
    width: "100%",
    borderColor: "#DDDDDD",
    borderWidth: 1


  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    fontFamily: "Regular",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Regular"
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: "Regular",
    marginHorizontal: 10,
    textAlign: "right"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "Regular"
  },
  btnText: {
    fontSize: 20,
    color: "#FFF",
    fontFamily: "Bold"
  },
  headline: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Bold"
  },
});