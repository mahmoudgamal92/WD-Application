import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    TextInput,
    Image
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import styles from "./../theme/style";
import CustomHeader from "./../components/CustomHeader";
import { url } from "./../constants/constants";
import Toast from "react-native-toast-message";
import toastConfig from "./../components/Toast";

export default function Complains({ route, navigation }) {
    const screenTitle = "الشكاوي و المقترحات";
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [details, setDetails] = useState("");


    const _sendComplaint = () => {
        let formData = new FormData();
        formData.append("user_token", phone);
        formData.append("phone", parseInt("966" + phone));
        formData.append("subject", subject);
        formData.append("details", details);
        setLoading(true);
        fetch(url.base_url + "complains/insert.php", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "cache-control": "no-cache",
                "Content-type": "multipart/form-data;",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive"
            },
            body: formData
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success == true) {
                    Toast.show({
                        type: "successToast",
                        text1: responseJson.message,
                        bottomOffset: 80,
                        visibilityTime: 2000
                    });
                    console.log(responseJson);
                    setLoading(false);
                    setDetails("");
                    setPhone("");
                    setSubject("");
                }
                else {
                    setLoading(false);
                    Toast.show({
                        type: "erorrToast",
                        text1: "هناك خطأ , الرجاء التأكد من رقم الجوال",
                        bottomOffset: 80,
                        visibilityTime: 2000
                    });
                    // alert("Failed");
                }
            });
    };
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
                    }}>

                    <View
                        style={{
                            width: "100%",
                            marginTop: 20,
                            paddingHorizontal: 20,
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                borderBottomColor: "#fe7e25",
                                borderBottomWidth: 10,
                                alignItems: "center",
                                marginVertical: 20,
                                paddingHorizontal: 10
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    fontSize: 25,
                                    marginBottom: -10
                                }}
                            >
                                الشكاوي و المقترحات
                            </Text>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                borderRadius: 10,
                                aspectRatio: 1,
                                overflow: "hidden",
                                borderRadius: 10,
                                marginBottom: 40
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
                                }}>
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
                                        رقم جوال للمتابعة
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
                                        onChangeText={phone_number => setPhone(phone_number)}
                                        keyboardType="numeric"
                                        defaultValue={phone}
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
                                            padding: 17,
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
                                            source={require("./../assets/ksa.png")}
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
                                }}>
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
                                        العنوان الرئيسي للموضوع
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
                                        selectionColor={"grey"}
                                        onChangeText={param => setSubject(param)}
                                        defaultValue={subject}
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
                                    height: 150
                                }}>
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
                                        التفاصيل
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
                                        selectionColor={"grey"}
                                        onChangeText={param => setDetails(param)}
                                        defaultValue={details}
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
                                </View>
                            </View>


                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => _sendComplaint()}
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
            <Toast config={toastConfig} />

        </View>
    );
}
