import {
  Animated,
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  ImageBackground
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, {useState, useEffect } from "react";
import { url } from "../constants/constants";
import {Entypo} from "@expo/vector-icons";
import DefaultHeader from "./../components/DefaultHeader";

import AsyncStorage from "@react-native-async-storage/async-storage";
export default function FavoriteScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [user_token, setUserToken] = useState(null);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _retrieveData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      _retrieveData();
    }, [])
  );

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      setUserToken(token);
      if (token == null) {
        navigation.navigate("SignInScreen");
      } else {
        fetch(
          url.base_url + "search_for_me/list.php?user_token=" + token,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "cache-control": "no-cache",
              "Content-type": "multipart/form-data;",
              "Accept-Encoding": "gzip, deflate, br",
              Connection: "keep-alive"
            }
          }
        )
          .then(response => response.json())
          .then(json => {
            // alert(JSON.stringify(json));
            if (json.success == true) {
              setData(json.data);
            } else {
              setData([]);
            }
          })
          .finally(() => setLoading(false))
          .catch(error => console.error(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmptyProp = () => {
    return (
      <View
        style={{
          marginTop: "20%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Image source={require('./../assets/no_result.png')} />
        <Text
          style={{
            fontFamily: "Bold",
            color: "#000",
            fontSize: 18,
            marginTop: 10
          }}
        >
          لا توجد أي طلبات  حاليا
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
          حاول مجددا لاحقا
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddRequest")}
          style={{
            backgroundColor: "#fe7e25",
            borderRadius: 10,
            padding: 15,
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 60
          }}>
          <Text style={{ fontFamily: "Bold", color: "#FFF" }}>
            اضافه طلب
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getAdvType = val => {
    switch (val) {
      case "sale":
        return "للبيع";
      case "rent":
        return "للإيجار";
      case "for_invest":
        return "للإستثمار";
      default:
        return "للبيع";
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

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fe7e25" />

      <DefaultHeader />


      <View
        style={{
          flex: 1,
          backgroundColor: "#fafafa",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
          paddingVertical: 20
        }}
      >
        {isLoading == false
          ? <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data}
            keyExtractor={(item, index) => item.id}
            ListEmptyComponent={handleEmptyProp()}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RequestDetails", {
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
                  marginVertical: 5,
                  height: 160
                }}
              >
                <View style={{ width: "40%" }}>
                  <ImageBackground
                    source={require("./../assets/placeholder.jpg")}
                    style={{
                      width: "100%",
                      height: "100%",
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
                          width: "100%",
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          padding: 5
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#fe7e25",
                            borderRadius: 50,
                            paddingHorizontal: 10,
                            paddingVertical: 5
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Bold",
                              color: "#FFF"
                            }}
                          >
                            {getPropType(item.realstate_type)}
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
                      {getPropType(item.realstate_type) +
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
                    {item.price_type == "fixed" ? item.min_price + "-" + item.max_price + "  SAR" : "سعر السوق"}
                  </Text>

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
                    > {item.state} , {item.city}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      borderTopColor: "#DDDDDD",
                      borderTopWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 15
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Text style={{ fontFamily: "Bold", color: "#000" }}>
                        {item.user_name}
                      </Text>
                      <Image
                        source={require("./../assets/man.png")}
                        style={{
                          width: 40,
                          height: 40
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});