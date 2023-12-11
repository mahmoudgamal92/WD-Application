import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import {url} from "../../constants/constants";
import OtpInput from "../../components/otp_input";
import Toast from "react-native-toast-message";

import toastConfig from "../../components/Toast";
import CountDown from "react-native-countdown-component";

import Constants from 'expo-constants';

const OtpScreen = ({ route, navigation }) => {
  const {phone , code , action} = route.params;
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
      if (otp == code) 
      {
        if(action == 'signup')
        {
          navigation.replace("SignUpScreen",{
            phone : phone
          });
        }
        else if (action == 'signin')
        {
        navigation.replace("AppFlow");
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF"
      }}
    >
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <View style={{ width: "100%", flex: 1 }}>
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
      </View>
      <Toast config={toastConfig} />

    </View>
  );
};
export default OtpScreen;
