import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons
} from "@expo/vector-icons";
import styles from "../theme/style";
import CustomHeader from "../components/CustomHeader";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import toastConfig from "../components/Toast";
import { regions, cities, districts } from "./../utils/address";

export default function NewAdd({ route, navigation }) {
  const screenTitle = "إضافة عقار جديد";

  const [isFocus, setIsFocus] = useState(false);
  const [cats, setCatigories] = useState([]);

  const [states, setStates] = useState([]);
  const [filtered_cities, setCities] = useState([]);
  const [filtered_districts, setDistricts] = useState([]);

  const [prop_type, setPropType] = useState("");
  const [prop_price, setPropPrice] = useState("");
  const [prop_state, setPropState] = useState("");
  const [prop_city, setPropCity] = useState("");
  const [prop_district, setPropDistrict] = useState("");
  const [prop_desc, setPropDesc] = useState("");
  const [adv_type, setAdvType] = useState("");

  useEffect(() => {
    _retrieveData();
  }, []);


  const _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      if (token == null) {
        navigation.navigate("SignInScreen");
      } else {
        const cache_text = await AsyncStorage.getItem("aqar_cache_data");
        const cache = JSON.parse(cache_text);
        const cached_cats = cache.data.cats.filter(obj => obj.type_id !== '1');
        const cached_states = cache.data.states;
        setCatigories(cached_cats);
        setStates(cached_states);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const Validate_form = () => {
    if (
      prop_type == "" ||
      prop_price == "" ||
      prop_desc == "" ||
      prop_state == "" ||
      prop_city == ""
    ) {
      Toast.show({
        type: "erorrToast",
        text1: "جميع المدخلات مطلوبة",
        bottomOffset: 80,
        visibilityTime: 2000
      });
    } else {
      const formData = [
        {
          input_key: "adv_type",
          input_value: adv_type
        },
        {
          input_key: "prop_type",
          input_value: prop_type
        },
        {
          input_key: "prop_price",
          input_value: prop_price
        },
        {
          input_key: "prop_state",
          input_value: prop_state
        },
        {
          input_key: "prop_city",
          input_value: prop_city
        },
        {
          input_key: "prop_district",
          input_value: prop_district
        },
        {
          input_key: "prop_desc",
          input_value: prop_desc
        }
      ];
      navigation.navigate("AdBasicInfo", {
        jsonForm: formData
      });
    }
  };



  const getCitiessByRegionId = (id) => {
    setCities(cities.filter(city => city.region_id === id));
  };

  const getDistrictsByCityID = (id) => {
    const s_dist = districts.filter(district => district.city_id === id);
    if (s_dist.length > 0) {
      setDistricts(s_dist);
    }
    else {
      setDistricts([{
        "district_id": 0,
        "name_ar": "لا توجد احياء",
        "name_en": "لا توجد احياء"
      }]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        width: "100%",
      }}
      keyboardVerticalOffset={10}
      behavior={Platform.OS === "ios" ? "padding" : null}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", backgroundColor: "#f8f8f8" }}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              borderBottomColor: "#fe7e25",
              borderBottomWidth: 10,
              alignItems: "center",
              marginVertical: 20
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Bold",
                fontSize: 25,
                marginBottom: -10,
                paddingHorizontal: 10
              }}
            >
              إضافة عقار جديد
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <TouchableOpacity
              onPress={() => setAdvType("rent")}
              style={{
                height: 50,
                width: "45%",
                borderColor: adv_type == "rent" ? "#fe7e25" : "#DDDDDD",
                borderWidth: 2,
                backgroundColor: "#FFF",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginVertical: 5
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#000",
                  marginHorizontal: 10
                }}
              >
                للإيجار
              </Text>
              <FontAwesome name="home" size={40} color="#fe7e25" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAdvType("buy")}
              style={{
                height: 50,
                width: "45%",
                borderColor: adv_type == "buy" ? "#fe7e25" : "#DDDDDD",
                borderWidth: 2,
                backgroundColor: "#FFF",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#000",
                  marginHorizontal: 10
                }}
              >
                للبيع
              </Text>

              <FontAwesome name="home" size={40} color="#fe7e25" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAdvType("invest")}
              style={{
                height: 50,
                width: "45%",
                borderColor: adv_type == "invest" ? "#fe7e25" : "#DDDDDD",
                borderWidth: 2,
                backgroundColor: "#FFF",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#000",
                  marginHorizontal: 10
                }}
              >
                للاستثمار
              </Text>

              <FontAwesome name="home" size={40} color="#fe7e25" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              marginTop: 10,
              width: "100%"
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "right",
                marginBottom: 5,
                zIndex: 10
              }}
            >
              اختر نوع العقار
            </Text>

            <Dropdown
              style={[
                styles.dropdown,
                isFocus == "prop_type" && { borderColor: "blue" }
              ]}
              itemContainerStyle={{ width: "100%" }}
              placeholderStyle={[styles.placeholderStyle, { textAlign: "right" }]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{ fontFamily: "Regular", fontSize: 12, textAlign: "right" }}
              data={cats}
              search
              searchPlaceholder="ابحث عن نوع العقار"
              maxHeight={300}
              labelField="title"
              valueField="title"
              placeholder={isFocus !== "prop_type" ? "اختر نوع العقار " : "..."}
              //  value={prop_cat}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPropType(item.type_id);
                setIsFocus(false);
              }}
              renderRightIcon={() =>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="home-city"
                  size={24}
                  color="#fe7e25"
                />
              }
              renderLeftIcon={() =>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={30}
                  color="grey"
                />}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              marginTop: 10,
              width: "100%"
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "right",
                marginBottom: 5,
                zIndex: 10
              }}
            >
              أدخل السعر المطلوب
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              backgroundColor: "#FFF",
              borderRadius: 30,
              borderColor: "#DDDDDD",
              borderWidth: 1
            }}
          >
            <View
              style={{
                width: "10%"
              }}
            >

              <Image source={require('./../assets/riyal.png')} style={{
                width: 30,
                height: 30
              }} />
            </View>

            <View
              style={{
                width: "90%",
                alignItems: "center"
              }}
            >
              <TextInput
                onChangeText={value => setPropPrice(value)}
                keyboardType="numeric"
                placeholder=" أدخل السعر المطلوب"
                style={{
                  height: 50,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  width: "100%",
                  fontFamily: "Regular",
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              marginTop: 10,
              width: "100%"
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "right",
                marginBottom: 5,
                zIndex: 10,
                marginHorizontal: 10
              }}
            >
              اختر المنطقة
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={[styles.placeholderStyle, { textAlign: "right" }]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{ fontFamily: "Regular", fontSize: 12, textAlign: "right" }}
              data={regions}
              search
              searchPlaceholder="ابحث عن المنطقه"
              maxHeight={300}
              labelField="name_ar"
              valueField="region_id"
              placeholder={"اختر المنطقة المطلوبة"}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                getCitiessByRegionId(item.region_id);
                setPropState(item.region_id);
              }}
              renderRightIcon={() =>
                <Ionicons
                  style={styles.icon}
                  name="location-sharp"
                  size={24}
                  color="#fe7e25"
                />}
              renderLeftIcon={() =>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={30}
                  color="grey"
                />}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              marginTop: 10,
              width: "100%"
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "right",
                marginBottom: 5,
                zIndex: 10,
                marginHorizontal: 10
              }}
            >
              اختر المدينة
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={[styles.placeholderStyle, { textAlign: "right" }]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{ fontFamily: "Regular", fontSize: 12, textAlign: "right" }}
              data={filtered_cities}
              search
              searchPlaceholder="ابحث عن المدينة"
              maxHeight={300}
              labelField="name_ar"
              valueField="city_id"
              placeholder={"اختر المدينة المطلوبة"}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                getDistrictsByCityID(item.city_id);
                setPropCity(item.city_id);
              }}
              renderRightIcon={() =>
                <Ionicons
                  style={styles.icon}
                  name="location-sharp"
                  size={24}
                  color="#fe7e25"
                />}
              renderLeftIcon={() =>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={30}
                  color="grey"
                />}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              marginTop: 10,
              width: "100%"
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "right",
                marginBottom: 5,
                zIndex: 10,
                marginHorizontal: 10
              }}
            >
              اخترالحي
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={[styles.placeholderStyle, { textAlign: "right" }]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{ fontFamily: "Regular", fontSize: 12, textAlign: "right" }}
              data={filtered_districts}
              search
              searchPlaceholder="ابحث عن الحي"
              maxHeight={300}
              labelField="name_ar"
              valueField="district_id"
              placeholder={"اختر الحي"}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPropDistrict(item.name);
              }}
              renderRightIcon={() =>
                <Ionicons
                  style={styles.icon}
                  name="location-sharp"
                  size={24}
                  color="#fe7e25"
                />}
              renderLeftIcon={() =>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={30}
                  color="grey"
                />}
            />
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              marginVertical: 10,
              width: "100%"
            }}
          >
            <View
              style={{
                backgroundColor: "#FFF",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                width: 30,
                borderRadius: 15
              }}
            >
              <SimpleLineIcons name="notebook" size={24} color="#fe7e25" />
            </View>
            <Text
              style={{
                fontFamily: "Bold"
              }}
            >
              وصف العقار
            </Text>
          </View>

          <View
            style={{
              width: "100%"
            }}
          >
            <TextInput
              onChangeText={value => setPropDesc(value)}
              placeholder="أدخل وصف العقار"
              multiline
              style={styles.InputTextArea}
            />
          </View>

          <TouchableOpacity
            onPress={() => Validate_form()}
            style={{
              backgroundColor: "#fe7e25",
              padding: 10,
              borderRadius: 10,
              width: "100%",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "space-around",
              marginVertical: 20
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Bold"
              }}
            >
              التالي
            </Text>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
    </KeyboardAvoidingView>
  );
}