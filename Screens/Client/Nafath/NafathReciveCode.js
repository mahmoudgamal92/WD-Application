

import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Platform,
    TextInput,
    ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../../theme/style";
import CustomHeader from "../../../components/CustomHeader";
import { Iconify } from "react-native-iconify";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function NafathNationalID({ route, navigation }) {
    const screenTitle = "أدخل رقم الهوية الشخصية";

    const [loading, setLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#F9F9F9",
                width: "100%"
            }}
        >
            <CustomHeader text={screenTitle} />
            <View style={styles.rootContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}
                    contentContainerStyle={{
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            marginTop: 20,
                            paddingHorizontal: 20,
                            alignItems: "center"
                        }}>

                        <View
                            style={{
                                borderBottomColor: "#fe7e25",
                                borderBottomWidth: 10,
                                alignItems: "center",
                                marginVertical: 20,
                                paddingHorizontal: 10
                            }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    fontSize: 25,
                                    marginBottom: -10
                                }}
                            >
                                رقم الهوية الشخصي
                            </Text>
                        </View>

                        <View style={{
                            margninVertical: 100
                        }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Regular",
                                    fontSize: 14,
                                }}
                            >
                                من فضلك أدخل رقم هوية صالح مسجل في نفاذ لإرسال طلب التسجيل إلي حسابك في نفاذ
                            </Text>
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
                                marginVertical: 5,
                                height: 58,
                                marginTop: 40
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
                                    أدخل رقم الهوية
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <TextInput
                                    selectionColor={"#fe7e25"}
                                    onChangeText={license_num => setLisenceNumber(license_num)}
                                    keyboardType="numeric"
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
                                        left: 0,
                                        position: "absolute",
                                        padding: 17,
                                        flexDirection: "row-reverse"
                                    }}
                                >
                                    <AntDesign name="idcard" size={24} color={"#fe7e25"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => insertReuest()}
                        style={{
                            backgroundColor: "#fe7e25",
                            marginBottom: 40,
                            padding: 10,
                            borderRadius: 10,
                            width: "80%",
                            flexDirection: "row-reverse",
                            justifyContent: "center",
                            alignItems: "space-around",
                            marginTop: 40
                        }}
                    >
                        {loading == false
                            ? <View
                                style={{
                                    flexDirection: "row-reverse",
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontFamily: "Bold"
                                    }}
                                >
                                    متابعة
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-left"
                                    size={24}
                                    color="#FFF"
                                />
                            </View>
                            : <ActivityIndicator size="large" color="#FFF" />}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}
