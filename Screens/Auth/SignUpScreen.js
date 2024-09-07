import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import styles from "../../theme/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { userSlice } from "../../store/userSlice";
import Constants from "expo-constants";

export default function SignUpScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const { phone } = route.params;
  const [isLoading, setLoading] = React.useState(false);

  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const Validate_form = async () => {
    if (user_name.length === 0 || email.length === 0) {
      alert("لابد من اكمال جميع بياناتك أولا");
    } else {
      let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        alert("البريد الألكتروني الذي أدخلته غير صالح");
      } else {
        SignUp();
      }
    }
  };

  const SignUp = async () => {
    const notification_token = await AsyncStorage.getItem("notification_token");
    let formData = new FormData();
    formData.append("user_name", user_name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("user_type", "user");

    formData.append("notification_token", notification_token);
    setLoading(true);
    fetch(url.base_url + "auth/signup.php", {
      method: "POST",
      headers: {
        Accept: "/",
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.success == true) {
          _storeData(
            responseJson.data,
            responseJson.data.user_token,
            responseJson.data.user_name,
            responseJson.data.phone,
            responseJson.data.user_type
          );
          dispatch(
            userSlice.actions.setUserInfo(JSON.stringify(responseJson.data))
          );
          setLoading(false);
          navigation.replace("NafathVerification");
        } else if (responseJson.success == "pending") {
          alert(responseJson.message);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  const _storeData = async (
    data,
    user_token,
    user_name,
    user_phone,
    user_type
  ) => {
    try {
      await AsyncStorage.setItem("user_info", JSON.stringify(data));
      await AsyncStorage.setItem("user_token", user_token);
      await AsyncStorage.setItem("user_name", user_name);
      await AsyncStorage.setItem("user_phone", user_phone);
      await AsyncStorage.setItem("user_type", user_type);
      await AsyncStorage.setItem("log_action", "signup");
    } catch (error) {
      alert("خطأ في حفظ بيانات تسجيل الدخول");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        width: "100%",
        backgroundColor: "#FFF"
      }}
      keyboardVerticalOffset={10}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <StatusBar backgroundColor="#FFF" barStyle="light-content" translucent />
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20
        }}
        contentContainerStyle={{
          width: "100%",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            alignItems: "center"
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              borderRadius: 10,
              width: "100%",
              height: 200
            }}
            source={require("./../../assets/wd_orange.png")}
          />
          <Text
            style={{ fontFamily: "Bold", marginVertical: 10, fontSize: 15 }}
          >
            من فضلك قم بإكمال بياناتك الشخصية
          </Text>
          <Image
            style={{
              resizeMode: "contain",
              borderRadius: 10,
              width: "100%"
            }}
            source={require("./../../assets/signup.png")}
          />
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
              alignItems: "center"
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
              }}>
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
                  أسم المستخدم
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
                  selectionColor={"grey"}
                  onChangeText={user_name => setUserName(user_name)}
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
              </View>
            </View>

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
                  البريد الإلكتروني
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
                  selectionColor={"grey"}
                  onChangeText={email => setEmail(email)}
                  keyboardType="email-address"
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
              </View>
            </View>
          </View>

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
                إنشاء حساب
              </Text>
              : <ActivityIndicator size="large" color={"#FFF"} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}