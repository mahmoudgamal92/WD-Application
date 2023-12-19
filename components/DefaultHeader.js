import React from 'react';
import { View, Text, TouchableOpacity, Image,Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

const DefaultHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop :  Platform.OS == "ios" ? Constants.statusBarHeight * 0.8 : 0,
        backgroundColor: "#fe7e25",
        alignItems: "center",
        width: "100%",
        height: Platform.OS == "ios" ? 130 : 100
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >

        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Ionicons name="notifications" size={40} color="#FFF" />
        </TouchableOpacity>

        <Image
          source={require("./../assets/wd_white.png")}
          style={{
            height: 80,
            width: 80,
            resizeMode: "contain"
          }}
        />
      </View>
    </View>
  );
};

export default DefaultHeader;