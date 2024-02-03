import React, { Component, useState, useEffect } from "react";
import { Ionicons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    ActivityIndicator,
} from "react-native";

import { SimpleLineIcons, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from "../../theme/style";
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import { url } from "../../constants/constants";
import CustomHeader from "../../components/CustomHeader";
import { regions, cities, districts } from "./../../utils/address";

export default function RealEstateInfo({ navigation, route }) {
    const screenTitle = "اضافه طلب جديد";

    const [mobile_phone, setMobileSelected] = useState(false);
    const [whatsapp, setWhatsapp] = useState(false);

    const [user_token, setUserToken] = useState(null);
    const [price_type, setPriceType] = useState(null);
    const [min_price, setminPrice] = useState(0);
    const [max_price, setmaxPrice] = useState(0);

    const [min_space, setminSpace] = useState(0);
    const [max_space, setmaxSpace] = useState(0);


    const [loading, setLoading] = useState(false);
    const [prop_cat, setPropCat] = useState("");
    const [prop_state, setPropState] = useState("");
    const [prop_city, setPropCity] = useState("");
    const [prop_district, setPropDistrict] = useState("");
    const [filtered_cities, setCities] = useState([]);
    const [filtered_districts, setDistricts] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [cats, setCatigories] = useState([]);

    const [states, setStates] = useState([]);

    const [req_type, setType] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        _retrieveData();
    }, []);



    const getCitiessByRegionId = (id) => {
        setCities(cities.filter(city => city.region_id === id));
    };

    const getDistrictsByCityID = (id) => {
        const s_dist = districts.filter(district => district.city_id === id);
        if (s_dist.length > 0) {
            setDistricts(s_dist);
        }
        else {
            setDistricts([{
                "district_id": 0,
                "name_ar": "لا توجد احياء",
                "name_en": "لا توجد احياء"
            }]);
        }
    };


    const _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem("user_token");
            setUserToken(token);

            if (token == null) {
                navigation.navigate("SignInScreen");
            }
            else {
                const cache_text = await AsyncStorage.getItem("aqar_cache_data");
                const cache = JSON.parse(cache_text);
                const cached_cats = cache.data.cats;
                const cached_states = cache.data.states;
                setCatigories(cached_cats);
                setStates(cached_states);
                setUserToken(token);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const insertRequest = () => {
        let formData = new FormData();
        formData.append("user_token", user_token);
        formData.append("prop_type", prop_cat);
        formData.append("req_type", req_type);
        formData.append("state", prop_state);
        formData.append("city", prop_city);
        formData.append("price_type", price_type);
        formData.append("min_price", min_price);
        formData.append("max_price", max_price);
        formData.append("min_space", min_space);
        formData.append("max_space", max_space);

        formData.append("prop_desc", desc);
        setLoading(true);
        fetch(url.base_url + "search_for_me/insert.php", {
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
                //alert(JSON.stringify(responseJson));
                if (responseJson.success == true) {
                    alert("تم إرسال طلبك للعقاريين , نتوقع منهم الإتصال بك قريبا جدا ");
                    setLoading(false);
                    navigation.goBack();
                } else {
                    setLoading(false);
                    alert(responseJson.message);
                }

            });
    };




    const getDistricts = (city_id) => {
        fetch(url.base_url + "address/district.php?city_id=" + city_id, {
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
                    setDistricts(responseJson.data);
                } else {
                    setDistricts([
                        {
                            name: "لا يوجد أحياء متاحة",
                            state_id: 0,
                            city_id: 0
                        }
                    ]);

                }
            });
    }


    const getCities = (state_id) => {
        fetch(url.base_url + "address/city.php?state_id=" + state_id, {
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
                    setCities(responseJson.data);
                } else {
                    setCities([
                        {
                            name: "لا يوجد مدن حاليا",
                            state_id: 0,
                            city_id: 0
                        }
                    ]);

                }
            });
    }

    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            alignItems: "center",
        }}>
            <CustomHeader text={screenTitle} />
            <View style={styles.rootContainer}>

                <View style={{
                    flex: 1,
                    backgroundColor: "#fafafa",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    marginTop: -20,
                    paddingVertical: 20,
                }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{
                            paddingHorizontal: 20,
                            marginTop: 10,
                            alignItems: "center"
                        }}>


                            <View style={{
                                borderBottomColor: "#fe7e25",
                                borderBottomWidth: 10,
                                alignItems: "center",
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    fontSize: 25,
                                    marginBottom: -10
                                }}>
                                    بيانات العقار المطلوب

                                </Text>
                            </View>


                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <TouchableOpacity
                                    onPress={() => setType("rent")}
                                    style={{
                                        height: 50,
                                        width: '45%',
                                        marginHorizontal: 20,
                                        borderColor: req_type == "rent" ? "#fe7e25" : "#DDDDDD",
                                        borderWidth: 2,
                                        backgroundColor: "#FFF",
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}>

                                    <Text style={{ fontFamily: "Bold", color: "#000", marginHorizontal: 10 }}>
                                        للإيجار
                                    </Text>

                                    <FontAwesome name="home" size={40} color="#fe7e25" />

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setType("buy")}
                                    style={{
                                        height: 50,
                                        width: '45%',
                                        marginHorizontal: 20,
                                        borderColor: req_type == "buy" ? "#fe7e25" : "#DDDDDD",
                                        borderWidth: 2,
                                        backgroundColor: "#FFF",
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}>

                                    <Text style={{ fontFamily: "Bold", color: "#000", marginHorizontal: 10 }}>
                                        للشراء
                                    </Text>

                                    <FontAwesome name="home" size={40} color="#fe7e25" />

                                </TouchableOpacity>
                                <View>
                                </View>
                            </View>



                            <View
                                style={{
                                    paddingHorizontal: 5,
                                    paddingVertical: 10,
                                    marginTop: 10,
                                    width: "100%"
                                }}>

                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        marginBottom: 5,
                                        zIndex: 10,
                                        marginBottom: 20
                                    }}
                                >
                                    اختر نوع العقار
                                </Text>
                                <Dropdown
                                    style={[styles.dropdown,
                                    isFocus == "prop_type" && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
                                    data={cats}
                                    //search
                                    maxHeight={300}
                                    labelField="title"
                                    valueField="title"
                                    placeholder={isFocus !== "prop_type" ? 'اختر نوع العقار ' : '...'}
                                    //  value={prop_cat}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setPropCat(item.type_id);
                                        setIsFocus(false);
                                    }}
                                    renderRightIcon={() => (
                                        <MaterialCommunityIcons style={styles.icon} name="home-city" size={24} color="#fe7e25" />
                                    )}

                                    renderLeftIcon={() => (
                                        <MaterialIcons name="keyboard-arrow-down" size={30} color="grey" />
                                    )}
                                />
                            </View>

                            <View
                                style={{
                                    paddingHorizontal: 5,
                                    paddingVertical: 10,
                                    marginTop: 10,
                                    width: "100%"
                                }}>

                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        marginBottom: 5,
                                        zIndex: 10,
                                        marginHorizontal: 10,
                                        marginBottom: 20
                                    }}
                                >
                                    اختر  المنطقة
                                </Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{ fontFamily: "Regular", fontSize: 12, textAlign: "right" }}
                                    data={regions}
                                    search
                                    searchPlaceholder="ابحث عن المنطقه"
                                    maxHeight={300}
                                    labelField="name_ar"
                                    valueField="region_id"
                                    placeholder={"اختر المنطقة المطلوبة"}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        getCitiessByRegionId(item.region_id);
                                        setPropState(item.region_id);
                                    }}
                                    renderRightIcon={() =>
                                        <Ionicons
                                            style={styles.icon}
                                            name="location-sharp"
                                            size={24}
                                            color="#fe7e25"
                                        />}
                                    renderLeftIcon={() =>
                                        <MaterialIcons
                                            name="keyboard-arrow-down"
                                            size={30}
                                            color="grey"
                                        />}
                                />
                            </View>



                            <View
                                style={{
                                    paddingHorizontal: 5,
                                    paddingVertical: 10,
                                    marginTop: 10,
                                    width: "100%"
                                }}>

                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        marginBottom: 5,
                                        zIndex: 10,
                                        marginHorizontal: 10,
                                        marginBottom: 20
                                    }}
                                >
                                    اختر  المدينة
                                </Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{ fontFamily: "Regular", fontSize: 12, textAlign: "right" }}
                                    data={filtered_cities}
                                    search
                                    searchPlaceholder="ابحث عن المدينة"
                                    maxHeight={300}
                                    labelField="name_ar"
                                    valueField="city_id"
                                    placeholder={"اختر المدينة المطلوبة"}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        getDistrictsByCityID(item.city_id);
                                        setPropCity(item.city_id);
                                    }}
                                    renderRightIcon={() =>
                                        <Ionicons
                                            style={styles.icon}
                                            name="location-sharp"
                                            size={24}
                                            color="#fe7e25"
                                        />}
                                    renderLeftIcon={() =>
                                        <MaterialIcons
                                            name="keyboard-arrow-down"
                                            size={30}
                                            color="grey"
                                        />}
                                />
                            </View>


                            <View
                                style={{
                                    paddingHorizontal: 5,
                                    paddingVertical: 10,
                                    marginTop: 10,
                                    width: "100%"
                                }}>

                                <Text
                                    style={{
                                        fontFamily: "Bold",
                                        textAlign: "right",
                                        marginBottom: 5,
                                        zIndex: 10,
                                        marginHorizontal: 10,
                                    }}
                                >
                                    اخترالحي
                                </Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{ fontFamily: "Regular", fontSize: 12, textAlign: "right" }}
                                    data={filtered_districts}
                                    search
                                    searchPlaceholder="ابحث عن الحي"
                                    maxHeight={300}
                                    labelField="name_ar"
                                    valueField="district_id"
                                    placeholder={"اختر الحي"}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setPropDistrict(item.name);
                                    }}
                                    renderRightIcon={() =>
                                        <Ionicons
                                            style={styles.icon}
                                            name="location-sharp"
                                            size={24}
                                            color="#fe7e25"
                                        />}
                                    renderLeftIcon={() =>
                                        <MaterialIcons
                                            name="keyboard-arrow-down"
                                            size={30}
                                            color="grey"
                                        />}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginTop: 10,
                                width: "100%"
                            }}>


                            <View style={{
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                marginVertical: 10
                            }}>
                                <View style={{
                                    backgroundColor: "#FFF",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15
                                }}>
                                    <SimpleLineIcons name="notebook" size={24} color="#fe7e25" />

                                </View>
                                <Text style={{
                                    fontFamily: "Bold"
                                }}>
                                    وصف العقار
                                </Text>

                            </View>


                            <TextInput
                                onChangeText={value => setDesc(value)}
                                placeholder="أدخل وصف العقار"
                                multiline
                                style={styles.InputTextArea}
                            />
                        </View>




                        <View
                            style={{
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginTop: 10,
                                width: "100%",
                                alignItems: "center",

                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Bold",
                                    width: "100%",
                                    textAlign: "right",
                                    marginBottom: 20
                                }}
                            >
                                السعر
                            </Text>

                            <View style={{
                                width: "80%",
                                flexDirection: "row",
                                alignItems: "center",

                            }}>
                                <TouchableOpacity
                                    onPress={() => setPriceType('open')}
                                    style={{
                                        width: "50%",
                                        borderWidth: 1,
                                        borderColor: "#DDDDDD",
                                        height: 50,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: price_type == "open" ? "#fe7e25" : "#FFF",
                                        borderTopLeftRadius: 20,
                                        borderBottomLeftRadius: 20
                                    }}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            color: price_type == "open" ? "#FFF" : "grey",
                                        }}>
                                            سعر السوق
                                        </Text>
                                        <FontAwesome5 name="funnel-dollar" size={24}
                                            color={price_type == "open" ? "#FFF" : "#fe7e25"} />

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setPriceType('fixed')}
                                    style={{
                                        width: "50%",
                                        borderWidth: 1,
                                        backgroundColor: "#FFF",
                                        borderColor: "#DDDDDD",
                                        height: 50,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: price_type == "fixed" ? "#fe7e25" : "#FFF",
                                        borderTopRightRadius: 20,
                                        borderBottomRightRadius: 20
                                    }}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}>
                                        <Text style={{
                                            fontFamily: "Bold",
                                            color: price_type == "fixed" ? "#FFF" : "grey",
                                        }}>
                                            ميزانية محددة
                                        </Text>

                                        <Feather name="dollar-sign" size={24}
                                            color={price_type == "fixed" ? "#FFF" : "#fe7e25"} />

                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>

                        {price_type == "fixed" ?
                            <View style={{ width: "100%" }}>

                                <View
                                    style={{
                                        paddingHorizontal: 30,
                                        paddingVertical: 10,
                                        marginTop: 10,
                                        width: "100%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Bold",
                                            width: "100%",
                                            textAlign: "center"
                                        }}
                                    >
                                        اختر الحد الأدنى والأعلى للسعر
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        paddingHorizontal: 30,
                                        flexDirection: "row-reverse",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    <View style={{ width: "35%" }}>
                                        <TextInput
                                            placeholder="من"
                                            keyboardType="numeric"
                                            onChangeText={price => setminPrice(price)}
                                            style={{
                                                height: 40,
                                                marginBottom: 20,
                                                paddingHorizontal: 10,
                                                backgroundColor: "#FFF",
                                                borderRadius: 20,
                                                width: "100%",
                                                fontFamily: "Regular",
                                                textAlign: "right",
                                                borderColor: "#DDDDDD",
                                                borderWidth: 1.5
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width: "10%",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Octicons name="dash" size={30} color="black" />

                                    </View>
                                    <View style={{ width: "35%" }}>
                                        <TextInput
                                            placeholder="الي"
                                            placeholderStyle={{ textAlign: "center" }}
                                            keyboardType="numeric"
                                            onChangeText={price => setmaxPrice(price)}
                                            style={{
                                                height: 40,
                                                marginBottom: 20,
                                                backgroundColor: "#FFF",
                                                paddingHorizontal: 10,
                                                borderRadius: 20,
                                                width: "100%",
                                                fontFamily: "Regular",
                                                textAlign: "right",
                                                borderColor: "#DDDDDD",
                                                borderWidth: 1.5
                                            }}
                                        />
                                    </View>
                                </View>

                            </View>
                            :

                            null}



                        <View
                            style={{
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginTop: 10,
                                width: "100%"
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Bold",
                                    width: "100%",
                                }}
                            >
                                اختر الحد الأدنى والأعلى للمساحة المطلوبة
                            </Text>
                        </View>

                        <View
                            style={{
                                paddingHorizontal: 30,
                                flexDirection: "row-reverse",
                                justifyContent: "space-around"
                            }}
                        >
                            <View style={{ width: "35%" }}>
                                <TextInput
                                    placeholder="من"
                                    keyboardType="numeric"
                                    onChangeText={price => setminSpace(price)}
                                    style={{
                                        height: 40,
                                        marginBottom: 20,
                                        paddingHorizontal: 10,
                                        backgroundColor: "#FFF",
                                        borderRadius: 20,
                                        width: "100%",
                                        fontFamily: "Regular",
                                        textAlign: "right",
                                        borderColor: "#DDDDDD",
                                        borderWidth: 1.5
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    width: "10%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Octicons name="dash" size={30} color="black" />
                            </View>
                            <View style={{ width: "35%" }}>
                                <TextInput
                                    placeholder="الي"
                                    placeholderStyle={{ textAlign: "center" }}
                                    keyboardType="numeric"
                                    onChangeText={price => setmaxSpace(price)}
                                    style={{
                                        height: 40,
                                        marginBottom: 20,
                                        backgroundColor: "#FFF",
                                        paddingHorizontal: 10,
                                        borderRadius: 20,
                                        width: "100%",
                                        fontFamily: "Regular",
                                        textAlign: "right",
                                        borderColor: "#DDDDDD",
                                        borderWidth: 1.5
                                    }}
                                />
                            </View>
                        </View>



                        <View
                            style={{
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginTop: 10,
                                width: "100%"
                            }}>

                            <Text style={styles.InputLabel}>
                                أرغب في إستلام العروض من خلال  :
                            </Text>

                            <Text style={{
                                color: "grey",
                                fontFamily: "Regular",
                                paddingHorizontal: 10,
                                marginVertical: 20
                            }}>
                                وسائل التواصل المتعددة تتيح لأكبر عدد من العقاريون للتواصل معك :
                            </Text>

                        </View>

                        <View style={{
                            paddingHorizontal: 30
                        }}>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#FFF",
                                borderRadius: 20,
                                padding: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,
                                elevation: 6,
                                marginVertical: 10
                            }}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        setMobileSelected(!mobile_phone);
                                    }}
                                    isChecked={mobile_phone}
                                    rightText={"اتصال هاتفي"}
                                    rightTextStyle={{
                                        fontFamily: "Bold",
                                    }}
                                />
                                <Feather name="phone-call" size={24} color="#fe7e25" />
                            </View>



                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#FFF",
                                borderRadius: 20,
                                padding: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,
                                elevation: 6,
                            }}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        setWhatsapp(!whatsapp);
                                    }}
                                    isChecked={whatsapp}
                                    rightText={"واتساب"}
                                    rightTextStyle={{
                                        fontFamily: "Bold",

                                    }}
                                />
                                <FontAwesome name="whatsapp" size={24} color="#fe7e25" />
                            </View>
                        </View>


                        <View style={{
                            paddingHorizontal: 20,
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 50
                        }}>
                            <TouchableOpacity
                                onPress={() => insertRequest()}
                                style={{
                                    backgroundColor: "#fe7e25",
                                    width: "100%",
                                    paddingHorizontal: 40,
                                    padding: 10,
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 50
                                }}
                            >
                                {loading == true ?
                                    <ActivityIndicator size={40} color={"#FFF"} /> :

                                    <View style={{ flexDirection: "row-reverse" }}>

                                        <Text
                                            style={{
                                                color: "white",
                                                textAlign: "center",
                                                fontFamily: "Bold",
                                                paddingHorizontal: 20,
                                                fontSize: 20
                                            }}
                                        >
                                            إرسال
                                        </Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}