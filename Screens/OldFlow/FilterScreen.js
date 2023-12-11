import React, { Component, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons, Feather, EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../theme/style";
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function FilterScreen({ route, navigation }) {


  const [states, setStates] = useState([]);
  const [cats, setCatigories] = useState([]);

  const [prop_cat, setPropCat] = useState("");
  const [prop_state, setPropState] = useState("");
  const [adv_val, setAdvVal] = useState("");
  const [min_price, setminPrice] = useState("");
  const [max_price, setmaxPrice] = useState("");

  const [isFocus, setIsFocus] = useState(false);

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

  ];


  useEffect(() => {
    _retrieveData();
  }, []);


  const _retrieveData = async () => {
    try {
      const cache_text = await AsyncStorage.getItem("aqar_cache_data");
      const cache = JSON.parse(cache_text);
      const cached_cats = cache.data.cats;
      const cached_states = cache.data.states;
      setCatigories(cached_cats);
      setStates(cached_states);
    }
    catch (error) {
      console.log(error);
    }
  }

  const ApplyFilter = () => {
    if (prop_cat == "" || prop_state == "" || adv_val == "" || min_price == "" || max_price == "") {
      alert("يجب إكمال الخيارات المتاحة");
      return;
    }


    else {
      navigation.navigate("ResultScreen", {
        prop_type: prop_cat,
        adv_type: adv_val,
        prop_state: prop_state,
        min_price: min_price,
        max_price: max_price,
      })
    }
  }
  return (
    <View style={{
      flex: 1
    }}>
      <View
        style={{
          marginBottom: 20,
          paddingHorizontal: 40,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          backgroundColor: "#fe7e25",
          height: 60,
          width: "100%",
          alignItems: "center"
        }}
      >
        <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
          فلتر
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}>
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 10,
            width: "100%",
            justifyContent: "center",
          }}>

          <Text
            style={{
              fontFamily: "Bold",
              textAlign: "right",
              marginBottom: 5,
              color: "#fe7e25",
              zIndex: 10,
              marginHorizontal: 10,
              marginBottom: 20
            }}
          >
            أختر نوع العقار
          </Text>
          <Dropdown
            style={[styles.dropdown,
            isFocus == "type" && { borderColor: 'blue' }]}
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
            placeholder={isFocus !== "type" ? 'أختر نوع العقار ' : '...'}
            //  value={prop_cat}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setPropCat(item.type_id);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <Feather
                style={styles.icon}
                color={isFocus == "type" ? 'blue' : 'grey'}
                name="home" size={20} />
            )}
          />
        </View>





        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
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
              marginHorizontal: 10,
              marginBottom: 20
            }}
          >
            أختر  المنطقة
          </Text>
          <Dropdown
            style={[styles.dropdown,
            isFocus == "type" && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
            data={states}
            //search
            maxHeight={300}
            labelField="name"
            valueField="state_id"
            placeholder={isFocus !== "type" ? 'أختر المنطقة المطلوبة' : '...'}
            //  value={prop_cat}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setPropState(item.name);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (

              <EvilIcons
                style={styles.icon}
                color={isFocus == "type" ? 'blue' : 'grey'}
                name="location" size={20} />

            )}
          />
        </View>



        <View
          style={{
            paddingHorizontal: 20,
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
            style={[styles.dropdown,
            isFocus == "adv_type" && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
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

        <View
          style={{
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >

          <View
            style={{
              width: "100%",
              marginTop: 20,
              marginBottom: 20,
              flexDirection: "row-reverse",
              paddingHorizontal: 50
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: "#fe7e25",
                width: "100%",
                textAlign: "right"
              }}
            >
              أختر الحد الأدنى والأعلى للسعر
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around"
            }}
          >
            <View style={{ width: "35%" }}>
              <TextInput
                placeholder="من"
                keyboardType="numeric"
                onChangeText={price => setminPrice(price)}
                style={{
                  height: 40,
                  marginBottom: 20,
                  paddingHorizontal: 10,
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  width: "100%",
                  fontFamily: "Regular",
                  textAlign: "right",
                  borderColor: "#DDDDDD",
                  borderWidth: 1.5
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
              <Text style={{ fontFamily: "Bold", color: "#fe7e25" }}>:</Text>
            </View>
            <View style={{ width: "35%" }}>
              <TextInput
                placeholder="الي"
                placeholderStyle={{ textAlign: "center" }}
                keyboardType="numeric"
                onChangeText={price => setmaxPrice(price)}
                style={{
                  height: 40,
                  marginBottom: 20,
                  backgroundColor: "#FFF",
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: "100%",
                  fontFamily: "Regular",
                  textAlign: "right",
                  borderColor: "#DDDDDD",
                  borderWidth: 1.5
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => ApplyFilter()}
            style={{
              backgroundColor: "#230d33",
              padding: 10,
              borderRadius: 10,
              width: "80%",
              marginBottom: 30
            }}
          >
            <Text style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Bold",

            }}>
              بحث
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}