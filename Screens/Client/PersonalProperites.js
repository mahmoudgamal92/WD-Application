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
  ToastAndroid,
  ImageBackground
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import {url} from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";
import styles from "../../theme/style";

export default function PersonalProps({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const screenTitle = "عقاراتي";
  const getAdvType = val => {
    switch (val) {
      case "for_sale":
        return "للبيع";
      case "for_rent":
        return "للإيجار";
      case "for_invest":
        return "للإستثمار";
      default:
        return "للبيع";
    }
  };

  const render_color = val => {
    switch (val) {
      case "draft":
        return {
          color: "#ff0000",
          text: "غير منشور"
        };

      case "pending":
        return {
          color: "#ecc100",
          text: "قيد الإنتظار"
        };

      case "active":
        return {
          color: "#008036",
          text: "نشط"
        };

      default:
        return {
          color: "#fe7e25",
          text: "غير معروف"
        };
    }
  };

  const getPropType = val => {
    switch (val) {
      case "3":
        return "شقة";
      case "4":
        return "فيلا";
      case "5":
        return "أرض";
      case "6":
        return "عمارة";
      case "7":
        return "محل تجاري";
      case "8":
        return "مول";
      case "9":
        return "شاليه";
      case "10":
        return "إستراحة";
      case "11":
        return "مستودع";
      case "12":
        return "مصنع";
      default:
        return "أخرى";
    }
  };

  const [data, setData] = useState([]);
  const [user_id, setUserID] = useState("");
  const [user_name, setUserName] = useState("");
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _retrieveData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      setLoading(true);
      if (token == null) {
        navigation.navigate("SignInScreen");
      } else {
        fetch(
          url.base_url + "profile/properties.php?user_token=" + token,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-type": "multipart/form-data;",
              "Accept-Encoding": "gzip, deflate, br",
              "cache-control": "no-cache",
              Connection: "keep-alive"
            }
          }
        )
          .then(response => response.json())
          .then(json => {
            if (json.success == true) {
              setData(json.data);
              setLoading(false);
            } else {
              setData([]);
              setLoading(false);
            }
          })
          .catch(error => console.error(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirm_delete = prop_id =>
    Alert.alert("حذف العقار", "هل أنت متأكد من حذف العقار ؟", [
      {
        text: "الغاء",
        style: "cancel"
      },
      { text: "تأكيد", onPress: () => deleteProperity(prop_id) }
    ]);

  const deleteProperity = prop_id => {
    fetch(url.base_url + "profile/delete_prop.php?prop_id=" + prop_id, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "cache-control": "no-cache",
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success == true) {
          alert("تم حذف العقار بنجاح");
          _retrieveData();
        } else {
          alert(responseJson.message);
        }
      });
  };

  const handleEmptyProp = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 260
        }}
      >
        <Text
          style={{
            fontFamily: "Regular",
            color: "#c9c9c9",
            fontSize: 18,
            marginTop: 10
          }}
        >
          لا توجد لديك أي عقارات حاليا
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        {isLoading == false
          ? <FlatList
              data={data}
              style={{width:"100%"}}
              ListEmptyComponent={handleEmptyProp()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View style={{ flex: 1, width: "100%" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProperityDetail", {
                        prop: item
                      })}
                    style={{
                      backgroundColor: "#FFF",
                      borderRadius: 10,
                      marginHorizontal: 20,
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderWidth: 0.8,
                      borderColor: "#DDDDDD",
                      height: 140,
                      marginVertical: 5
                    }}
                  >
                    <View style={{ width: "40%" }}>
                      <ImageBackground
                        source={{
                          uri:
                            url.media_url + item.prop_images.split(",")[0]
                        }}
                        style={{
                          width: "100%",
                          height: "100%"
                        }}
                        imageStyle={{
                          borderBottomRightRadius: 10,
                          borderTopRightRadius: 10,
                          resizeMode: "stretch"
                        }}
                      >
                        <View
                          style={{
                            alignItems: "flex-end",
                            width: "100%",
                            height: "100%",
                            padding: 5
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#FFF",
                              borderRadius: 40,
                              height: 35,
                              width: 35,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => toggleFavorite(item.prop_id)}
                            >
                              <AntDesign name="hearto" size={24} color="grey" />
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              width: "100%",
                              flex: 1,
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              padding: 5
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: render_color(item.prop_status)
                                  .color,
                                borderRadius: 50,
                                paddingHorizontal: 10,
                                paddingVertical: 5
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Regular",
                                  color: "#FFF"
                                }}
                              >
                                {render_color(item.prop_status).text}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>

                    <View
                      style={{
                        alignItems: "flex-end",
                        paddingVertical: 5,
                        width: "60%"
                      }}
                    >
                      <View
                        style={{
                          width: "60%",
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          borderRadius: 10,
                          backgroundColor: "#FFF",
                          paddingHorizontal: 5
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Bold",
                            color: "#0e2e3b",
                            textAlign: "right",
                            fontSize: 16
                          }}
                        >
                          {getPropType(item.prop_type) +
                            " " +
                            getAdvType(item.adv_type)}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontFamily: "Bold",
                          fontSize: 15,
                          width: "90%",
                          color: "#fe7e25",
                          marginVertical: 5,
                          textAlign: "right",
                          paddingHorizontal: 10
                        }}
                      >
                        {item.prop_price} ريال
                      </Text>

                      <View />

                      <View
                        style={{
                          flexDirection: "row-reverse",
                          width: "100%",
                          alignItems: "center"
                        }}
                      >
                        <Entypo name="location-pin" size={30} color="grey" />
                        <Text
                          style={{
                            fontFamily: "Regular",
                            color: "grey"
                          }}
                        >
                          {item.prop_state + " , "+ item.prop_city}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          marginVertical: 10
                        }}
                      >
                        <TouchableOpacity>
                          <AntDesign
                            name="edit"
                            size={30}
                            color="grey"
                            style={{ marginHorizontal: 5 }}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => deleteProperity(item.id)}
                        >
                          <AntDesign name="delete" size={30} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>}
            />
          : <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator size={70} color="#fe7e25" />
            </View>}
      </View>
    </View>
  );
}
