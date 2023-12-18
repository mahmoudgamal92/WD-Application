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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoriteScreen({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);

  const render_color = val => {
    switch (val) {
      case "draft":
        return "#ff0000";

      case "pending":
        return "#ecc100";

      case "active":
        return "#008036";

      default:
        return "#fe7e25";
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
            alert(JSON.stringify(json));
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
          //alert(JSON.stringify(responseJson));
          // ToastAndroid.showWithGravity(
          //   "تم حذف العقار بنجاح",
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER
          // );

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
    <View style={{ justifyContent: "center", flex: 1 }}>
      <View
        style={{
          marginBottom: 20,
          paddingHorizontal: 40,
          flexDirection: "row-reverse",
          justifyContent: "center",
          backgroundColor: "#fe7e25",
          height: 60,
          width: "100%",
          alignItems: "center"
        }}
      >
        <Text style={{ fontFamily: "Regular", color: "#FFF", fontSize: 20 }}>
          عقاراتي
        </Text>
      </View>

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
                            uri: url.media_url + item.prop_images.split(",")[0]
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
                      {item.adv_title}
                    </Text>

                    <Text
                      style={{
                        fontFamily: "Regular",
                        textAlign: "center",
                        color: "#019AFF"
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
                        backgroundColor: render_color(item.prop_status),
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
                        {item.prop_status}
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={70} color="#fe7e25" />
          </View>}
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
