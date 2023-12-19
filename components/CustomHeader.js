// CustomHeader.js
import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

const CustomHeader = ({text }) => {
  const navigation = useNavigation();
  return (
    <View
    style={{
      paddingHorizontal: 20,
      backgroundColor: "#fe7e25",
      alignItems: "center",
      width: "100%",
      height: Platform.OS == "ios" ? 130 : 100
    }}
  >
      <View
        style={{
          backgroundColor: "#fe7e25",
          justifyContent: "center",
          width: "100%",
          alignItems:"center",
          height:"100%"
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontFamily: "Bold",
            textAlign: "center"
          }}
        >
          {text}
        </Text>

        <TouchableOpacity
        onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            right: 20,
            backgroundColor: "#FFF",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color="#fe7e25"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
