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
  Feather
} from "@expo/vector-icons";
import styles from "./../../theme/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from 'react-native-element-dropdown';
import Constants from 'expo-constants';

export default function EditAdd({ route, navigation }) {

const {item} = route.params;
  const [title, setTitle] = useState(item.adv_title);
  const [price, setPrice] = useState(item.prop_price);
  const [distance, setDistance] = useState(item.prop_space);
  const [desc, setDesc] = useState(item.prop_desc);
  const [adv_val, setAdvVal] = useState(item.adv_type);
  const [prop_cat, setPropCat] = useState(item.prop_type);

  const [cats, setCatigories] = useState([]);
  const [states, setStates] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");

      if (token == null) {
        navigation.navigate("SignInScreen");
      }
      else {
        const cache_text = await AsyncStorage.getItem("aqar_cache_data");
        const cache = JSON.parse(cache_text);
        const cached_cats = cache.data.cats;
        const cached_states = cache.data.states;
        setCatigories(cached_cats);
        setStates(cached_states);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const adv_type = [
    {
      title: "للبيع",
      value: "for_sale"
    },
    {
      title: "للإيجار",
      value: "for_rent"
    },
    {
      title: "للإستثمار",
      value: "for_invest"
    },
    {
      title: "للتقبيل",
      value: "for_ki"
    },
  ];


  const newAdd = async () => {
    const token = await AsyncStorage.getItem("user_token");

    if (title == "" || price == "" || distance == "" || desc == "") {
      alert("لابد من إكمال جميع البيانات");
    }
    else {
      navigation.navigate("EditMap",
        {
          item : item,
          prop_owner: token,
          adv_title: title,
          adv_type: adv_val,
          prop_type: prop_cat,
          prop_price: price,
          prop_space: distance,
          prop_desc: desc

        });
      setLoading(false);
    }
  };
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
          إضافة عقار جديد
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
            عنوان عرض الإعلان
          </Text>
          <TextInput
            onChangeText={value => setTitle(value)}
            placeholder="أدخل عنوان الإعلان"
            autoCorrect={false}
            style={styles.InputText}
            defaultValue={title}
          />
        </View>


        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={styles.InputLabel}>
            أدخل سعر الإعلان
          </Text>
          <TextInput
            onChangeText={value => setPrice(value)}
            keyboardType="numeric"
            placeholder="أدخل سعر الإعلان"
            autoCorrect={false}
            style={styles.InputText}
            defaultValue={price}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 10,
            marginTop: 10,
            width: "100%"
          }}>

          <Text
            style={{
              fontFamily: "Bold",
              textAlign: "right",
              marginBottom: 5,
              color: "#fe7e25",
              zIndex: 10,
              marginBottom: 20
            }}
          >
            أختر نوع العقار
          </Text>
          <Dropdown
            style={[styles.dropdown,
            isFocus == "prop_type" && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
            data={cats}
            //search
            maxHeight={300}
            labelField="title"
            valueField="title"
            placeholder={isFocus !== "prop_type" ? 'أختر نوع العقار ' : '...'}
            //value={prop_cat}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setPropCat(item.type_id);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <Feather
                style={styles.icon}
                color={isFocus == "prop_type" ? 'blue' : 'grey'}
                name="home" size={20} />
            )}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 10,
            marginTop: 10,
            width: "100%"
          }}>

          <Text
            style={{
              fontFamily: "Bold",
              textAlign: "right",
              marginBottom: 5,
              color: "#fe7e25",
              zIndex: 10,
              marginBottom: 20
            }}>
            أختر نوع الإعلان
          </Text>

          <Dropdown
            style={[innserstyle.dropdown,
            isFocus == "adv_type" && { borderColor: 'blue' }]}
            placeholderStyle={innserstyle.placeholderStyle}
            selectedTextStyle={innserstyle.selectedTextStyle}
            inputSearchStyle={innserstyle.inputSearchStyle}
            iconStyle={innserstyle.iconStyle}
            itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
            data={adv_type}
            //search
            maxHeight={300}
            labelField="title"
            valueField="value"
            value={adv_val}
            placeholder={isFocus !== "adv_type" ? 'أختر نوع الإعلان ' : '...'}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setAdvVal(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <Feather
                style={styles.icon}
                color={isFocus == "adv_type" ? 'blue' : 'grey'}
                name="dollar-sign" size={20} />
            )}
          />
        </View>





        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={styles.InputLabel}>
            المساحة  (متر مربع)
          </Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <View style={{ width: "80%" }}>
              <TextInput
                onChangeText={value => setDistance(value)}
                placeholder="أدخل مساحة العقار"
                keyboardType="number-pad"
                defaultValue={distance}
                style={[styles.InputText, {
                  borderRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10
                }]}
              />
            </View>

            <View style={{ width: "20%", alignItems: "center", justifyContent: "center", height: 50, backgroundColor: "#DDDDDD", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
              <Text style={{ fontFamily: "Bold", color: "grey" }}>
                متر مربع
              </Text>
            </View>
          </View>

        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={styles.InputLabel}>
            وصف العقار
          </Text>
          <TextInput
            onChangeText={value => setDesc(value)}
            placeholder="أدخل وصف العقار"
            multiline
            style={styles.InputTextArea}
            defaultValue={desc}
          />
        </View>

        <TouchableOpacity
          onPress={() => newAdd()}
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
          {loading == true ?
            <ActivityIndicator size={30} color={"#FFF"} />
            :
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
          }
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