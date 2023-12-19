import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform
} from "react-native";
import { NativeBaseProvider, Checkbox, ScrollView } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import styles from "./../../theme/style";
import * as Progress from "react-native-progress";
import CustomHeader from "./../../components/CustomHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import toastConfig from "../../components/Toast";
import { url } from "../../constants/constants";
export default function AddImg({ route, navigation }) {
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState("");
  const [user_id, setUserID] = useState("");

  const [mortgate, setMortgage] = useState("");
  const [conflict, setConflict] = useState("");
  const [loading, setLoading] = useState(false);

  const { jsonForm } = route.params;
  const screenTitle = "إختر صور العقار";

  let submitForm = new FormData();

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    const user_token = await AsyncStorage.getItem("user_token");
    const user_id = await AsyncStorage.getItem("user_token");
    setUserID(user_id);
  }

  const _prepareJson = async () => {
    const formData = [
      {
        input_key: "user_id",
        input_value: user_id
      },
      {
        input_key: "prop_num",
        input_value: parseInt(Math.random() * 100000000)
      },
      {
        input_key: "featured",
        input_value: featured
      },
      {
        input_key: "mortgate",
        input_value: mortgate
      },
      {
        input_key: "conflict",
        input_value: conflict
      }
    ];



    const concatenatedJson = [...jsonForm, ...formData];
    concatenatedJson.map((item, index) => {
      submitForm.append(item.input_key, item.input_value);
    });
    images.map((item, index) => {
      submitForm.append("images[]", {
        uri: item.uri,
        name: item.name,
        type: item.type
      });
    });

    insertAdd();
  };

  const insertAdd = async () => {
    //setLoading(true);
    fetch("https://bnookholding.com/wd/api/properties/new_insert.php", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-type": "multipart/form-data;",
        "cache-control": "no-cache",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      },
      body: submitForm
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success == true) {
          console.log(responseJson);
          Toast.show({
            type: "successToast",
            text1: "تم انشاء اعلانك بنجاح ",
            bottomOffset: 80,
            visibilityTime: 3000
          });
          setLoading(false);

          setTimeout(() => {
            navigation.navigate("PersonalProperites")
          }, 1000);
        }
        else {
          setLoading(false);
          alert(responseJson.message);
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

  const _removeImg = async src => {
    setImages(images.filter(item => item.uri !== src));
  };

  return (
    <NativeBaseProvider style={{ backgroundColor: "#F9F9F9" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#F9F9F9",
          width: "100%"
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 25,
            left: 20,
            zIndex: 1000
          }}
        >
          <Progress.Pie
            progress={0.75}
            animated={true}
            size={40}
            color="#FFF"
            borderWidth={1.5}
          />
        </View>

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
                  إختر صور العقار
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  marginBottom: 10,
                  flexDirection: "row-reverse",
                  flexWrap: "wrap"
                }}
              >
                {images.map((item, index) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => _removeImg(item.src)}
                        style={{ marginBottom: -20, zIndex: 849849 }}
                      >
                        <Image
                          source={require("./../../assets/cross.png")}
                          style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          marginHorizontal: 5
                        }}
                      />
                    </View>
                  );
                })}
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  onPress={() => _pickImage()}
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
                  <MaterialCommunityIcons
                    name="file-image-plus-outline"
                    size={60}
                    color="#DDDDDD"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                width: "90%",
                paddingHorizontal: 5,
                paddingVertical: 10,
                paddingBottom: 10,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 10,
                marginTop: 10
              }}
            >
              <Checkbox
                onChange={value => setFeatured(value)}
                key={"featured_prop"}
                colorScheme="purple"
                style={{ marginHorizontal: 5 }}
              />

              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#051A3A",
                  zIndex: 10,
                  marginHorizontal: 10
                }}
              >
                هل تريد إضافة هذا العقار كمميز ؟
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                backgroundColor: "#FFF",

                width: "90%",
                paddingHorizontal: 5,
                paddingVertical: 10,
                paddingBottom: 10,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 10,
                marginTop: 10
              }}
            >
              <Checkbox
                onChange={value => setMortgage(value)}
                key={"mortgage"}
                colorScheme="purple"
                style={{ marginHorizontal: 5 }}
              />

              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#051A3A",
                  zIndex: 10,
                  marginHorizontal: 10
                }}
              >
                هل هناك أي رهن أو ما يمنع بيع العقار ؟
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row-reverse",
                backgroundColor: "#FFF",
                alignItems: "center",
                width: "90%",
                paddingHorizontal: 5,
                paddingVertical: 10,
                paddingBottom: 10,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 10,
                marginTop: 10
              }}
            >
              <Checkbox
                onChange={value => setConflict(value)}
                key={"conflict"}
                colorScheme="purple"
                style={{ marginHorizontal: 5 }}
              />

              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#051A3A",
                  zIndex: 10,
                  marginHorizontal: 10
                }}
              >
                هل يوجد أي نزاعات قائمة علي العقار ؟
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row-reverse",
                backgroundColor: "#FFF",

                alignItems: "center",
                width: "90%",
                paddingHorizontal: 5,
                paddingVertical: 10,
                paddingBottom: 10,
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 10,
                marginTop: 10
              }}
            >
              <Checkbox
                onChange={value => setConflict(value)}
                key={"conflict"}
                colorScheme="purple"
                style={{ marginHorizontal: 5 }}
              />

              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#051A3A",
                  zIndex: 10,
                  marginHorizontal: 10
                }}
              >
                لابد من الموافة علي شروط الإعلان قبل إضافة هذا الاعلان
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => _prepareJson()}
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
                    انشاء الإعلان
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
    </NativeBaseProvider>
  );
}
