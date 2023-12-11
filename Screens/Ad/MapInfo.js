import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  AntDesign,
  EvilIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import styles from "./../../theme/style";
import { url } from "../../constants/constants";
import MapView from "react-native-maps";
import CustomHeader from "./../../components/CustomHeader";
import * as Progress from "react-native-progress";

export default function AddMap({ route, navigation }) {

  const {jsonForm}  = route.params;
  const screenTitle = "إختر عنوان العقار";
  const [sidear_visible, setSideBarVisible] = useState(true);

  const mapRef = useRef(null);
  const [auto_complete, setAutoComplete] = useState([]);
  const [latitude, setLatitude] = useState(21.4858);
  const [longitude, SetLongitude] = useState(39.1925);
  const [search_param, setSearchParam] = useState("");
  const reReq = async param => {
    autoComplete(param);
  };

  const autoComplete = async param => {
    fetch(url.locationIQ + param + "&limit=5&accept-language=ar")
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
      setAutoComplete([]);
  };

  const _Proceed = async () => {

  const formData = [
    {
      input_key : "address",
      input_value : search_param
    },
    {
      input_key : "prop_coords",
      input_value : latitude + "," +longitude
    },
  ];

  const concatenatedJson = [...jsonForm, ...formData]; 
    navigation.navigate("AdMediaInfo",{
      jsonForm : concatenatedJson
    });
   // console.log(concatenatedJson);
  };


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#F9F9F9",
          width: "100%"
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 25,
            left: 20,
            zIndex: 1000
          }}
        >
          <Progress.Pie
            progress={0.5}
            size={40}
            color="#FFF"
            borderWidth={1.5}
          />
        </View>
        <CustomHeader text={screenTitle} />

        {sidear_visible == true
          ? <View
              style={{
                position: "absolute",
                width: 50,
                right: 10,
                zIndex: 1,
                top: 250
              }}
            >
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#fe7e25",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  marginVertical: 10,
                  borderColor: "#FFF",
                  borderWidth: 2
                }}
              >
                <FontAwesome name="th-list" size={24} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#fe7e25",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  marginVertical: 10,
                  borderColor: "#FFF",
                  borderWidth: 2
                }}
              >
                <FontAwesome5 name="satellite" size={24} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#fe7e25",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  marginVertical: 10,
                  borderColor: "#FFF",
                  borderWidth: 2
                }}
              >
                <Ionicons name="ios-location-sharp" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          : null}
        <View
          style={{
            width: "100%",
            flex: 1,
            backgroundColor: "#fafafa",
            alignItems: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 7,
            marginTop: -20,
            paddingHorizontal: 10
          }}
        >
          <View style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                zIndex: 1000,
                position: "absolute",
                top: 20,
                backgroundColor: "#FFF",
                marginBottom: 20,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 30,
                height: 60,
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
                  height: 50,
                  fontFamily: "Regular",
                  textAlign: "right"
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setSearchParam("");
                  setAutoComplete([]);
                }}
              >
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

            <MapView
              ref={mapRef}
              showsUserLocation
              provider="google"
              style={{ flex: 1, width: "100%", height: "100%" }}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 1.0,
                longitudeDelta: 1.0
              }}
              //mapType="satellite"
              onRegionChangeComplete={region => {
                setLatitude(parseFloat(region.latitude));
                SetLongitude(parseFloat(region.longitude));
                fetch(
                  url.geocode_url +
                    "lat=" +
                    region.latitude +
                    "&lon=" +
                    region.longitude +
                    "&format=json&accept-language=ar",
                  {
                    method: "GET"
                  }
                )
                  .then(response => response.json())
                  .then(json => {
                    setSearchParam(json.display_name);
                  });
              }}
            />

            <View style={styles.mapMarkerContainer}>
              <FontAwesome name="map-marker" size={60} color="#fe7e25" />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => _Proceed()}
          style={{
            position: "absolute",
            bottom: 20,
            backgroundColor: "#fe7e25",
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
          <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
