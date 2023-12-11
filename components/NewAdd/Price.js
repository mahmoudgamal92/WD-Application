import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,

} from "react-native";
import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import {
  Actionsheet,
  useDisclose,
  Center,
  NativeBaseProvider,
  Slider,
  Box,
  Select,
  CheckIcon
} from "native-base";

import styles from "./../../theme/style";
export default function Price({ route, navigation }){

  return (
    <View style={styles.AddCard}>
    <View style={{ width: "100%", marginVertical: 10 }}>
      <Text
        style={{
          fontFamily: "Bold",
          color: "#fe7e25",
          borderBottomWidth: 1,
          padding: 10,
          borderBottomColor: "grey"
        }}
      >
        السعر
      </Text>
    </View>

    <View style={{ width: "100%", padding: 20 }}>
      <Text style={styles.InputLabel}>سعر العقار *</Text>
      <TextInput
        //onChangeText={email => this.setState({ email })}
        placeholder="أدخل السعر"
        caretHidden
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        autoCompleteType="email"
        style={styles.InputText}
      />
    </View>
  </View>

  );
};

