import React, { Component, useState, useEffect } from "react";
import {
    Image,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    FlatList,
} from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import CustomHeader from "./../components/CustomHeader";

import { url } from "./../constants/constants";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./../theme/style";

export default function Notifiation({ route, navigation }) {
    const screenTitle = "الاشعارات";

    const [isLoading, setLoading] = React.useState(false);
    const [userToken, setUserToken] = React.useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        _retrieveData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            _retrieveData();
        }, [])
    );



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
                    لا توجد لديك أشعارات  حاليا
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
                    لا توجد لديك أي  أشعارات حاليالا توجد لديك أي  أشعارات حاليا
                </Text>
            </View>
        );
    };


    const _retrieveData = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("user_token");
        setUserToken(token);
        if (token !== null) {
            try {
                fetch(url.base_url + "notification/list.php?user_token=" + token, {
                    method: "GET",
                    headers: {
                        Accept: "*/*",
                        "Content-type": "multipart/form-data;",
                        "Accept-Encoding": "gzip, deflate, br",
                        "cache-control": "no-cache",
                        Connection: "keep-alive"
                    },
                })
                    .then(response => response.json())
                    .then(json => {
                        if (json.success == "true") {
                          //alert(JSON.stringify(json));
                            setData(json.data);
                        }
                        else {
                            //alert(JSON.stringify(json));
                            setData([]);
                        }
                    }
                    )
                    .finally(() => setLoading(false))
                    .catch(error => console.error(error));
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <View
            style={{
                alignItems: "center",
                flex: 1
            }}
        >

            <CustomHeader text={screenTitle} />
            <View style={styles.rootContainer}>
                <FlatList
                    style={{ marginTop: 20 }}
                    data={data}
                    ListEmptyComponent={handleEmptyProp()}
                    keyExtractor={item => item.notification_id}
                    renderItem={({ item }) => (

                        <View style={{
                            marginHorizontal: 20,
                            borderRadius: 5,
                            marginVertical: 10,
                            padding: 10,
                            backgroundColor: "#FFF",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>

                            <View
                                style={{
                                    marginHorizontal: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#DDD",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "#000",
                                    fontSize: 13.5,
                                    paddingVertical: 10,
                                }}>
                                    لقد تلقيت إشعارا جديدا
                                </Text>

                                <Text style={{ fontFamily: "Bold", color: "grey", fontSize: 12, textAlign: "left" }}>
                                    {item.notification_time}
                                </Text>

                            </View>

                            <View style={{ flexDirection: "row", paddingVertical: 10, width: "100%" }}>



                                <View style={{ width: "30%", alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require("./../assets/notification.png")}
                                        style={{ width: 60, height: 60, marginHorizontal: 5 }} />
                                </View>

                                <View style={{ width: "70%", alignItems: "flex-start", justifyContent: "center" }}>

                                    <View style={{ flexDirection: "row-reverse", alignItems: "center", marginBottom: 5 }}>
                                        <View style={{ alignItems: "flex-start", }}>

                                            <Text style={{ fontFamily: "Regular", color: "grey", fontSize: 12, marginHorizontal: 5 }}>
                                                تم إضافة طلبك بنجااح برقم
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("OrderInfo", { order_id: item.order_token })}
                                            >
                                                <Text style={{ color: "blue", fontFamily: "Bold" }}>
                                                    {item.order_token}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>


                                        <AntDesign name="clockcircleo" size={22} color="black"
                                            style={{ marginHorizontal: 5 }} />
                                    </View>

                                    <View style={{ flexDirection: "row-reverse", alignItems: "center", marginBottom: 5 }}>
                                        <Text style={{ fontFamily: "Regular", color: "grey", fontSize: 12 }}>
                                            {item.notification_time}
                                        </Text>
                                        <Entypo name="calendar" size={22} color="black" style={{ marginHorizontal: 5 }} />
                                    </View>

                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}