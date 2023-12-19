import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  Linking
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "./../../components/CustomHeader";
import styles from "./../../theme/style";
import { useFocusEffect } from "@react-navigation/native";

export default function FavoriteScreen({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const screenTitle = "المستخدمين";

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);
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
            // alert(JSON.stringify(json));
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
        <Image source={require('./../../assets/no_result.png')} />
        <Text
          style={{
            fontFamily: "Bold",
            color: "#000",
            fontSize: 18,
            marginTop: 10
          }}
        >
          لا يوجد لديك أي مستخدمين حاليا
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
                <TouchableOpacity
                  style={{
                    flexDirection: "row-reverse",
                    alignItems:"center",
                    height: 100,
                    backgroundColor: "#FFF",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    borderRadius: 10
                  }}
                >
                  <View style={{ width: "30%" }}>
                    <Image
                      source={require("./../../assets/man.png")}
                      style={{
                        width: 60,
                        height:60
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
                        justifyContent: "center"
                      }}
                    >
                     <Entypo name="old-phone" size={24} color="grey" />

                      <Text
                        style={{
                          color: "grey",
                          fontFamily: "Regular",
                          textAlign: "center",
                          fontSize: 15,
                          marginHorizontal: 5
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
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity>
                      <AntDesign name="delete" size={24} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>}
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

      <View style={{
        margin:20
      }}>
        <TouchableOpacity 
        onPress={() => navigation.navigate("AddUser")}
        style={{
          backgroundColor:"#fe7e25",
          padding:10,
          borderRadius:10
        }}>
          <Text style={{
            fontFamily:"Bold",
            textAlign:"center",
            color:"#FFF"
          }}>
            إضافة مستخدم جديد
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
