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
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "./../../components/CustomHeader";
import styles from "./../../theme/style";
import { getAdvType, getPropType, getPropStatus } from "./../../utils/functions";

export default function Deals({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const screenTitle = "الصفقات";

  const [data, setData] = useState([]);
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
        fetch(url.base_url + "profile/properties.php?user_token=" + token, {
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
    <View style={{ alignItems: "center", flex: 1 }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        {isLoading == false
          ? <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              keyExtractor={(item, index) => `${item.prop_id}`}
              ListEmptyComponent={handleEmptyProp()}
              renderItem={({ item }) =>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProperityDetail", {
                        prop: item
                      })}
                    style={{
                      flexDirection: "row-reverse",
                      height: 120,
                      backgroundColor: "#FFF",
                      marginHorizontal: 10,
                      marginVertical: 10,
                      borderRadius: 10
                    }}
                  >
                    <View style={{ width: "30%" }}>
                      {item.prop_images == ""
                        ? <Image
                            source={require("./../../assets/placeholder.jpg")}
                            resizeMode="contain"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 10,
                              margin: 5
                            }}
                          />
                        : <Image
                            source={{
                              uri:
                                url.media_url + item.prop_images.split(",")[0]
                            }}
                            resizeMode="cover"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 10,
                              margin: 5
                            }}
                          />}
                    </View>

                    <View style={{ width: "40%", justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "#000",
                          fontFamily: "Bold",
                          textAlign: "center"
                        }}
                      >
                        {getPropType(item.prop_type) +
                          " " +
                          getAdvType(item.adv_type)}
                      </Text>

                      <Text
                        style={{
                          fontFamily: "Regular",
                          textAlign: "center",
                          color: "#000"
                        }}
                      >
                        {item.prop_price} ريال
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "30%",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          backgroundColor: getPropStatus(item.status).color,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderTopLeftRadius: 10
                        }}
                      >
                        <Text
                          style={{
                            color: "#FFF",
                            fontFamily: "Regular",
                            fontSize: 12,
                            textAlign: "center"
                          }}
                        >
                          {getPropStatus(item.status).text}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around"
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => confirm_delete(item.prop_id)}
                          style={{
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <AntDesign name="delete" size={30} color="#fe7e25" />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("EditAdd", {
                              item: item
                            })}
                          style={{
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <AntDesign name="edit" size={30} color="grey" />
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
