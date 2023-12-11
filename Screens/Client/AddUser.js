import React, { Component, useState, useEffect } from "react";
import {
  Entypo,
  AntDesign,
  Ionicons,
  Feather,
  FontAwesome
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { NativeBaseProvider, Select, CheckIcon } from "native-base";
import {url} from "../../constants/constants";

import styles from "../../theme/style";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import toastConfig from "../../constants/alerts";

export default function PersonalInfo({ navigation, route }) {
  const [formData, setFormData] = useState([]);

  const [isLoading, setLoading] = React.useState(false);
  const [loading, handleLoading] = React.useState(false);
  const [feilds, setFeilds] = useState("");

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const cache_text = await AsyncStorage.getItem("aqar_cache_data");
      const cache = JSON.parse(cache_text);
      const feilds = cache.add_agent_fields;
      setFeilds(feilds);
    } catch (error) {
      //console.log(error);
    }
  };

  const PushValue = (id, value) => {
    const obj = formData.find(item => item.field_id === id);
    if (obj === undefined) {
      const new_obj = { field_id: id, input_value: value };
      formData.push(new_obj);
    } else {
      formData.map(item => {
        if (item.field_id === id) {
          item.input_value = value;
        }
      });
    }
    console.log(formData);

  };

  const Validate_form = async () => {
    var x = true;
    for (var i = 0; i < formData.length; i++) {
      if (formData[i].input_value == "") {
        x = false;
        break;
      }
    }
    AddUser(x);
  };


  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }

  const AddUser = async flag => {

    const email = formData.find(item => item.field_id === "aa_email").input_value;
    if (flag == false) {
      Toast.show({
        type: "erorrToast",
        text1: "الرجاء ملئ جميع الحقول",
        topOffset: 80,
        visibilityTime: 2000
      });

    } else {
      if(validateEmail(email) == false){
        Toast.show({
          type: "erorrToast",
          text1: "الرجاء ادخال بريد الكتروني صحيح",
          topOffset: 80,
          visibilityTime: 2000
        });
      }

      else
      {
      const token = await AsyncStorage.getItem("user_token");
      let submitForm = new FormData();
      {
        formData.map(item => {
          submitForm.append(item.field_id, item.input_value);
        });
      }
      setLoading(true);
      fetch(url.base_url + "add-agent", {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + token,
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        },
        body: submitForm
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.data !== undefined) {

            Toast.show({
              type: "successModal",
              text1: " تم اضافة المستخدم بنجاح",
              text2: "سيتم توجيهك الأن لصفحة المستخدمين",
              visibilityTime: 2000
            });
         
            setTimeout(() => {
              navigation.navigate("UsersScreen");
            }, 2000);

            setLoading(false);
          } 
          else {
            Toast.show({
              type: "erorrToast",
              text1: responseJson.message,
              topOffset: 80,
              visibilityTime: 2000
            });
            setLoading(false);
          }
        });
    }
  }
  };

  function renderTextInput({ item }) {
    PushValue(item.field_id, "");
    return (
      <View style={styles.inputContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Feather name="user" size={18} color="#230D33" />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.inputPlaceHolder}>
            {item.label}
          </Text>
          <TextInput
            selectionColor={"grey"}
            onChangeText={value => PushValue(item.field_id, value)}
            placeholder={item.placeholder}
            defaultValue={item.value}
            style={{
              fontFamily: "Regular",
              textAlign: "right",
              paddingBottom: 2
            }}
          />
        </View>
      </View>
    );
  }

  function renderNumberInput({ item }) {
    PushValue(item.field_id, "");
    return (
      <View style={styles.inputContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Feather name="user" size={18} color="#230D33" />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.inputPlaceHolder}>
            {item.label}
          </Text>
          <TextInput
            selectionColor={"grey"}
            keyboardType="numeric"
            onChangeText={value => PushValue(item.field_id, value)}
            placeholder={item.placeholder}
            defaultValue={item.value}
            style={{
              fontFamily: "Regular",
              textAlign: "right",
              paddingBottom: 2
            }}
          />
        </View>
      </View>
    );
  }

  function renderEmailInput({ item }) {
    PushValue(item.field_id, "");
    return (
      <View style={styles.inputContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Feather name="user" size={18} color="#230D33" />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.inputPlaceHolder}>
            {item.label}
          </Text>

          <TextInput
            selectionColor={"grey"}
            keyboardType="email-address"
            onChangeText={value => PushValue(item.field_id, value)}
            placeholder={item.placeholder}
            defaultValue={item.value}
            style={{
              fontFamily: "Regular",
              textAlign: "right",
              paddingBottom: 2
            }}
          />
        </View>
      </View>
    );
  }

  const showConfirmDialog = () => {
    return Alert.alert("خطأ", "لابد من اكمال جميع البيانات", [
      // The "Yes" button
      {
        text: "اغلاق",
        onPress: () => {}
      }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FBFF" }}>
      <NativeBaseProvider>
        <View
          style={{
            marginBottom: 20,
            paddingHorizontal: 20,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            backgroundColor: "#fe7e25",
            alignItems: "center",
            height: 60
          }}
        >
          <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
            اضافة مستخدم
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10
          }}
          data={feilds}
          keyExtractor={item => {
            item.field_id;
          }}
          renderItem={({ item }) => {
            switch (item.type) {
              case "text":
                return renderTextInput({ item });
                break;

              case "number":
                return renderNumberInput({ item });
                break;

              case "password":
                return renderTextInput({ item });
                break;

              case "eamil":
                return renderEmailInput({ item });
                break;
            }
          }}
        />

        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => Validate_form()}
            style={{
              backgroundColor: "#230D33",
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 10,
              width: "60%"
            }}
          >
            {isLoading == false
              ? <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Regular",
                    paddingHorizontal: 50
                  }}
                >
                  اضافة
                </Text>
              : <ActivityIndicator size="large" color={"#FFF"} />}
          </TouchableOpacity>
        </View>
      </NativeBaseProvider>
      <Toast config={toastConfig} />
    </View>
  );
}
