import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import React, { useState, useEffect } from "react";
import { Popup, Root } from 'react-native-popup-confirm-toast'
//import { as PopupRootProvider} from 'react-native-popup-confirm-toast';

import { Entypo, AntDesign } from "@expo/vector-icons";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";
import styles from "../../theme/style";
import { getAdvType, getPropType, getPropStatus, getCityById, getRegionById } from "./../../utils/functions";
import Toast from "react-native-toast-message";
import toastConfig from "../../components/Toast";
export default function PersonalProps({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const screenTitle = "عقاراتي";
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


  const toggleFavorite = async prop_id => {
    const user_token = await AsyncStorage.getItem("user_token");
    try {
      //setFavLoading(prop_id);
      fetch(
        url.base_url +
        "favourite/toggle.php?prop_id=" +
        prop_id +
        "&user_token=" +
        user_token,
        {
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
        .then(responseJson => {
          //alert(JSON.stringify(responseJson));
          Toast.show({
            type: "successToast",
            text1: "تم الاضافه للمفضله بنجاح",
            bottomOffset: 80,
            visibilityTime: 2000
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
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
    <Root>

      <View style={{ flex: 1 }}>
        <CustomHeader text={screenTitle} />
        <View style={styles.rootContainer}>
          {isLoading == false
            ? <FlatList
              data={data}
              style={{ width: "100%" }}
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
                          uri: url.media_url + item.prop_images.split(",")[0]
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
                            {/* <View
                              style={{
                                backgroundColor: getPropStatus(item.prop_status)
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
                                {getPropStatus(item.prop_status).text}
                              </Text>
                            </View> */}
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
                          {getRegionById(item.prop_state) + " , " + getCityById(item.prop_city)}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          marginVertical: 10,
                          paddingHorizontal: 10
                        }}
                      >
                        {/* <TouchableOpacity>
                        <AntDesign
                          name="edit"
                          size={30}
                          color="grey"
                          style={{ marginHorizontal: 5 }}
                        />
                      </TouchableOpacity> */}

                        <TouchableOpacity
                          onPress={() =>
                            Popup.show({
                              type: 'confirm',
                              title: 'تأكيد',
                              textBody: 'هل أنت متأكد من حذف هذا العقار',
                              buttonText: 'تأكيد',
                              confirmText: 'إلغاء',
                              titleTextStyle: {
                                fontFamily: "Bold",
                              },
                              descTextStyle: {
                                fontFamily: "Regular",
                                color: "grey"
                              },
                              okButtonTextStyle: {
                                fontFamily: "Regular",
                              },
                              confirmButtonTextStyle: {
                                fontFamily: "Regular",
                              },
                              callback: () => {
                                deleteProperity(item.prop_id)
                                Popup.hide();
                              },
                              cancelCallback: () => {
                                // alert('Cancel Callback && hidden');
                                Popup.hide();
                              },
                            })
                          }
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
        <Toast config={toastConfig} />

      </View>
    </Root>

  );
}