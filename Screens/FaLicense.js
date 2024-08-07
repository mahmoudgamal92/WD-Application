import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  TextInput,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign
} from "@expo/vector-icons";
import styles from "./../theme/style";
import CustomHeader from "./../components/CustomHeader";
import { Iconify } from "react-native-iconify";
import Toast from "react-native-toast-message";
import toastConfig from "./../components/Toast";
import { url } from "./../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddImg({ route, navigation }) {
  const [images, setImages] = useState([]);
  const [license_num, setLisenceNumber] = useState("");


  const [loading, setLoading] = useState(false);
  const screenTitle = "رخـصـــة فــــال ";


  const insertReuest = async () => {
    const user_token = await AsyncStorage.getItem("user_token");
    let formData = new FormData();
    formData.append("user_token", user_token);
    formData.append("license", license_num);
    setLoading(true);
    fetch(url.base_url + "fa_license/request.php", {
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
        if (responseJson.success == true) {
          Toast.show({
            type: "successToast",
            text1: 'تم تقديم الطلب بنجاح ',
            bottomOffset: 80,
            visibilityTime: 2000
          });
          setLoading(false);
        } else if (responseJson.success == false) {
          Toast.show({
            type: "erorrToast",
            text1: responseJson.message,
            bottomOffset: 80,
            visibilityTime: 2000
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };



  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.canceled) {
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let img_type = match ? `image/${match[1]}` : `image`;
        setImages([
          ...images,
          {
            uri: localUri,
            name: filename,
            type: img_type
          }
        ]);
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        width: "100%"
      }}
    >
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: "100%",
              marginTop: 20,
              paddingHorizontal: 20,
              alignItems: "center"
            }}
          >
            <View
              style={{
                borderBottomColor: "#fe7e25",
                borderBottomWidth: 10,
                alignItems: "center",
                marginVertical: 20,
                paddingHorizontal: 10
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Bold",
                  fontSize: 25,
                  marginBottom: -10
                }}
              >
                رخصة هيئة العقار
              </Text>
            </View>

            <Text
              style={{
                textAlign: "center",
                fontFamily: "Bold",
                fontSize: 16
              }}
            >
              من فضلك اختر الطريقة لربط رخصة فال الخاصة بك
            </Text>

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
                  رابط أو رقم الرخصة
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <TextInput
                  selectionColor={"#fe7e25"}
                  onChangeText={license_num => setLisenceNumber(license_num)}
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
                    left: 0,
                    position: "absolute",
                    padding: 17,
                    flexDirection: "row-reverse"
                  }}
                >

                  <Iconify icon="iconamoon:scanner-bold" size={20} color={"#fe7e25"} />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                fontFamily: "Bold",
                color: "#000",
                textAlign: "center",
                marginVertical: 10
              }}
            >
              أو
            </Text>


            <TouchableOpacity
              onPress={() => navigation.navigate("FaLicenseScan")}
              style={{
                marginBottom: 20,
                backgroundColor: "#FFF",
                marginTop: 10,
                backgroundColor: "#FFF",
                borderColor: "#fe7e25",
                borderStyle: "dashed",
                borderWidth: 2,
                width: 172,
                height: 122,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Iconify icon="iconamoon:scanner-bold" size={60} color={"#fe7e25"} />
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#000"
                }}
              >
                مسح باركود الرخصة
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => insertReuest()}
            style={{
              backgroundColor: "#fe7e25",
              marginBottom: 40,
              padding: 10,
              borderRadius: 10,
              width: "80%",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "space-around",
              marginTop: 40
            }}
          >
            {loading == false
              ? <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Bold"
                  }}
                >
                  متابعة
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="#FFF"
                />
              </View>
              : <ActivityIndicator size="large" color="#FFF" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
}