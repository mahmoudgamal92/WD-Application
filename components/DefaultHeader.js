import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const DefaultHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: "#fe7e25",
        alignItems: "center",
        width: "100%",
        height: 100
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