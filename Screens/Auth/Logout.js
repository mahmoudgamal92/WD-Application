import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/constants";

export default function Logout({ route, navigation }) {
  useEffect(() => {
    _retrieveData();
  }, []);
  const _retrieveData = async () => {
    navigation.replace("SplashScreen");
  };
  return (
    <View style={styles.animationContainer}>
      <View>
        <Image
          source={require("./../../assets/wd_white.png")}
          style={{
            width: 300,
            height: 300,
            marginBottom: 100,
            resizeMode: "contain"
          }}
        />
      </View>
      <View animation="fadeInUpBig" duraton="500" />
    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fe7e25",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%"
  },
  buttonContainer: {
    paddingTop: 20
  }
});
