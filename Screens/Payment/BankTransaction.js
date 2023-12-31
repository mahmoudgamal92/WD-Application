import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Platform,
    TextInput,
    ScrollView,

} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import {
    Ionicons,
    AntDesign,
    FontAwesome
} from "@expo/vector-icons";
import styles from "./../../theme/style";
import CustomHeader from "./../../components/CustomHeader";
import { Iconify } from "react-native-iconify";
import COLORS from "../../utils/colors";
export default function AddImg({ route, navigation }) {
    const [images, setImages] = useState([]);
    const [current_bank, setCurrentBank] = useState("");
    const screenTitle = "التحويل البنكي";

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                let localUri = result.uri;
                let filename = localUri.split("/").pop();
                let match = /\.(\w+)$/.exec(filename);
                let img_type = match ? `image/${match[1]}` : `image`;
                setImages([
                    ...images,
                    {
                        uri: localUri,
                        name: filename,
                        type: img_type,
                    },
                ]);
            }
        } catch (E) {
            console.log(E);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#F9F9F9",
                width: "100%",
            }}
        >
            <CustomHeader text={screenTitle} />
            <View style={styles.rootContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            marginTop: 20,
                            paddingHorizontal: 20,
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                borderBottomColor: "#fe7e25",
                                borderBottomWidth: 10,
                                alignItems: "center",
                                marginVertical: 20,
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    fontSize: 25,
                                    marginBottom: -10,
                                }}
                            >
                                التحويل البنكي
                            </Text>
                        </View>

                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Bold",
                                fontSize: 16,
                            }}
                        >
                            من فضلك قم باختيار البنك الخاص بك
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 15,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setCurrentBank("alrajhi")}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: current_bank == 'alrajhi' ? COLORS.primary : COLORS.lightGray,
                                backgroundColor: "#FFF",
                            }}
                        >
                            <Image
                                source={require("./../../assets/banks/alrajhi.png")}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "cover",
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setCurrentBank("qnb")}

                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: current_bank == 'qnb' ? COLORS.primary : COLORS.lightGray,
                                backgroundColor: "#FFF",
                                padding: 5,
                            }}
                        >
                            <Image
                                source={require("./../../assets/banks/qnb.png")}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "cover",
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setCurrentBank("snb")}

                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: current_bank == 'snb' ? COLORS.primary : COLORS.lightGray,
                            }}
                        >
                            <Image
                                source={require("./../../assets/banks/snb.jpg")}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "cover",
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            paddingHorizontal: 20,
                        }}
                    >


                        <View>
                            <View style={{
                                flexDirection: "row-reverse",
                                alignItems: "center",

                            }}>
                                <FontAwesome name="bank" size={24} color={COLORS.black} />
                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        margin: 10,
                                        color: COLORS.black
                                    }}
                                >
                                    رقم الحساب
                                </Text>

                            </View>


                            <View style={{
                                backgroundColor: "#FFF",
                                borderColor: "#DDDDDD",
                                borderWidth: 1,
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                padding: 10,
                                borderRadius: 10
                            }}>

                                <Ionicons name="copy" size={24} color={COLORS.primary} />
                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        color: "grey",
                                    }}
                                >
                                    +2142245614652456124650
                                </Text>
                            </View>
                        </View>





                        <View>
                            <View style={{
                                flexDirection: "row-reverse",
                                alignItems: "center",

                            }}>
                                <AntDesign name="bank" size={24} color="black" />
                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        margin: 10,
                                        color: COLORS.black
                                    }}
                                >
                                    رقم الايبان
                                </Text>

                            </View>


                            <View style={{
                                backgroundColor: "#FFF",
                                borderColor: "#DDDDDD",
                                borderWidth: 1,
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                padding: 10,
                                borderRadius: 10
                            }}>

                                <Ionicons name="copy" size={24} color={COLORS.primary} />
                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        color: "grey",
                                    }}
                                >
                                    +2142245614652456124650
                                </Text>
                            </View>
                        </View>





                        <View>
                            <View style={{
                                flexDirection: "row-reverse",
                                alignItems: "center",

                            }}>
                                <AntDesign name="bank" size={24} color="black" />
                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        margin: 10,
                                        color: COLORS.black
                                    }}
                                >
                                    الرقم الضريبي
                                </Text>

                            </View>


                            <View style={{
                                backgroundColor: "#FFF",
                                borderColor: "#DDDDDD",
                                borderWidth: 1,
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                padding: 10,
                                borderRadius: 10
                            }}>

                                <Ionicons name="copy" size={24} color={COLORS.primary} />
                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        color: "grey",
                                    }}
                                >
                                    +2142245614652456124650
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => _pickImage()}
                        style={{
                            marginBottom: 20,
                            backgroundColor: "#FFF",
                            marginTop: 10,
                            borderColor: "#fe7e25",
                            borderWidth: 2,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                        }}
                    >
                        <Iconify icon="solar:upload-bold" size={30} color={"#fe7e25"} />
                        <Text
                            style={{
                                fontFamily: "Bold",
                                color: "#000",
                            }}
                        >
                            قم برفع الايصال
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            padding: 10,
                        }}
                    >
                        <AntDesign name="checksquareo" size={24} color="#fe7e25" />
                        <Text
                            style={{
                                fontFamily: "Regular",
                                color: "#000",
                                marginHorizontal: 10,
                            }}
                        >
                            اتعهد واقر على سياسه الاسترجاع في تطبيق ود
                        </Text>
                    </View>



                    <TouchableOpacity
                        onPress={() => navigation.navigate("BankTransaction")}
                        style={{
                            width: "90%",
                            backgroundColor: "#fe7e25",
                            padding: 10,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 20
                        }}>
                        <Text style={{
                            color: "#FFF",
                            fontFamily: "Bold"

                        }}>
                            متابعه
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}
