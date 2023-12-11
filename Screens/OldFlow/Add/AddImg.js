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
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import styles from "./../../theme/style";
import { url } from "../../constants/constants";
export default function AddImg({ route, navigation }) {
  const [images, setImages] = useState([]);
  const [featured_prop, setFeatured] = useState("");
  const [mortgate, setMortgage] = useState("");
  const [conflict, setConflict] = useState("");
  const {
    prop_owner,
    adv_title,
    adv_type,
    prop_type,
    prop_price,
    prop_space,
    prop_desc,
    bedrooms,
    bathrooms,
    floor,
    street_width,
    meter_price,
    prop_front,
    prop_coords,
    prop_address
  } = route.params;
  const [loading, setLoading] = useState(false);

  const [avatar_img, setAvatarImg] = useState(
    "https://bnookholding.com/img/img_avatar.png"
  );

  const insertAdd = async () => {
    let formData = new FormData();
    formData.append("prop_owner", prop_owner);
    formData.append("adv_title", adv_title);
    formData.append("adv_type", adv_type);
    formData.append("prop_type", prop_type);
    formData.append("prop_price", prop_price);
    formData.append("prop_space", prop_space);
    formData.append("prop_desc", prop_desc);
    formData.append("prop_coords", prop_coords);
    formData.append("prop_address", prop_address);
    // Additional Info
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("floor", floor);
    formData.append("street_width", street_width);
    formData.append("meter_price", meter_price);
    formData.append("prop_front", prop_front);
    images.map((item, index) => {
      formData.append("images[]", {
        uri: item.uri,
        name: item.name,
        type: item.type
      });
    });

    setLoading(true);
    fetch(url.base_url + "properties/insert.php", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-type": "multipart/form-data;",
        "cache-control": "no-cache",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success == true) {
          alert("تم انشاء اعلانك بنجاح ");
          setLoading(false);
          navigation.navigate("PersonalProperites");
        } else {
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
            paddingTop:
              Platform.OS === "ios" ? Constants.statusBarHeight * 1.2 : 0,
            paddingHorizontal: 20,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            backgroundColor: "#fe7e25",
            alignItems: "center",
            height: 60,
            width: "100%"
          }}
        >
          <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
            {adv_title}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View style={{ width: "100%", marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={styles.InputLabel}>إضافة صور العقار</Text>

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
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 10
                }}
              >
                <Image
                  source={{ uri: avatar_img }}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                    borderRadius: 10
                  }}
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
            onPress={() => insertAdd()}
            style={{
              backgroundColor: "#230D33",
              marginBottom: 40,
              padding: 10,
              borderRadius: 10,
              width: "80%",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "space-around",
              marginTop: 100
            }}
          >
            {loading == false
              ? <View
                  style={{ flexDirection: "row-reverse", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Regular"
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
    </NativeBaseProvider>
  );
}
