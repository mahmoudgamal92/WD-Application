import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
  Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import {
  Entypo,
  Ionicons,
  AntDesign,
  FontAwesome,
  SimpleLineIcons,
  Octicons,
  MaterialIcons,
  FontAwesome5
} from "@expo/vector-icons";

import DefaultHeader from "./../components/DefaultHeader";
import styles from "./../theme/style";
import { getAdvType, getPropType, getRegionById, getCityById } from './../utils/functions';

import { url } from "./../constants/constants";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import toastConfig from "./../components/Toast";
import { useNavigation } from '@react-navigation/native';
import { regions, cities, districts } from "./../utils/address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

export default function FilterScreen({ route }) {
  const navigation = useNavigation();
  const [filter_cat, setFilterCat] = useState("");
  const [filter_city, setFilterCity] = useState("");
  const [filter_state, setFilterState] = useState("");
  const [min_price, setminPrice] = useState("");
  const [max_price, setMaxPrice] = useState("");
  const [selected_type, setSelectedType] = useState(null);
  const [cats, setCatigories] = useState([]);
  const [filtered_cities, setCities] = useState([]);
  const [filtered_districts, setDistricts] = useState([]);
  const [isFocus, setIsFocus] = useState(false);


  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {

      const cache_text = await AsyncStorage.getItem("aqar_cache_data");
      const cache = JSON.parse(cache_text);
      const cached_cats = cache.data.cats.filter(obj => obj.type_id !== '1');
      setCatigories(cached_cats);
    }
    catch (error) {
      console.log(error);
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



  const _applyFilter = async () => {
    if (filter_cat == "" || filter_state == "") {
      Toast.show({
        type: "erorrToast",
        text1: "يجب إكمال الخيارات المتاحة",
        bottomOffset: 80,
        visibilityTime: 2000
      });
      return;
    }
    else {
      navigation.navigate("ResultScreen", {
        cat: filter_cat,
        adv: selected_type,
        state: filter_state,
        min_price: min_price,
        max_price: max_price,
      });
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fe7e25" />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight * 0.8 : 0,
          backgroundColor: "#fe7e25",
          alignItems: "center",
          width: "100%",
          height: Platform.OS == "ios" ? 130 : 100
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={40} color="#FFF" />
          </TouchableOpacity>

          <Image
            source={require("./../assets/wd_white.png")}
            style={{
              height: 80,
              width: 80,
              resizeMode: "contain"
            }}
          />
        </View>
      </View>
      <View style={styles.rootContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            backgroundColor: "#F8F8F8",
            flex: 1
          }}>

          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: "#F8F8F8",
              flex: 1,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              overflow: "hidden",
              borderColor: "#fe7e25",
            }}
          >

            <Text
              style={{
                fontFamily: "Bold",
                color: "#fe7e25",
                textAlign: "center",
                fontSize: 20
              }}
            >
              فلتر البحث
            </Text>

            <View>
              <Text
                style={{
                  fontFamily: "Bold",
                  marginVertical: 10,
                  textAlign: "right"
                }}
              >
                إختر نوع الإعلان
              </Text>

              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingHorizontal: 10
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedType("buy")}
                  style={{
                    width: "30%",
                    backgroundColor:
                      selected_type == "buy" ? "#fe7e25" : "#FFF",
                    paddingVertical: 10,
                    borderRadius: 30,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#fe7e25"
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: "Bold",
                      color: selected_type == "buy" ? "#FFF" : "#fe7e25"
                    }}
                  >
                    للبيع
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedType("rent")}
                  style={{
                    width: "30%",
                    backgroundColor:
                      selected_type == "rent" ? "#fe7e25" : "#FFF",
                    paddingVertical: 10,
                    borderRadius: 30,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#fe7e25",
                    borderWidth: 1,
                    borderColor: "#fe7e25"
                  }}
                >
                  <Text
                    style={{
                      color: selected_type == "rent" ? "#FFF" : "#fe7e25",
                      fontFamily: "Bold"
                    }}
                  >
                    للأيجار
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedType("invest")}
                  style={{
                    width: "30%",
                    backgroundColor:
                      selected_type == "invest" ? "#fe7e25" : "#FFF",
                    paddingVertical: 10,
                    borderRadius: 30,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#fe7e25"
                  }}
                >
                  <Text
                    style={{
                      color: selected_type == "invest" ? "#FFF" : "#fe7e25",
                      fontFamily: "Bold"
                    }}
                  >
                    للإستثمار
                  </Text>
                </TouchableOpacity>
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
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus == "prop_type" && { borderColor: "blue" }
                ]}
                placeholderStyle={[styles.placeholderStyle, { textAlign: "right" }]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                data={cats}
                //search
                maxHeight={300}
                labelField="title"
                valueField="title"
                placeholder={isFocus !== "prop_type" ? "اختر نوع العقار " : "..."}
                //  value={prop_cat}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setFilterCat(item.type_id);
                  setIsFocus(false);
                }}
                renderRightIcon={() =>
                  <FontAwesome
                    style={styles.icon}
                    name="building"
                    size={24}
                    color="#fe7e25"
                  />}
                renderLeftIcon={() =>
                  <SimpleLineIcons name="arrow-down" size={24} color="grey" />}
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
                  setFilterState(item.region_id);
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
                  setFilterCity(item.city_id);
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
                  setFilterCity(item.district_id);
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

            <View style={{ width: "100%" }}>
              <View
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  marginTop: 10,
                  width: "100%"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bold",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  اختر الحد الأدنى والأعلى للسعر
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >

                <View style={{
                  width: "45%",
                  backgroundColor: "#FFF",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 25,
                  height: 50,
                  borderColor: "#DDDDDD",
                  borderWidth: 1.5,
                  marginBottom: 20,
                  paddingHorizontal: 15
                }}>
                  <Image source={require('./../assets/riyal.png')} style={{
                    width: 30,
                    height: 30
                  }} />

                  <TextInput
                    placeholder="السعر الأدني"
                    keyboardType="numeric"
                    onChangeText={min_price => setminPrice(min_price)}
                    style={{
                      height: 50,
                      width: "80%",
                      fontFamily: "Regular",
                      textAlign: "right",
                      fontSize: 12,
                      paddingHorizontal: 5
                    }}
                  />

                </View>

                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Octicons name="dash" size={30} color="black" />
                </View>

                <View style={{
                  width: "45%",
                  backgroundColor: "#FFF",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 25,
                  height: 50,
                  borderColor: "#DDDDDD",
                  borderWidth: 1.5,
                  marginBottom: 20,
                  paddingHorizontal: 15
                }}>

                  <Image source={require('./../assets/riyal.png')} style={{
                    width: 30,
                    height: 30
                  }} />


                  <TextInput
                    placeholder="السعر الأعلي"
                    keyboardType="numeric"
                    onChangeText={price => setMaxPrice(price)}
                    style={{
                      height: 50,
                      width: "80%",
                      fontFamily: "Regular",
                      textAlign: "right",
                      fontSize: 12,
                      paddingHorizontal: 5
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{ width: "100%", paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={() => _applyFilter()}
                style={{
                  width: "100%",
                  backgroundColor: "#fe7e25",
                  borderRadius: 20,
                  padding: 10,
                  alignItems: "center",

                }}>
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Bold"
                }}>
                  تطبيق الفلتر
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Toast config={toastConfig} />
      </View>
    </View>
  );
}