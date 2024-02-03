import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { url } from "../../constants/constants";
import OtpInput from "../../components/otp_input";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from 'react-redux';
import toastConfig from "../../components/Toast";
import CountDown from "react-native-countdown-component";
import Constants from 'expo-constants';

const OtpScreen = ({ route, navigation }) => {

  const user_info = useSelector(state => state.userReducer.user);

  const { phone, code, action } = route.params;
  const [resend_loading, setResendLoading] = useState(false);
  const [resend_status, setResendStatus] = useState(true);

  const resend_code = async () => {
    setResendLoading(true);
    setTimeout(() => {
      setResendLoading(false);
      setResendStatus(false);
    }, 3000);
  };

  const handleOtpComplete = (otp) => {
    if (otp == code) {
      if (action == 'signup') {
        navigation.replace("SignUpScreen", {
          phone: phone
        });
      }
      else if (action == 'signin') {
        if (user_info == null || user_info == "" || user_info == undefined) {
          navigation.replace("UserFlow");
        }

        else {
          const user = JSON.parse(user_info);

          if (user.user_type == "client") {
            //alert("Client");
            navigation.replace("ClientFlow");
          }

          else if (user.user_type == "user") {
            //alert("User");
            navigation.replace("UserFlow");
          }
        }


      }
    }
    else {
      Toast.show({
        type: "erorrToast",
        text1: "هناك خطأ , الرجاء التأكد من كود التفعيل ",
        bottomOffset: 80,
        visibilityTime: 2000
      });
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
      behavior={Platform.OS === "ios" ? "padding" : null}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", paddingBottom: 400 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            paddingHorizontal: 40,
            paddingTop: Constants.statusBarHeight
          }}
        >
          <Image
            source={require("./../../assets/otp.png")}
            style={{ width: 200, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: "Bold",
              marginTop: 30,
              fontSize: 20
            }}
          >
            كود التفعيل
          </Text>

          <Text
            style={{
              color: "grey",
              fontSize: 20,
              fontFamily: "Regular",
              marginTop: 10
            }}
          >
            تم إرسال رمز التفعيل إلي رقم هاتف
          </Text>

          <Text
            style={{
              color: "#000",
              fontSize: 20,
              fontFamily: "Bold",
              marginTop: 10
            }}
          >
            {phone}
          </Text>

          <Text
            style={{
              color: "grey",
              fontSize: 20,
              fontFamily: "Regular",
              marginTop: 10
            }}
          >
            أدخل رمز التفعيل المكون من 4 أرقام
          </Text>


          <View style={{ marginTop: 10 }}>
            <OtpInput onComplete={handleOtpComplete} />
          </View>


        </View>
        <View
          style={{
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flexGrow: 1,
            backgroundColor: "#FFF",
            alignItems: "center",
            justifyContent: "center"
          }}
        >

          {resend_status == true
            ? <TouchableOpacity
              onPress={() => resend_code()}
              style={{
                backgroundColor: "#fe7e25",
                paddingVertical: 15,
                borderRadius: 10,
                width: "80%",
                marginBottom: 10
              }}
            >
              {resend_loading == false
                ? <Text
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily: "Regular"
                  }}
                >
                  اعادة ارسال الرمز
                </Text>
                : <ActivityIndicator size={30} color="#FFF" />}
            </TouchableOpacity>
            : <TouchableOpacity
              style={{
                backgroundColor: "#FFF",
                borderWidth: 1.5,
                borderColor: "#fe7e25",
                paddingVertical: 15,
                borderRadius: 10,
                width: "80%",
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  color: "#fe7e25",
                  textAlign: "center",
                  fontFamily: "Regular"
                }}
              >
                اعادة ارسال الرمز
              </Text>
            </TouchableOpacity>}

          <View>
            {resend_status == true
              ? <View />
              : <CountDown
                size={15}
                until={50}
                onFinish={() => setResendStatus(true)}
                digitStyle={{ backgroundColor: "#FFF" }}
                digitTxtStyle={{ color: "#230D33" }}
                timeLabelStyle={{ color: "red", fontWeight: "Regular" }}
                separatorStyle={{ color: "#230D33" }}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />}
          </View>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />

    </KeyboardAvoidingView>
  );
};
export default OtpScreen;
