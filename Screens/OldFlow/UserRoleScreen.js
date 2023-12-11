import React, { Component, useState, useEffect } from "react";
import Constants from "expo-constants";
import { Radio, NativeBaseProvider } from "native-base";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {url} from "../../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../theme/style";
import toastConfig from "../../constants/alerts";

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function UserRoleScreen({ navigation, route }) {
  const [user_name, setUserName] = useState("");
  const [role, setRole] = useState(null);
  const [cached_data, setCach] = useState([]);
  const [feilds, setFeilds] = useState([]);
  const [formData, setFormData] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [failed_alert, SetFailedAlert] = React.useState(false);

  useEffect(() => {
   _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const user_name = await AsyncStorage.getItem("user_name");
      const cache_text = await AsyncStorage.getItem("aqar_cache_data");
      setCach(JSON.parse(cache_text));

      setUserName(user_name);
    } catch (error) {
      console.log(error);
    }
  };

  const roles = [
    {
      title : "مالك",
      value : "owner",
    },
    {
      title : "مفوض",
      value : "fff",
    },
    
  ];




  const checkResponse = flag => {
    if (flag == false) {

      Toast.show({
        type: 'erorrToast',
        text1:  'لابد من اكمال جميع البيانات المسبوقة بعلامة *',
        topOffset:80,
        visibilityTime: 2000,
      });

    } else {
      UpdateProfile();
    }
  };

  const UpdateProfile = async flag => {
    const token = await AsyncStorage.getItem("user_token");
    let submitForm = new FormData();
    {
      formData.map(item => {
        submitForm.append(item.field_id, item.input_value);
      });
    }

    setLoading(true);
    fetch(url.base_url + "profile&endpointChild=update", {
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
        if (responseJson.success == true) {
          navigation.replace("PricingPlans");
          confirm_complete();
        } else {
          
          Toast.show({
            type: 'erorrToast',
            text1: responseJson.message,
            topOffset:80,
            visibilityTime: 2000,
          });
         
        }
        setLoading(false);
      });
  };



  return (
    <View style={{ flex: 1, backgroundColor: "#EDECEC" }}>
      <StatusBar backgroundColor="#fe7e25" barStyle="light-content" />
      <View
        style={{
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
          نوع الحساب
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: "#EDECEC" }}>
        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Bold",
              color: "#0341A0",
              fontSize: 15,
              textAlign: "right"
            }}
          >
            عزيزنا العميل , {user_name}
          </Text>
          <Text
            style={{
              fontFamily: "Regular",
              marginLeft: 30,
              color: "grey",
              marginTop: 10
            }}
          >
            لكي يتم نشر اعلاناتك العقارية , يرجي اكمال البيانات التالية
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              marginTop: 20,
              marginLeft: 10,
              fontSize: 14,
              color: "#0341A0",
              textAlign:"right"
            }}
          >
            يرجي تحديد نوع الحساب
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            padding: 20,
            paddingTop: Constants.statusBarHeight
          }}
        >
          <NativeBaseProvider>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              onChange={value => {
                setRole(value);
              }}
            >
              {roles.map(item => {
                return (
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      alignItems: "flex-end",
                      width: "80%"
                    }}
                  >
                    <View style={{ width: "10%" }}>
                      <Radio value={item.value} my={1}>
                        <Text />
                      </Radio>
                    </View>
                    <View style={{ width: "90%" }}>
                      <Text
                        style={{ fontFamily: "Regular", paddingHorizontal: 10,textAlign:"right" }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </Radio.Group>
          </NativeBaseProvider>

          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontFamily: "Bold",
                marginVertical: 20,
                marginLeft: 10,
                fontSize: 14,
                color: "#0341A0",
                textAlign:"right"
              }}
            >
            يرجي اكمال البيانات التالية
            </Text>
          </View>

          <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text
          style={[
            styles.userInputLable,
            {
              textAlign: "right",
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 5,
              alignSelf: "flex-end",
            }
          ]}
        >
          <Text style={{ color: "red", marginLeft: 10 }}>
            * {""}
          </Text>
          رقم الهوية الوطنية
        </Text>
        <TextInput
         // onChangeText={value => PushValue(item.field_id, value)}
          placeholder={"رقم الهوية الوطنية"}
          style={styles.InputText}
          keyboardType="numeric"
        />
      </View>


      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text
          style={[
            styles.userInputLable,
            {
              textAlign: "right",
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 5,
              alignSelf: "flex-end",
            }
          ]}
        >
          <Text style={{ color: "red", marginLeft: 10 }}>
            * {""}
          </Text>
         رقم الوكالة الشرعية
        </Text>
        <TextInput
          //onChangeText={value => PushValue(item.field_id, value)}
          placeholder={"رقم الوكالة الشرعية"}
          style={styles.InputText}
          keyboardType="numeric"
        />
      </View>


      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text
          style={[
            styles.userInputLable,
            {
              textAlign: "right",
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 5,
              alignSelf: "flex-end",
            }
          ]}
        >
          <Text style={{ color: "red", marginLeft: 10 }}>
            * {""}
          </Text>
        رقم المعلن
        </Text>
        <TextInput
         // onChangeText={value => PushValue(item.field_id, value)}
          placeholder={"الرقم الصادر من هيئة العقار"}
          style={styles.InputText}
          keyboardType="numeric"
        />
      </View>

          <TouchableOpacity
           // onPress={() => Validate_form()}
            style={{
              backgroundColor: "#230d33",
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%",
              marginBottom: 10
            }}
          >
            {isLoading == false
              ? <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Regular"
                  }}
                >
                  حفظ
                </Text>
              : <ActivityIndicator size="large" color={"#FFF"} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast config={toastConfig}/>
    </View>
  );
}
