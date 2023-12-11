import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";
import styles from "../../theme/style";

export default function Invoices({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
const screenTitle = "فواتيري ";
  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("user_token");
      fetch(url.base_url + "profile/invoices.php?user_token=" + token, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          if (json.data !== undefined) {
            setData(json.data);
            //alert(JSON.stringify(json.message));
          } else {
            setData([]);
          }
        })
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmptyProp = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 160
        }}
      >
        <Image source={require("./../../assets/no_result.png")} />
        <Text
          style={{
            fontFamily: "Bold",
            color: "#000",
            fontSize: 18,
            marginTop: 10
          }}
        >
          لا توجد لديك أي عقارات مفضلة حاليا
        </Text>

        <Text
          style={{
            fontFamily: "Regular",
            color: "grey",
            textAlign: "center",
            fontSize: 14,
            marginTop: 10
          }}
        >
          لا توجد لديك أي عقارات مفضلة حاليالا توجد لديك أي عقارات مفضلة حاليا
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
         <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
      {isLoading == false
        ? 
        
        <View style={{
          paddingHorizontal:10,
          alignItems:"center"
        }}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => `${item.id}`}
              ListEmptyComponent={handleEmptyProp()}
              renderItem={({ item }) =>
                <View style={{
                  backgroundColor:"#FFF",
                  paddingVertical:10,
                  borderRadius:20,
                  marginVertical:10
                }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("InvoiceDetail", {
                        prop_id: item.id
                      })}
                    style={{
                      flexDirection: "row-reverse",
                      height: 80,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5
                    }}
                  >
                    <View
                      style={{
                        width: "33%",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        borderLeftColor: "#000",
                        borderLeftWidth: 1
                      }}
                    >
                      <Text style={{ fontFamily: "Regular" }}>
                        رقم الفاتورة
                      </Text>
                      <Text style={{ fontFamily: "Regular", color: "grey" }}>
                        {item.invoice_token}
                      </Text>

                    </View>

                    <View
                      style={{
                        width: "33%",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 10,
                        borderLeftColor: "#000",
                        borderLeftWidth: 1
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontFamily: "Regular"
                        }}
                      >
                        تاريخ الدفع
                      </Text>
                      <Text style={{ color: "#1B84E7", fontFamily: "Regular" , color:"grey" }}>
                        {item.date_created}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "33%",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontFamily: "Regular",
                          textAlign: "right",
                          fontSize: 12
                        }}
                      >
                        المبلغ المدفوع
                      </Text>
                      <Text style={{ color:"grey", fontFamily: "Regular" }}>
                        {item.total}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "100%",
                      paddingHorizontal: 20
                    }}
                  >
                    <TouchableOpacity
                    onPress={() => navigation.navigate("InvoiceDetails",{
                      invoice : item
                    })}
                      style={{
                        borderRadius: 10,
                        borderColor: "#fe7e25",
                        borderWidth: 1,
                        padding:5,
                        alignItems:"center"
                      }}
                    >
                      <Text style={{
                        fontFamily:"Bold",
                        color: "#fe7e25"
                      }}> 
                      رؤية الفاتورة
                       </Text>
                    </TouchableOpacity>
                  </View>
                </View>}
            />
          </View>
        : <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={70} color="#fe7e25" />
          </View>}
          </View>
    </View>
  );
}