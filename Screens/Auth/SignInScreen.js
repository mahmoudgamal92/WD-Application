import React, { Component, useState, useEffect } from "react";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  StatusBar,
  KeyboardAvoidingView,
  Modal,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/constants";
import Toast from "react-native-toast-message";
import toastConfig from "../../components/Toast";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { userSlice } from "../../store/userSlice";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../theme/style";

export default function SignInScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);
  const [phone, setPhone] = useState("");
  const [signup_alert, setSignUpAlert] = useState("");

  const [failed_alert, SetFailedAlert] = React.useState(false);

  const backAction = () => {
    navigation.replace("UserFlow");
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  const Validate_form = async () => {
    if (phone.length < 8) {
      Toast.show({
        type: "erorrToast",
        text1: "أدخل رقم الجوال بشكل صحيح",
        bottomOffset: 80,
        visibilityTime: 2000
      });
    } else {
      LoginUser();
    }
  };

  const LoginUser = () => {
    let formData = new FormData();
    formData.append("phone", phone);
    setLoading(true);
    fetch(url.base_url + "auth/siginin.php", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "cache-control": "no-cache",
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success == true) {
          dispatch(userSlice.actions.setUserInfo(JSON.stringify(responseJson.data)));
          _storeData(
            responseJson.data,
            responseJson.data.user_token,
            responseJson.data.user_name,
            responseJson.data.user_phone,
            responseJson.data.user_type
          );
        }
        else {
          setLoading(false);
          // Toast.show({
          //   type: "erorrToast",
          //   text1: "هناك خطأ , الرجاء التأكد من رقم الجوال",
          //   bottomOffset: 80,
          //   visibilityTime: 2000
          // });

          setSignUpAlert(true);
        }
      });
  };

  const _storeData = async (data, user_token, user_name, user_phone, user_type) => {
    try {
      await AsyncStorage.setItem("user_info", JSON.stringify(data));
      await AsyncStorage.setItem("user_token", user_token);
      await AsyncStorage.setItem("user_name", user_name);
      await AsyncStorage.setItem("user_phone", user_phone);
      await AsyncStorage.setItem("user_type", user_type);
      await AsyncStorage.setItem("log_action", "signin");

      setLoading(false);
      navigation.replace("OtpScreen", {
        phone: phone,
        code: "1234",
        action: "signin"
      });

    }
    catch (error) {

    }
  };


  const _navigate = async () => {
    navigation.replace("OtpScreen", {
      phone: phone,
      code: "1234",
      action: "signup"
    });
  }


  return (
    <KeyboardAvoidingView
      style={{
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        width: "100%",
        backgroundColor: "#FFF"
      }}
      keyboardVerticalOffset={10}
      behavior={Platform.OS === "ios" ? "padding" : null}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" translucent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          paddingHorizontal: 20
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            marginTop: 10
          }}
        >
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 20,
              fontFamily: "Bold"
            }}
          >
            عودة
          </Text>

          <TouchableOpacity onPress={() => navigation.replace("UserFlow")}>
            <MaterialIcons name="arrow-forward-ios" size={35} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              width: 200,
              height: 200
            }}
            source={require("./../../assets/wd_orange.png")}
          />

          <Image
            style={{
              resizeMode: "contain",
              borderRadius: 10,
              width: "100%"
            }}
            source={require("./../../assets/signin.png")}
          />

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{ fontFamily: "Bold", paddingVertical: 10, fontSize: 18 }}
            >
              مرحبا , مرة أخري في
            </Text>

            <Text
              style={{
                fontFamily: "Bold",
                paddingVertical: 10,
                color: "#fe7e25",
                marginHorizontal: 5,
                fontSize: 20
              }}
            >
              ود
            </Text>

            <Image
              source={require("./../../assets/wave.png")}
              style={{ width: 30, height: 25, borderRadius: 5 }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10
            }}
          >
            {/* Mobile Input */}
            <View
              style={{
                flexDirection: "row-reverse",
                borderColor: "#fe7e25",
                width: "100%",
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 2,
                marginVertical: 10,
                height: 58
              }}
            >
              <View
                style={{
                  paddingHorizontal: 10,
                  alignItems: "flex-end",
                  position: "absolute",
                  marginTop: -10
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    fontFamily: "Regular",
                    backgroundColor: "#FFF",
                    textAlign: "right",
                    paddingHorizontal: 10
                  }}
                >
                  رقم الجوال
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row-reverse",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <TextInput
                  selectionColor={"#fe7e25"}
                  onChangeText={phone_number => setPhone(phone_number)}
                  keyboardType="numeric"
                  style={{
                    fontFamily: "Regular",
                    textAlign: "right",
                    paddingBottom: 2,
                    height: "100%",
                    width: "100%",
                    fontSize: 20,
                    fontFamily: "Bold",
                    color: "grey"
                  }}
                />

                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    right: 0,
                    position: "absolute",
                    padding: 17,
                    flexDirection: "row-reverse"
                  }}
                >
                  <AntDesign
                    name="caretdown"
                    size={12}
                    color="grey"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 16,
                      color: "grey",
                      marginHorizontal: 5
                    }}
                  >
                    +966
                  </Text>
                  <Image
                    source={require("./../../assets/ksa.png")}
                    style={{ width: 30, height: 25, borderRadius: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace("SignUpScreen")}
            style={{
              width: "100%",
              marginBottom: 20,
              marginTop: 10,
              flexDirection: "row"
            }}
          />

          <TouchableOpacity
            onPress={() => Validate_form()}
            style={{
              backgroundColor: "#fe7e25",
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
                  fontFamily: "Bold"
                }}
              >
                متابعة
              </Text>
              : <ActivityIndicator size="large" color={"#FFF"} />}
          </TouchableOpacity>
        </View>
        <Toast config={toastConfig} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={signup_alert}
        // onRequestClose={() => {
        //   SetFailedAlert(!failed_alert);
        // }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  backgroundColor: "#fe7e25",
                  width: 50,
                  height: 50,
                  marginTop: -25,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25
                }}
              >
                <Image source={require('./../../assets/wd_white.png')} style={{
                  width: 50,
                  height: 50
                }} />

              </View>

              <TouchableOpacity
                onPress={() => setSignUpAlert(false)}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingHorizontal: 20
                }}
              >
                <FontAwesome name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.modalText}>
                لا يوجد حساب مرتبط بهذا الرقم
              </Text>
              <Text style={styles.modalBody}>
                هل تريد انشاء حساب بهذا الرقم
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#fe7e25",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginVertical: 20,
                  borderRadius: 10,
                  width: "90%"
                }}
                onPress={() => _navigate()}
              >
                <Text style={styles.textStyle}>
                  متابعه
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}