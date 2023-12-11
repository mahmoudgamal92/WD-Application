import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput,
  Modal,
  Button,
  ActivityIndicator
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
export default function Submit({ route, navigation }){

  return (
    <View style={{marginHorizontal:30}}>

       <TouchableOpacity 
      style={styles.nextButton}
      >
        <Text style={styles.nextButtonText}>اضافة العقار</Text>
      </TouchableOpacity>
      </View>
  );
};

