import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import styles from "./../theme/style";
import CustomHeader from "./../components/CustomHeader";
import { Iconify } from "react-native-iconify";

import { url } from "./../constants/constants";
export default function AddImg({ route, navigation }) {
  const [images, setImages] = useState([]);
  const [featured_prop, setFeatured] = useState("");
  const [mortgate, setMortgage] = useState("");
  const [conflict, setConflict] = useState("");
  const [loading, setLoading] = useState(false);
  const screenTitle = "رخـصـــة فــــال ";

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
              من فضلك قم بالتقاط صورة لرخصة هيئة العقار او رفعها من خلال جهازك{" "}
            </Text>

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
              <Iconify icon="solar:camera-bold" size={60} color={"#fe7e25"} />
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#000"
                }}
              >
                إلتقاط صورة
              </Text>
            </TouchableOpacity>

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
              <Iconify icon="solar:upload-bold" size={60} color={"#fe7e25"} />
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#000"
                }}
              >
                تحميل صورة
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => insertAdd()}
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
    </View>
  );
}