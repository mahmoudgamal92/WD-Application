import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar
} from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";


export default function NewRequest({ route, navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#fe7e25" />
            <View
                style={{
                    paddingHorizontal: 20,
                    backgroundColor: "#fe7e25",
                    alignItems: "center",
                    width: "100%",
                    height: 100
                }}
            >
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}>

                    <Ionicons name="notifications" size={40} color="#FFF" />

                    <Image source={require('./../assets/wd_white.png')}
                        style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain",
                        }} />
                </View>
            </View>

            <View style={{
                flex: 1,
                backgroundColor: "#fafafa",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: -20,
                paddingVertical: 20
            }}>


                <TouchableOpacity
                    onPress={() => navigation.navigate("SearchRealEstateInfo")}
                    style={{
                        flexDirection: "row-reverse",
                        borderRadius: 10,
                        borderColor: "#DDDDDD",
                        paddingVertical: 10,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginVertical: 20,
                        paddingHorizontal: 10
                    }}>

                    <View style={{ width: "30%", alignItems: "center" }}>
                        <Image
                            source={require('./../assets/search.png')}
                            style={{
                                width: 80,
                                height: 80
                            }} />
                    </View>
                    <View style={{ width: "70%" }}>

                        <Text style={{ fontFamily: "Bold", color: "#000" }}>
                            أطلب عقار
                        </Text>
                        <Text style={{ fontFamily: "Regular", color: "grey" }}>
                            سجل طلبك إذا لم تجدة في العقارات المعروضة لدينا
                        </Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("NewAdd")}
                    style={{
                        flexDirection: "row-reverse",
                        borderRadius: 10,
                        borderColor: "#DDDDDD",
                        paddingVertical: 10,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginVertical: 20,
                        paddingHorizontal: 10
                    }}>

                    <View style={{ width: "30%", alignItems: "center" }}>
                        <Image
                            source={require('./../assets/house.png')}
                            style={{
                                width: 80,
                                height: 80
                            }} />
                    </View>
                    <View style={{ width: "70%" }}>

                        <Text style={{ fontFamily: "Bold", color: "#000" }}>
                            إضافة عقار جديد
                        </Text>
                        <Text style={{ fontFamily: "Regular", color: "grey" }}>
                            إضافة عقار للبيع أو الإيجار
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}