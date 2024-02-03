import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Linking,
    TextInput,
    ActivityIndicator,
    StatusBar,
    SafeAreaView,
    Dimensions,
    Platform,
    Modal
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import {
    MaterialIcons,
    Entypo,
    Ionicons,
    FontAwesome5,
    Feather,
    FontAwesome,
    AntDesign,
    MaterialCommunityIcons
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/constants";
import Constants from "expo-constants";
import { Dropdown } from 'react-native-element-dropdown';

const ProperityDetail = ({ route, navigation }) => {
    const [isLoading, setLoading] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [adv_val, setAdvVal] = useState("for_sale");

    const { prop } = route.params;
    const [user, setUser] = useState([]);
    const send_msg = "مرحبا أود الأستفسار عن العقار " + prop.adv_title;
    const Screenwidth = Dimensions.get("window").width;
    const Screenheight = Dimensions.get("window").height;


    const getAdvType = (val) => {
        switch (val) {
            case "sale":
                return "للبيع";
            case "rent":
                return "للإيجار";
            case "for_invest":
                return "للإستثمار";
            default:
                return "للبيع";
        }
    };


    const getPropType = (val) => {
        switch (val) {
            case "3":
                return "شقة";
            case "4":
                return "فيلا";
            case "5":
                return "أرض";
            case "6":
                return "عمارة";
            case "7":
                return "محل تجاري";
            case "8":
                return "مول";
            case "9":
                return "شاليه";
            case "10":
                return "إستراحة";
            case "11":
                return "مستودع";
            case "12":
                return "مصنع";
            default:
                return "أخرى";
        }
    };


    useEffect(() => {
        _retrieveData();
    }, []);




    const _retrieveData = async () => {
        try {
            const token = prop.prop_owner;
            let formData = new FormData();
            formData.append("user_token", token);
            fetch(url.base_url + "profile/user.php", {
                method: "POST",
                headers: {
                    Accept: "*/*",
                    "Content-type": "multipart/form-data;",
                    "Accept-Encoding": "gzip, deflate, br",
                    Connection: "keep-alive"
                },
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    if (json.success == true) {
                        setUser(json.data);
                    }
                    else {
                        setUser(null);
                    }
                })

                .catch(error => console.error(error));
        } catch (error) {
            console.log(error);
        }
    };



    const reportProp = async () => {
        try {
            const token = await AsyncStorage.getItem("user_token");
            let formData = new FormData();
            formData.append("user_token", token);
            formData.append("prop_id", prop.prop_id);
            fetch(url.base_url + "properties/report.php", {
                method: "POST",
                headers: {
                    Accept: "*/*",
                    "Content-type": "multipart/form-data;",
                    "Accept-Encoding": "gzip, deflate, br",
                    Connection: "keep-alive"
                },
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    setReportModalVisible(false);
                    alert(json.message);
                })

                .catch(error => console.error(error));
        } catch (error) {
            console.log(error);
        }
    };




    const adv_type = [
        {
            title: "محتوي خارح السياق العام",
            value: "1"
        },

        {
            title: "محتوي مسيء أو مسيء مقنن",
            value: "2"
        },
        {
            title: "محتوي مخالف للقانون",
            value: "3"
        },

        {
            title: "محتوي كاذب أو مضلل",
            value: "4"
        },

        {
            title: "غير ذلك",
            value: "5"
        },
    ];


    return (
        <View style={{ flex: 1, width: "100%" }}>
            <StatusBar backgroundColor="#fe7e25" barStyle="light-content" />
            <View style={{ flex: 1 }}>
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
                        بيانات الطلب
                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>






                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={reportModalVisible}
                    onRequestClose={() => {
                        setReportModalVisible(!reportModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.reportModalView}>

                            <View style={{
                                flexDirection: "row",
                                paddingHorizontal: 60,
                                paddingVertical: 10
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        alignItems: "flex-start",
                                    }}
                                    onPress={() => setReportModalVisible(!reportModalVisible)}
                                >
                                    <AntDesign name="closesquareo" size={30} color="red" />
                                </TouchableOpacity>


                                <Text style={{
                                    fontFamily: "Bold",
                                    marginVertical: 10,
                                    textAlign: "center",
                                    fontSize: 16
                                }}>
                                    الإبلاغ عن العقار
                                </Text>

                            </View>
                            <View style={{
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                width: "100%"
                            }}>

                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        marginBottom: 5,
                                        color: "#fe7e25",
                                        zIndex: 10,
                                        marginHorizontal: 10,
                                        marginBottom: 20
                                    }}
                                >
                                    اختر نوع الإعلان
                                </Text>
                                <Dropdown
                                    style={[styles.dropdown,
                                    isFocus == "type" && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                                    data={adv_type}
                                    //search
                                    maxHeight={300}
                                    labelField="title"
                                    valueField="value"
                                    placeholder={isFocus !== "type" ? 'اختر نوع المنتج ' : '...'}
                                    value={adv_val}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setAdvVal(item.value);
                                        setIsFocus(false);
                                    }}
                                    renderLeftIcon={() => (

                                        <MaterialIcons
                                            style={styles.icon}
                                            color={isFocus == "type" ? 'blue' : 'grey'}
                                            name="report" size={20} />


                                    )}
                                />
                            </View>


                            <View style={{ width: "100%", marginTop: 10 }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    textAlign: "right",
                                    marginBottom: 5,
                                    color: "#fe7e25",
                                }}>
                                    هل تريد إضافة شئ أخر ؟
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="هل تريد إضافة شئ أخر ؟"
                                    placeholderTextColor="#afaac2"
                                //onChangeText={text => setPrice(text)}
                                />
                            </View>




                            <TouchableOpacity

                                style={{
                                    marginVertical: 20,
                                    backgroundColor: "#fc910f",
                                    width: "100%",
                                    alignItems: "center",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                                onPress={() => reportProp()}
                            >
                                <Text style={{ fontFamily: "Bold", color: "#FFF" }}>
                                    إبلاغ
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={{
                    width: "100%",
                    height: 250
                }}>

                    <MapView
                        style={{
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            borderRadius: 20
                        }}
                        rotateEnabled={false}
                        scrollEnabled={false}
                        initialRegion={{
                            latitude: parseFloat(24.7136),
                            longitude: parseFloat(46.6753),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        <Marker
                            key={prop.prop_id}
                            coordinate={{
                                latitude: parseFloat(24.7136),
                                longitude: parseFloat(46.6753),
                            }}
                        >
                            <Image
                                source={require("./../../assets/location.png")}
                                style={{ width: 50, height: 50 }}
                            />
                        </Marker>
                    </MapView>
                </View>


                <View
                    style={{
                        paddingHorizontal: 30,
                        borderTopLeftRadius: 30,
                        backgroundColor: "#FFF",
                        borderTopRightRadius: 30,
                        marginTop: -20
                    }}
                >
                    {/* Icons */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 320 }}
                    >

                        <View style={{ width: "100%" }}>
                            <Text style={{
                                fontFamily: "Bold",
                                color: "#000",
                                marginVertical: 10
                            }}>
                                تفاصيل الطلب
                            </Text>
                        </View>



                        <View style={{
                            width: "100%",
                            paddingHorizontal: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            borderBottomColor: "#DDDDDD",
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "blue",
                                    marginHorizontal: 10
                                }}>
                                    الإعلان
                                </Text>
                                <FontAwesome name="buysellads" size={24} color="blue" />

                            </View>

                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",

                            }}>
                                <Text style={{
                                    fontFamily: "Bold"
                                }}>
                                    {getAdvType(prop.req_type)}
                                </Text>
                            </View>

                        </View>






                        <View style={{
                            width: "100%",
                            paddingHorizontal: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            borderBottomColor: "#DDDDDD",
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "blue",
                                    marginHorizontal: 10
                                }}>
                                    نوع العقار :
                                </Text>
                                <AntDesign name="home" size={24} color="blue" />
                            </View>

                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",

                            }}>
                                <Text style={{
                                    fontFamily: "Bold"
                                }}>
                                    {getPropType(prop.realstate_type)}
                                </Text>
                            </View>

                        </View>

                        <View style={{
                            width: "100%",
                            paddingHorizontal: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            borderBottomColor: "#DDDDDD",
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "blue",
                                    marginHorizontal: 10
                                }}>
                                    السعر
                                </Text>
                                <Ionicons name="pricetags" size={24} color="blue" />
                            </View>

                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",

                            }}>
                                {
                                    prop.price_type == "fixed" ?

                                        <Text style={{
                                            fontFamily: "Bold"
                                        }}>

                                            {prop.min_price} :  {prop.max_price}  ريال سعودي
                                        </Text>
                                        :

                                        <Text style={{ backgroundColor: "#fe7e25", paddingHorizontal: 10, borderRadius: 10 }}>
                                            سعر السوق
                                        </Text>
                                }
                            </View>

                        </View>



                        <View style={{
                            width: "100%",
                            paddingHorizontal: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            borderBottomColor: "#DDDDDD",
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "blue",
                                    marginHorizontal: 10
                                }}>
                                    المساحة :
                                </Text>
                                <MaterialCommunityIcons name="social-distance-2-meters"
                                    size={24} color="blue" />

                            </View>

                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",

                            }}>

                            </View>

                        </View>



                        <View style={{
                            width: "100%",
                            paddingHorizontal: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            borderBottomColor: "#DDDDDD",
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "blue",
                                    marginHorizontal: 10
                                }}>
                                    المنطقة
                                </Text>
                                <Entypo name="location" size={24} color="blue" />

                            </View>

                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",

                            }}>
                                <Text style={{
                                    fontFamily: "Bold"
                                }}>
                                    {prop.state}
                                </Text>
                            </View>

                        </View>





                        <View style={{
                            width: "100%",
                            paddingHorizontal: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            borderBottomColor: "#DDDDDD",
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <Text style={{
                                    fontFamily: "Bold",
                                    color: "blue",
                                    marginHorizontal: 10
                                }}>
                                    المدينة :
                                </Text>
                                <FontAwesome5 name="search-location" size={24} color="blue" />

                            </View>

                            <View style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",

                            }}>
                                <Text style={{
                                    fontFamily: "Bold"
                                }}>
                                    {prop.city}
                                </Text>
                            </View>

                        </View>



                        <View style={{ marginTop: 50, marginBottom: 20 }}>
                            <Text
                                style={{
                                    fontFamily: "Bold",
                                    fontSize: 15,
                                    textAlign: "right",
                                    color: "#000",

                                }}
                            >
                                التفاصيل :
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Regular",
                                    textAlign: "right",
                                    color: "#000",
                                    paddingHorizontal: 10

                                }}
                            >
                                {prop.req_desc}
                            </Text>
                        </View>

                        <View style={{ marginTop: 50, marginBottom: 20 }}>
                            <Text
                                style={{
                                    fontFamily: "Bold",
                                    fontSize: 15,
                                    textAlign: "right",
                                    color: "grey"
                                }}
                            >
                                معلومات المعلن
                            </Text>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    setReportModalVisible(true)
                                }
                                style={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 20,
                                    borderRadius: 10,
                                    borderColor: "red",
                                    backgroundColor: "#F77C7C",
                                    borderWidth: 1,
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: 10
                                }}
                            >

                                <Feather name="alert-triangle" size={30} color="#FFF"
                                    style={{ marginHorizontal: 10 }} />
                                <View>
                                    <Text style={{ fontFamily: "Bold", color: "#FFF" }}>
                                        للمشتركين فقط
                                    </Text>

                                    <Text style={{ fontFamily: "Regular", color: "#FFF" }}>
                                        إشترك معنا لنتواصل مع مقدم الطلب
                                    </Text>

                                </View>

                            </TouchableOpacity>
                        </View>




                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <TouchableOpacity
                                onPress={() =>
                                    setReportModalVisible(true)
                                }
                                style={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    borderColor: "red",
                                    borderWidth: 1,
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: 10
                                }}
                            >
                                <MaterialIcons name="report" size={24} color="red"
                                    style={{ marginHorizontal: 10 }} />
                                <Text style={{ fontFamily: "Bold", color: "red" }}>
                                    الابلاغ عن المحتوي
                                </Text>
                            </TouchableOpacity>
                        </View>




                    </ScrollView>
                </View>

            </View>
        </View>
    );
};

const Screenheight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        marginTop: Constants.statusBarHeight,
        marginBottom: Constants.statusBarHeight * 1.5,
    },
    Topheader: {
        backgroundColor: "#FFF",
        height: 60,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        paddingHorizontal: 20,
    },
    headline: {
        fontSize: 18,
        color: "grey",
        textAlign: "center",
        fontFamily: "Bold"
    },
    input: {
        height: 50,
        width: "100%",
        borderWidth: 1.5,
        borderColor: "#afaac2",
        padding: 10,
        fontFamily: "Regular",
        borderRadius: 10
    },
    inputLabel: {
        fontSize: 15,
        fontFamily: "Bold",
        alignSelf: "flex-end",
        marginHorizontal: 10,
        marginVertical: 10,
        color: "#143656"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginHorizontal: 20,
        paddingVertical: 10,
        width: "95%",
        height: Screenheight * 0.8,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    reportModalView: {
        marginHorizontal: 20,
        paddingVertical: 10,
        width: "95%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    dropdown: {
        backgroundColor: "#fff",
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
        fontFamily: "Regular",
        width: "100%",
        borderColor: "#DDDDDD",
        borderWidth: 1
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        fontFamily: "Regular",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        fontFamily: "Regular"
    },
    selectedTextStyle: {
        fontSize: 13,
        fontFamily: "Regular",
        marginHorizontal: 10,
        textAlign: "right"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: "Regular"
    },
    btnText: {
        fontSize: 20,
        color: "#FFF",
        fontFamily: "Bold"
    },
    headline: {
        fontSize: 20,
        marginTop: 10,
        textAlign: "center",
        fontFamily: "Bold"
    },
});

export default ProperityDetail;