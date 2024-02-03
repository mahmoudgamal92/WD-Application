import {
    TouchableOpacity,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Image,
    TextInput,
    ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "./../../components/CustomHeader";
import styles from "./../../theme/style";

export default function UpdateUser({ route, navigation }) {
    const [isLoading, setLoading] = React.useState(false);
    const { item } = route.params;
    console.log(item);
    const [user_name, setUserName] = useState(item.user_name);
    const [user_email, setUserEmail] = useState(item.user_email);
    const [user_phone, setUserPhone] = useState(item.user_phone);

    const screenTitle = "تعديل بيانات المستخدم";

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        _retrieveData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const UpdateProfile = async () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("user_token", item.user_token);
        formData.append("user_name", user_name);
        formData.append("user_email", user_email);
        formData.append("user_phone", user_phone);
        fetch(url.base_url + "profile/update.php", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-type": "multipart/form-data;",
                "Accept-Encoding": "gzip, deflate, br",
                "cache-control": "no-cache"
            },
            body: formData
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.sucess == false) {
                    alert("نأسف هناك عطل من طرفنا");
                } else {
                    alert(responseJson.message);
                    navigation.goBack();
                }
                setLoading(false);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader text={screenTitle} />
            <View style={styles.rootContainer}>
                <ScrollView style={{}}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            paddingHorizontal: 10
                        }}
                    >
                        {/* Mobile Input */}
                        <View
                            style={{
                                flexDirection: "row-reverse",
                                borderColor: "#fe7e25",
                                width: "100%",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                marginVertical: 10,
                                height: 58
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    alignItems: "flex-end",
                                    position: "absolute",
                                    marginTop: -10
                                }}
                            >
                                <Text
                                    style={{
                                        color: "grey",
                                        fontFamily: "Regular",
                                        backgroundColor: "#FFF",
                                        textAlign: "right",
                                        paddingHorizontal: 10
                                    }}
                                >
                                    أسم المستخدم
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row-reverse",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <TextInput
                                    selectionColor={"#fe7e25"}
                                    onChangeText={val => setUserName(val)}
                                    defaultValue={user_name}
                                    style={{
                                        fontFamily: "Regular",
                                        textAlign: "right",
                                        paddingBottom: 2,
                                        height: "100%",
                                        width: "100%",
                                        fontSize: 20,
                                        fontFamily: "Bold",
                                        color: "grey"
                                    }}
                                />

                                <TouchableOpacity
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        right: 0,
                                        position: "absolute",
                                        flexDirection: "row-reverse"
                                    }}
                                >
                                    <Feather name="user" size={35} color="grey" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Mobile Input */}
                        <View
                            style={{
                                flexDirection: "row-reverse",
                                borderColor: "#fe7e25",
                                width: "100%",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                marginVertical: 10,
                                height: 58
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    alignItems: "flex-end",
                                    position: "absolute",
                                    marginTop: -10
                                }}
                            >
                                <Text
                                    style={{
                                        color: "grey",
                                        fontFamily: "Regular",
                                        backgroundColor: "#FFF",
                                        textAlign: "right",
                                        paddingHorizontal: 10
                                    }}
                                >
                                    رقم الجوال
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row-reverse",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <TextInput
                                    selectionColor={"#fe7e25"}
                                    onChangeText={val => setUserPhone(val)}
                                    keyboardType="numeric"
                                    defaultValue={user_phone}

                                    style={{
                                        fontFamily: "Regular",
                                        textAlign: "right",
                                        paddingBottom: 2,
                                        height: "100%",
                                        width: "100%",
                                        fontSize: 20,
                                        fontFamily: "Bold",
                                        color: "grey"
                                    }}
                                />

                                <TouchableOpacity
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        right: 0,
                                        position: "absolute",
                                        flexDirection: "row-reverse"
                                    }}
                                >
                                    <AntDesign
                                        name="caretdown"
                                        size={12}
                                        color="grey"
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: "Regular",
                                            fontSize: 16,
                                            color: "grey",
                                            marginHorizontal: 5
                                        }}
                                    >
                                        +966
                                    </Text>
                                    <Image
                                        source={require("./../../assets/ksa.png")}
                                        style={{ width: 30, height: 25, borderRadius: 5 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Mobile Input */}
                        <View
                            style={{
                                flexDirection: "row-reverse",
                                borderColor: "#fe7e25",
                                width: "100%",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                marginVertical: 10,
                                height: 58
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    alignItems: "flex-end",
                                    position: "absolute",
                                    marginTop: -10
                                }}
                            >
                                <Text
                                    style={{
                                        color: "grey",
                                        fontFamily: "Regular",
                                        backgroundColor: "#FFF",
                                        textAlign: "right",
                                        paddingHorizontal: 10
                                    }}
                                >
                                    البريد الإلكتروني
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row-reverse",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <TextInput
                                    selectionColor={"#fe7e25"}
                                    onChangeText={val => setUserEmail(val)}
                                    keyboardType="email-address"
                                    defaultValue={user_email}
                                    style={{
                                        fontFamily: "Regular",
                                        textAlign: "right",
                                        paddingBottom: 2,
                                        height: "100%",
                                        width: "100%",
                                        fontSize: 20,
                                        fontFamily: "Bold",
                                        color: "grey"
                                    }}
                                />

                                <TouchableOpacity
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        right: 0,
                                        position: "absolute",
                                        flexDirection: "row-reverse"
                                    }}
                                >
                                    <MaterialIcons name="email" size={35} color="grey" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {isLoading == true
                            ?
                            <TouchableOpacity
                                style={{
                                    width: "100%",
                                    marginVertical: 10,
                                    backgroundColor: "#fe7e25",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                            >
                                <ActivityIndicator size={40} color={"#FFF"} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => UpdateProfile()}
                                style={{
                                    width: "100%",
                                    marginVertical: 10,
                                    backgroundColor: "#fe7e25",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "center",
                                        color: "#FFF"
                                    }}
                                >
                                    حفظ
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
