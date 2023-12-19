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
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./../theme/style";
import CustomHeader from "./../components/CustomHeader";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

export default function FaLicenseScan({ route, navigation }) {
  const screenTitle = "رخـصـــة فــــال ";

  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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

            <View
              style={{
                width: "100%",
                borderRadius:10,
                aspectRatio: 1,
                overflow: "hidden",
                borderRadius: 10,
                marginBottom: 40
              }}
            >
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{
                  flex: 1
                }}
              />
            </View>
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
    </View>
  );
}
