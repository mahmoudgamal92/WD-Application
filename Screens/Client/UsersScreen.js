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

export default function FavoriteScreen({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const screenTitle = "المستخدمين";

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
        fetch(url.base_url + "profile/users.php?user_token=" + token, {
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
            //alert(JSON.stringify(json));
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

  const confirm_delete = user_id =>
    Alert.alert("حذف المستخدم", "هل أنت متأكد من حذف المستخدم ؟", [
      {
        text: "الغاء",
        style: "cancel"
      },
      { text: "تأكيد", onPress: () => deleteUser(user_id) }
    ]);

  const deleteUser = user_id => {
    fetch(url.base_url + "profile/delete_user.php?user_id=" + user_id, {
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
          alert(JSON.stringify(responseJson));
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
          لا توجد لديك أي مستخدمين حاليا
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
          لا توجد لديك أي مستخدمين حاليالا توجد لديك أي مستخدمين حاليا
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              keyExtractor={(item, index) => `${item.user_id}`}
              ListEmptyComponent={handleEmptyProp()}
              renderItem={({ item }) =>
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row-reverse",
                      height: 100,
                      backgroundColor: "#FFF",
                      marginHorizontal: 10,
                      marginVertical: 10,
                      borderRadius: 10
                    }}
                  >
                    <View style={{ width: "30%" }}>
                      <Image
                        source={require("./../../assets/placeholder.jpg")}
                        resizeMode="contain"
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          margin: 5
                        }}
                      />
                    </View>

                    <View style={{ width: "40%", justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "#000",
                          fontFamily: "Bold",
                          textAlign: "center"
                        }}
                      >
                        {item.user_name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          justifyContent:"center"
                        }}
                      >
                        <Ionicons name="call-sharp" size={24} color="black" />

                        <Text
                          style={{
                            color: "#000",
                            fontFamily: "Regular",
                            textAlign: "center",
                            fontSize: 15,
                            marginHorizontal:5
                          }}
                        >
                          {item.user_phone}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: "30%",
                        alignItems: "center",
                        justifyContent: "space-around",
                        flexDirection:"row"
                      }}
                    >

                      <TouchableOpacity>
                      <AntDesign name="delete" size={24} color="red" />
                      </TouchableOpacity>

                      <TouchableOpacity>
                      <AntDesign name="edit" size={24} color="black" />
                      </TouchableOpacity>
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

        <TouchableOpacity style={{}} />
      </View>
    </View>
  );
}
