import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from "react-native";
import Constants from "expo-constants";
import {
    AntDesign,
    EvilIcons,
    MaterialIcons,
    Entypo,
    FontAwesome,
    Ionicons
} from "@expo/vector-icons";
import styles from "./../../theme/style";
import {url} from "../../constants/constants";
import MapView, { Marker, Animated } from "react-native-maps";

export default function AddMap({ route, navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { item, prop_owner, adv_title, adv_type, prop_type, prop_price, prop_space, prop_desc } = route.params;
    const mapRef = useRef(null);
    const [auto_complete, setAutoComplete] = useState([]);
    const [latitude, setLatitude] = useState(21.4858);
    const [longitude, SetLongitude] = useState(39.1925);
    const [search_param, setSearchParam] = useState(item.prop_address);
    const reReq = async param => {
        autoComplete(param);
    };

    const autoComplete = async param => {
        fetch(
            "https://api.locationiq.com/v1/autocomplete?key=pk.6909aa77110cff9b1d7fc9c6ed08f00f&q=" +
            param +
            "&limit=5&accept-language=ar"
        )
            .then(response => response.json())
            .then(json => {
                if (json.error !== undefined) {
                    setTimeout(() => {
                        reReq(param);
                    }, 1000);
                } else {
                    setAutoComplete(json);
                }
            });
    };

    const _MapReLocation = async item => {
        setLatitude(parseFloat(item.lat));
        SetLongitude(parseFloat(item.lon));
        mapRef?.current?.animateCamera({
            center: {
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon)
            }
        })
        setSearchParam(item.display_address);
        //PushValue("geocomplete", item.display_address);
        setAutoComplete([]);
    };


    const _Proceed = async () => {
        navigation.navigate("EditImg", {
            prop_owner: prop_owner,
            adv_title: adv_title,
            adv_type: adv_type,
            prop_type: prop_type,
            prop_price: prop_price,
            prop_space: prop_space,
            prop_desc: prop_desc,
            prop_coords: latitude + "," + longitude,
            prop_address: search_param,
            item : item
        })
    };


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#F9F9F9",
                    width: "100%"
                }}>

                <View
                    style={{
                        paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight * 1.2 : Constants.statusBarHeight * 0.4,
                        paddingHorizontal: 20,
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        backgroundColor: "#fe7e25",
                        alignItems: "center",
                        height: 60,
                        width: "100%"
                    }}
                >
                    <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
                        تحديد موقع العقار
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditAdd', {
                        item: item,
                    })}>
                        <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    alignItems: "center"
                }}>

                    <View style={{ width: "100%", marginTop: 20 }}>
                        <Text style={styles.InputLabel}>
                            أختر عنوان العقار
                        </Text>
                        <View
                            style={{
                                backgroundColor: "#FFF",
                                marginBottom: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 10,
                                width: "100%",
                                fontFamily: "Regular",
                                textAlign: "right",
                                borderColor: "#DDDDDD",
                                flexDirection: "row-reverse",
                                borderWidth: 1,
                                alignItems: "center"
                            }}
                        >
                            <TextInput
                                onChangeText={value => {
                                    setSearchParam(value);
                                    setTimeout(() => {
                                        autoComplete(value);
                                    }, 1000);
                                }}
                                placeholder="أدخل عنوان البحث"
                                value={search_param}
                                autoCorrect={false}
                                style={{
                                    width: "90%",
                                    fontFamily: "Regular",
                                    textAlign: "right"
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setSearchParam("");
                                    setAutoComplete([]);
                                }}>
                                <AntDesign name="closecircle" size={24} color="grey" />
                            </TouchableOpacity>
                        </View>

                        {auto_complete.length > 0
                            ? <View
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 11
                                    },
                                    shadowOpacity: 0.7,
                                    shadowRadius: 14.78,
                                    elevation: 22,
                                    marginVertical: 20,
                                    position: "absolute",
                                    backgroundColor: "#FFF",
                                    zIndex: 27494,
                                    top: 80,
                                    paddingVertical: 20,
                                    paddingHorizontal: 10,
                                    borderRadius: 10
                                }}
                            >
                                {auto_complete.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => _MapReLocation(item)}
                                            style={{
                                                flexDirection: "row-reverse",
                                                borderBottomColor: "#dadce4",
                                                borderBottomWidth: 1,
                                                paddingVertical: 5
                                            }}
                                        >
                                            <EvilIcons
                                                name="location"
                                                size={24}
                                                color="#1DA0C9"
                                                style={{ marginHorizontal: 5 }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: "Regular",
                                                    width: "90%",
                                                    fontSize: 14,
                                                    color: "grey"
                                                }}
                                            >
                                                {item.display_address}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            : <View />}

                        <View
                            style={{
                                width: "100%",
                                height: windowHeight * 0.5,
                                borderRadius: 10,
                                overflow: "hidden",
                                borderWidth: 1,
                                borderColor: "#DDDDDD"
                            }}
                        >
                            <MapView
                                ref={mapRef}
                                showsUserLocation
                                style={{ flex: 1, width: "100%" }}
                                initialRegion={{
                                    latitude: parseFloat(item.prop_coords.split(",")[0]),
                                    longitude: parseFloat(item.prop_coords.split(",")[1]),
                                    latitudeDelta: 1.0,
                                    longitudeDelta: 1.0
                                }}
                                onRegionChangeComplete={(region) => {
                                    setLatitude(parseFloat(region.latitude));
                                    SetLongitude(parseFloat(region.longitude));
                                    // PushValue("lat", parseFloat(region.latitude));
                                    // PushValue("lng", parseFloat(region.longitude));
                                    fetch(constants.geocode_url + "lat=" + region.latitude + "&lon=" +
                                        region.longitude + "&format=json&accept-language=ar", {
                                        method: "GET"
                                    })
                                        .then(response => response.json())
                                        .then(json => {
                                            setSearchParam(json.display_name);
                                            //PushValue("geocomplete", json.display_name);
                                        })
                                }}
                            />

                        </View>

                        <View style={styles.mapMarkerContainer}>
                            <FontAwesome name="map-marker" size={60} color="#fe7e25" />
                        </View>
                    </View>
                </View>


                <TouchableOpacity
                    onPress={() => _Proceed()}
                    style={{
                        backgroundColor: "#230D33",
                        padding: 10,
                        borderRadius: 10,
                        width: "80%",
                        flexDirection: "row-reverse",
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 20
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Bold"
                        }}
                    >
                        التالي
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}