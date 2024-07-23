import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/constants";
import CustomHeader from "./../../components/CustomHeader";
import styles from "./../../theme/style";
export default function CurrentSubscription({ route, navigation }) {
  const [user_name, setUserName] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const screenTitle = "تفاصيل الإشتراك";

  useEffect(() => {
    _retrieveData();
  }, []);



  const _retrieveData = async () => {
    const token = await AsyncStorage.getItem("user_token");
    const name = await AsyncStorage.getItem("user_name");
    setUserName(name);
    try {

      fetch(url.base_url + "profile/subscription.php?user_token=" + token, {
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
          // alert(JSON.stringify(json));
          if (json.success == true) {
            console.log(json.data);
            setData(json.data);
            setLoading(false);
          } else {
            setData(null);
            setLoading(false);
          }
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View style={{ backgroundColor: "#F8FBFF", flex: 1 }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        {data !== null ?
          <View style={{
            flex: 1,
            alignItems: 'center',
            width: '100%'
          }}>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderRadius: 10,
                width: "90%",
                height: 220,
                marginVertical: 25,
                paddingHorizontal: 10,
                backgroundColor: "#84013F"
              }}
            >
              <View style={{
                borderColor: '#FFF',
                borderWidth: 2,
                borderRadius: 10,
                height: 200,
                justifyContent: 'center'

              }}>
                <ImageBackground
                  source={require("./../../assets/mask.png")}
                  style={{
                    width: "100%",
                    resizeMode: "contain",
                  }}
                >

                  <View
                    style={{
                      flexDirection: "row-reverse",
                      paddingHorizontal: 20,
                      justifyContent: "space-between",
                      alignItems: "flex-end"
                    }}
                  >
                    <Text style={{ color: "#FFF", fontFamily: "Bold" }}>
                      {user_name}
                    </Text>
                    <Image
                      source={require("./../../assets/wd_white.png")}
                      style={{ width: 60, height: 60 }}
                    />
                  </View>

                  <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ color: "#FFF", fontFamily: "Bold", }}>
                      رقم العضوية
                    </Text>
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: "Regular",
                        textAlign: "right"
                      }}
                    >
                      {data?.subscription_id}
                    </Text>
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: "Bold",
                        textAlign: "right"
                      }}
                    >
                      تنتهي في
                    </Text>

                    <View
                      style={{
                        width: "100%",
                        marginBottom: 10,
                        flexDirection: "row-reverse",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          fontFamily: "Regular",
                          textAlign: "right"
                        }}
                      >
                        {data?.end_date}
                      </Text>
                      <Text
                        style={{
                          color: "#FFF",
                          fontFamily: "Bold",
                          textAlign: "right"
                        }}
                      >
                        {data?.package_title}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                paddingHorizontal: 20,
                width: "100%"
              }}
            >
              <View
                style={{
                  borderColor: "#fe7e25",
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}>

                <View style={{ width: "80%" }}>
                  <Text
                    style={{
                      fontFamily: "Bold",
                      fontSize: 16,
                      color: "#fe7e25",
                      marginVertical: 15,
                      textAlign: "center"
                    }}
                  >
                    إحصائيات الإستخدام
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row-reverse",
                    marginVertical: 5
                  }}
                >
                  <View style={{ width: "40%", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: 15,
                        color: "#000",
                        textAlign: "right",
                        width: "100%"
                      }}
                    >
                      المستخدمين
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      paddingHorizontal: 20
                    }}
                  >
                    <Text style={{ fontFamily: "Bold" }}>:</Text>
                  </View>

                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 15,
                        color: "grey",
                        textAlign: "right"
                      }}
                    >
                      00
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row-reverse",
                    marginVertical: 5
                  }}
                >
                  <View style={{ width: "40%", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: 15,
                        color: "#000",
                        textAlign: "right",
                        width: "100%"
                      }}
                    >
                      الإعلانات المتبقية
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      paddingHorizontal: 20
                    }}
                  >
                    <Text style={{ fontFamily: "Bold" }}>:</Text>
                  </View>

                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 15,
                        color: "#000",
                        textAlign: "right"
                      }}
                    >
                      {data?.remaining_ads}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row-reverse",
                    marginVertical: 5
                  }}
                >
                  <View style={{ width: "40%", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: 15,
                        color: "#000",
                        textAlign: "right",
                        width: "100%"
                      }}
                    >
                      الإعلانات المميزة
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      paddingHorizontal: 20
                    }}
                  >
                    <Text style={{ fontFamily: "Bold" }}>:</Text>
                  </View>

                  <View style={{ width: "40%" }}>
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 15,
                        color: "#000",
                        textAlign: "right"
                      }}
                    >
                      {data?.remaining_featured}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("PricingPlans")}
                  style={{
                    backgroundColor: "#fe7e25",
                    marginTop: 50,
                    paddingVertical: 15,
                    borderRadius: 20,
                    width: "90%"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    تجديد الإشتراك
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          :
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            <View style={{
              backgroundColor: '#FFF',
              width: '95%',
              paddingVertical: 40,
              borderRadius: 20,
              alignItems: 'center',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}>
              <Image
                source={require("./../../assets/no_result.png")}
                style={{ width: 200, height: 200 }}
              />
              <Text style={{
                color: '#000',
                fontFamily: 'Bold',
                textAlign: 'center'
              }}>
                أنت غير مشترك في أي باقة
              </Text>

              <Text style={{
                color: 'grey',
                fontFamily: 'Regular',
                textAlign: 'center',
                marginVertical: 10
              }}>
                يمكنك الذهاب لصفحة الباقات و إختيار الباقة لمناسبة لك
              </Text>
            </View>

          </View>
        }
      </View>
    </View>

  );
}
