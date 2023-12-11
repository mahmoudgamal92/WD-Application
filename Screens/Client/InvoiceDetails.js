import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "./../../components/CustomHeader";
import styles from "./../../theme/style";
import QRCode from "react-native-qrcode-svg";

export default function InvoiceDetails({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const screenTitle = "تفاصيل الفاتورة";
  const [data, setData] = useState([]);
  const { invoice } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        <QRCode value="http://awesome.link.qr"/>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 40,
            marginVertical:40
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 20,
              borderBottomColor: "#DDDDDD",
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: "grey"
              }}
            >
              بيانات الحساب
            </Text>

            <Text
              style={{
                fontFamily: "Bold"
              }}
            >
              {invoice.date_created}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 20,
              borderBottomColor: "#DDDDDD",
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: "grey"
              }}
            >
              رقم الهاتف
            </Text>

            <Text
              style={{
                fontFamily: "Bold"
              }}
            >
              {invoice.date_created}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 20,
              borderBottomColor: "#DDDDDD",
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: "grey"
              }}
            >
              تاريخ الدفع :
            </Text>

            <Text
              style={{
                fontFamily: "Bold"
              }}
            >
              {invoice.date_created}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 20,
              borderBottomColor: "#DDDDDD",
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: "grey"
              }}
            >
              المبلغ المدفوع :
            </Text>

            <Text
              style={{
                fontFamily: "Bold"
              }}
            >
              {invoice.total} ريال سعودي
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 20,
              borderBottomColor: "#DDDDDD",
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: "grey"
              }}
            >
              رقم الفاتورة
            </Text>

            <Text
              style={{
                fontFamily: "Bold"
              }}
            >
              {invoice.invoice_token}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#fe7e25",
            borderRadius: 20,
            padding: 5,
            paddingHorizontal: 20,
            marginVertical: 20
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              color: "#FFF"
            }}
          >
            تحميل الفاتورة
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
