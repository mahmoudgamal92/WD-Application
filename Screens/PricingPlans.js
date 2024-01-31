import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import styles from "./../theme/style";
import CustomHeader from "./../components/CustomHeader";

import {url} from "./../constants/constants";

export default function PricingPlans({ route, navigation }) {
  const screenTitle = "باقات الاشتراك";

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  useEffect(() => {
    _retrieveData();
  }, []);


  const _retrieveData = async () => {
    try {
      fetch(url.base_url + "packages/list.php", {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          "cache-control": "no-cache",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          setData(json.data);
        })

        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={{flex:1,justifyContent:"center"}}>
      <StatusBar backgroundColor="#fe7e25" barStyle="light-content" />
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: "Regular",
            color: "#fe7e25",
            textAlign: "center",
            fontSize: 18
          }}
        >
          أختر خطة الأشتراك المناسبة لأحتياجاتك
        </Text>

        <Text
          style={{ fontFamily: "Regular", color: "grey", textAlign: "center" }}
        >
          يمكنك تجديد الخطة أو تغييرها في أي وقت
        </Text>
      </View>
      {isLoading == false
        ? <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: "80%",
              marginTop: 10
            }}
            data={data}
            keyExtractor={item => item.package_id}
            renderItem={({ item }) =>
              <View
                style={{
                  backgroundColor:  "#fe7e25",
                  width: "100%",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginBottom: 50,
                  paddingHorizontal: 10
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 10
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row-reverse",
                      alignItems: "center",
        
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#FFF",
                        padding: 10,
                        borderRadius: 10,
                        height: 60,
                        width: 60,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                     <Image   source={{ uri: url.media_url + item.package_thumbnail }}
                     
                     style={{width:50,height:50}}/>
                    </View>
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: 20,
                        color: "#FFF",
                        marginHorizontal: 10
                      }}
                    >
                      {item.package_title}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    paddingHorizontal:20
                  }}
                >
                  <Text
                    style={{ fontFamily: "Bold", fontSize: 70, color: "#FFF" }}
                  >
                    {item.package_price}
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Bold",
                      color: "#FFF",
                      marginBottom: -10,
                      marginHorizontal: 5
                    }}
                  >
                    رس / {item.package_duration} يوم
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Bold",
                      color: "#FFF",
                      fontSize: 20,
                      paddingHorizontal: 20
                    }}
                  >
                    مميزات الباقة
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    paddingHorizontal: 20,
                    marginVertical: 5
                  }}
                >
                  <View style={{ flexDirection: "row-reverse" }}>
                    <AntDesign name="checkcircle" size={26} color="#FFF" />
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: 16,
                        color: "#FFF",
                        marginHorizontal: 5
                      }}
                    >
                      عدد الأعلانات
                    </Text>
                  </View>

                  <Text
                    style={{ fontFamily: "Bold", fontSize: 16, color: "#FFF" }}
                  >
                    {item.max_ads == ""
                      ? "غير محدود "
                      : item.max_ads}
                  </Text>
                </View>

              

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    paddingHorizontal: 20,
                    marginVertical: 5
                  }}
                >
                  <View style={{ flexDirection: "row-reverse" }}>
                    <AntDesign name="checkcircle" size={26} color="#FFF" />
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: 16,
                        color: "#FFF",
                        marginHorizontal: 5
                      }}
                    >
                      مدة الأشتراك
                    </Text>
                  </View>

                  <Text
                    style={{ fontFamily: "Bold", fontSize: 16, color: "#FFF" }}
                  >
                    {item.package_duration +" يوما " }
                  </Text>
                </View>

    

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    paddingHorizontal: 20,
                    marginVertical: 5
                  }}
                >
                  <View style={{ flexDirection: "row-reverse" }}>
                    <AntDesign name="checkcircle" size={26} color="#FFF" />
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: 16,
                        color: "#FFF",
                        marginHorizontal: 5
                      }}
                    >
                      عدد المستخدمين
                    </Text>
                  </View>

                  <Text
                    style={{ fontFamily: "Bold", fontSize: 16, color: "#FFF" }}
                  >
                    {item.max_users}
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.replace("CompleteOrder", {
                        item: item
                      })}
                    style={{
                      backgroundColor: "#FFF",
                      paddingVertical: 15,
                      borderRadius: 25,
                      width: "80%",
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontFamily: "Regular"
                      }}
                    >
                      <Text
                        style={{
                          color: "grey",
                          textAlign: "center",
                          fontFamily: "Bold"
                        }}
                      >
                        أشترك الأن
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>}
          />
        : <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              width: "100%"
            }}
          >
            <ActivityIndicator size={70} color="#fe7e25" />
          </View>}
    </View>
    </View>
  );
}
