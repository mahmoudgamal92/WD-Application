import {
  Animated,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../theme/style";

import CustomHeader from "../../components/CustomHeader";

export default function Terms({ route, navigation }) {
  const screenTitle = "شروط الاعلان";

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
    }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>

        <TouchableOpacity
          style={{
            flexDirection: "row-reverse",
            borderColor: "#fe7e25",
            borderWidth: 1,
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Ionicons name="information-circle" size={24} color="#fe7e25"
            style={{
              marginHorizontal: 10
            }} />
          <Text style={{ fontFamily: "Regular" }}>شروط الأعلان</Text>
        </TouchableOpacity>

        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
          <Text style={{
            fontFamily: "Regular",
            color: "grey",
            textAlign: "right",
            fontSize: 16,
            lineHeight: 20
          }}>
          </Text>
        </View>
      </View>
    </View>
  );
}