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
export default function Description({ route, navigation }){

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
             الوصف
           </Text>
         </View>

         <View style={{ width: "100%", padding: 20 }}>
           <Text style={styles.InputLabel}>عنوان العقار *</Text>
           <TextInput
             //onChangeText={email => this.setState({ email })}
             placeholder="عنوان الأعلان"
             caretHidden
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="email-address"
             autoCompleteType="email"
             style={styles.InputText}
           />

           <Text style={styles.InputLabel}>وصف العقار *</Text>
           <TextInput
             //onChangeText={email => this.setState({ email })}
             placeholder="وصف العقار"
             caretHidden
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="email-address"
             autoCompleteType="email"
             style={styles.InputText}
           />

           <Text style={styles.InputLabel}>نوع العقار *</Text>
           <Select
             minWidth="200"
             borderRadius="10"
             borderColor="grey"
             marginBottom="3"
             fontFamily="Regular"
             accessibilityLabel="نوع العقار"
             placeholder="نوع العقار"
             _selectedItem={{
               bg: "teal.600",
               endIcon: <CheckIcon size="5" />
             }}
             mt={1}
           >
             <Select.Item label="نوع العقار" value="1" />
             <Select.Item label="نوع العقار" value="1" />
             <Select.Item label="نوع العقار" value="1" />
           </Select>

           <Text style={styles.InputLabel}>نوع الاعلان *</Text>
           <Select
             minWidth="200"
             borderRadius="10"
             borderColor="grey"
             fontFamily="Regular"
             marginBottom="3"
             accessibilityLabel="نوع الاعلان"
             placeholder="نوع الاعلان"
             _selectedItem={{
               bg: "teal.600",
               endIcon: <CheckIcon size="5" />
             }}
             mt={1}
           >
             <Select.Item label="نوع الاعلان" value="1" />
             <Select.Item label="نوع الاعلان" value="1" />
             <Select.Item label="نوع الاعلان" value="1" />
           </Select>
         </View>
       </View>
  );
};
