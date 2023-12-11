import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Platform,
    ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import {
    MaterialIcons,
    Ionicons
} from "@expo/vector-icons";
import styles from "./../../theme/style";
import {url} from "../../constants/constants";
export default function EditImg({ route, navigation }) {
    const { item, prop_owner, adv_title, adv_type, prop_type, prop_price, prop_space, prop_desc, prop_coords, prop_address } = route.params;
    const [images, setImages] = useState([]);
    const [curren_images, setCurrenImages] = useState(item.prop_images.split(","));
    const [loading, setLoading] = useState(false);
    const [avatar_img, setAvatarImg] = useState("https://bnookholding.com/img/img_avatar.png");
    console.log("fffffffff => ",curren_images);

    const insertAdd = async () => {
        let formData = new FormData();
        formData.append("adv_number", item.adv_number);
        formData.append("adv_title", adv_title);
        formData.append("adv_type", adv_type);
        formData.append("prop_type", prop_type);
        formData.append("prop_price", prop_price);
        formData.append("prop_space", prop_space);
        formData.append("prop_desc", prop_desc);
        formData.append("prop_coords", prop_coords);
        formData.append("prop_address", prop_address);
        images.map((item, index) => {
            formData.append("images[]", {
                uri: item.uri,
                name: item.name,
                type: item.type
            });
        });

        setLoading(true);
        fetch(url.base_url + "properties/update.php", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-type": "multipart/form-data;",
                "cache-control": "no-cache",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive"
            },
            body: formData
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success == true) {
                    alert("تم تحديث الإعلان بنجاح");
                    navigation.replace("PersonalProperites");
                } else {
                    setLoading(false);
                    //navigation.goBack();
                }
            });
    };

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
                setImages([...images, {
                    uri: localUri,
                    name: filename,
                    type: img_type
                }]);
            }
        } catch (E) {
            console.log(E);
        }
    };


    const _removeImg = async src => {
        setImages(images.filter(item => item.uri !== src));
    };


    return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#F9F9F9",
                    width: "100%",
                }}>

                <View
                    style={{
                        paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight * 1.2 : 0,
                        paddingHorizontal: 20,
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        backgroundColor: "#fe7e25",
                        alignItems: "center",
                        height: 60,
                        width: "100%"
                    }}>
                    <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
                        {adv_title}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ width: "100%" }}
                    contentContainerStyle={{
                        alignItems: "center",

                    }}
                >





                    <View style={{ width: "100%", marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={styles.InputLabel}>
                            صور العقار الحالية
                        </Text>

                        <View
                            style={{
                                width: "100%",
                                marginBottom: 10,
                                flexDirection: "row-reverse",
                                flexWrap: "wrap"
                            }}
                        >
                            {curren_images.map((item, index) => {
                                return (
                                    <View>
                                        <TouchableOpacity
                                            //  onPress={() => _removeImg(item.src)}
                                            style={{ marginBottom: -20, zIndex: 849849 }}
                                        >
                                            <Image
                                                source={require("./../../assets/cross.png")}
                                                style={{ width: 30, height: 30 }}
                                            />
                                        </TouchableOpacity>
                                        <Image
                                            source={{ uri: url.media_url + item.toString() }}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 10,
                                                marginHorizontal: 5
                                            }}
                                        />
                                    </View>
                                );
                            })}
                        </View>

                    </View>



                    <View style={{ width: "100%", marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={styles.InputLabel}>
                            إضافة صور العقار
                        </Text>

                        <View
                            style={{
                                width: "100%",
                                marginBottom: 10,
                                flexDirection: "row-reverse",
                                flexWrap: "wrap"
                            }}
                        >
                            {images.map((item, index) => {
                                return (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => _removeImg(item.uri)}
                                            style={{ marginBottom: -20, zIndex: 849849 }}
                                        >
                                            <Image
                                                source={require("./../../assets/cross.png")}
                                                style={{ width: 30, height: 30 }}
                                            />
                                        </TouchableOpacity>
                                        <Image
                                            source={{ uri: item.uri }}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 10,
                                                marginHorizontal: 5
                                            }}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <TouchableOpacity
                                onPress={() => _pickImage()}
                                style={{
                                    alignItems: "center",
                                    marginBottom: 20,
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={{ uri: avatar_img }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        resizeMode: "contain",
                                        borderRadius: 10
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>






                  


            

                    <TouchableOpacity
                        onPress={() => insertAdd()}
                        style={{
                            backgroundColor: "#230D33",
                            marginBottom: 40,
                            padding: 10,
                            borderRadius: 10,
                            width: "80%",
                            flexDirection: "row-reverse",
                            justifyContent: "center",
                            alignItems: "space-around",
                            marginTop: 100
                        }}
                    >
                        {loading == false ?
                            <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontFamily: "Regular"
                                    }}
                                >
                                 تأكيد , تعديل الإعلان
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-left"
                                    size={24}
                                    color="#FFF"
                                />
                            </View>
                            :
                            <ActivityIndicator size="large" color="#FFF" />
                        }

                    </TouchableOpacity>
                </ScrollView>

            </View>
    );
}