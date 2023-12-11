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
  const screenTitle = "تفاصيل الإشتراك";

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    const token = await AsyncStorage.getItem("user_token");
    const name = await AsyncStorage.getItem("user_name");
    setUserName(name);
  };


  return (
    <View style={{ backgroundColor: "#F8FBFF", flex: 1 }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
     
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FFF",
                      borderRadius: 10,
                      width: "80%",
                      height: 200,
                      marginBottom: 40,
                      marginTop: 50,
                      backgroundColor: "#000"
                    }}
                  >
                    <ImageBackground
                      source={require("./../../assets/mask.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain"
                      }}
                      imageStyle={{ borderRadius: 10 }}
                    >
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          justifyContent: "space-between",
                          alignItems: "flex-end"
                        }}
                      >
                        <Text style={{ color: "#FFF", fontFamily: "Bold" }}>
                          {user_name}
                        </Text>
                        <Image
                          source={require("./../../assets/wd_white.png")}
                          style={{ width: 50, height: 50 }}
                        />
                      </View>

                      <View style={{ paddingHorizontal: 20 }}>
                        <Text style={{ color: "#FFF", fontFamily: "Regular" }}>
                          رقم العضوية
                        </Text>
                        <Text
                          style={{
                            color: "#FFF",
                            fontFamily: "Regular",
                            textAlign: "right"
                          }}
                        >
                          376938739
                        </Text>
                        <Text
                          style={{
                            color: "#FFF",
                            fontFamily: "Regular",
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
                            20-20-2023
                          </Text>
                          <Text
                            style={{
                              color: "#FFF",
                              fontFamily: "Regular",
                              textAlign: "right"
                            }}
                          >
                            الباقة الذهبية
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFF",
                  paddingHorizontal:20,
                  width: "100%"
                }}
              >
                <View
                  style={{
                    borderColor: "#DDDDDD",
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingVertical: 20,
                    paddingHorizontal:10,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>

                  <View style={{ width: "80%" }}>
                    <Text
                      style={{
                        fontFamily: "Bold",
                        color: "#230D33",
                        marginVertical: 15,
                        textAlign: "center"
                      }}
                    >
                      بيانات الأستخدام
                    </Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "space-around",
                      flexDirection: "row-reverse"
                    }}
                  >
                    <View style={{ width: "40%", alignItems: "flex-start" }}>
                      <Text
                        style={{
                          fontFamily: "Bold",
                          fontSize: 12,
                          color: "#fe7e25",
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
                          color: "#000",
                          textAlign: "right"
                        }}
                      >
                        {0} من : {0}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: "space-around",
                      flexDirection: "row-reverse"
                    }}
                  >
                    <View style={{ width: "40%", alignItems: "flex-start" }}>
                      <Text
                        style={{
                          fontFamily: "Bold",
                          fontSize: 12,
                          color: "#fe7e25",
                          textAlign: "right",
                          width: "100%"
                        }}
                      >
                        الاعلانات
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
                        {0} من : {0}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: "space-around",
                      flexDirection: "row-reverse"
                    }}
                  >
                    <View style={{ width: "40%", alignItems: "flex-start" }}>
                      <Text
                        style={{
                          fontFamily: "Bold",
                          fontSize: 12,
                          color: "#fe7e25",
                          textAlign: "right",
                          width: "100%"
                        }}
                      >
                        الاعلانات المميزة
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
                        {0} من :{0}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("PricingPlans")}
                style={{
                  backgroundColor: "#fe7e25",
                  marginTop: 50,
                  paddingVertical: 15,
                  borderRadius: 20,
                  width: "100%"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Regular"
                  }}
                >
                  تجديد الأشتراك
                </Text>
              </TouchableOpacity>
      </View>
    </View>
  );
}
