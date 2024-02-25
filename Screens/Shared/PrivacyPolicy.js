import { Text, View, ScrollView } from 'react-native';
import React from "react";
import styles from "../../theme/style";
import CustomHeader from "../../components/CustomHeader";

export default function PrivacyPolicy({ route, navigation }) {
  const screenTitle = "شروط الاعلان";


  return (
    <View style={{
      flex: 1,
      alignItems: "center",
    }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 50 }}>


          <Text style={{
            fontFamily: "Regular",
            color: "grey",
            textAlign: "right",
            fontSize: 16,
            lineHeight: 20
          }}>


          </Text>
        </ScrollView>
      </View>
    </View>
  );
};