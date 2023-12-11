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
  ImageBackground,
  StatusBar
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, {useState, useEffect } from "react";
import {url} from "../constants/constants";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DefaultHeader from "../components/DefaultHeader";

export default function FavoriteScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [bLoading, setBLoading] = useState(false);
  const [user_token, setUserToken] = useState(null);




  const getPropType = (val) => {
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


  const getAdvType = (val) => {
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
      }
      else {
        fetch(url.base_url + "favourite/list.php?user_token=" + token,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "cache-control": "no-cache",
              "Content-type": "multipart/form-data;",
              "Accept-Encoding": "gzip, deflate, br",
              Connection: "keep-alive",
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


  const toggleFavorite = (prop_id) => {
    try {
      fetch(
        url.base_url + "favourite/toggle.php?prop_id=" + prop_id + "&user_token=" + user_token,
        {
          headers: {
            Accept: "*/*",
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            "cache-control": "no-cache",
            Connection: "keep-alive",
          }
        }).then(response => response.json())
        .then(responseJson => {
          _retrieveData();
        });
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
        <Image source={require('./../assets/no_result.png')} />
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
      <StatusBar backgroundColor="#fe7e25" />
      <DefaultHeader />


      <View style={{
        flex: 1,
        backgroundColor: "#fafafa",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingVertical: 20
      }}>


        {isLoading == false
          ? <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={handleEmptyProp()}
            renderItem={({ item }) =>
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
                        url.media_url +
                        item.prop_images.split(",")[0]
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
                          <AntDesign name="heart" size={24} color="red" />
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
                            {getPropType(item.prop_type)}
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
                      {item.address.substring(0, 25)}...
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
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
