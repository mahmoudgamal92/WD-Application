import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../theme/style";
import {url} from "../../constants/constants";
export default function MapScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [cats, setCatigories] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isActive, setIsActive] = useState();
  const [ref, setRef] = useState(null);
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);


  const [latitude, setLatitude] = useState(26.8859);
  const [longitude, SetLongitude] = useState(44.0792);
  const [latitudeDelta, setlatitudeDelta] = useState(18.0000);
  const [longitudeDelta, setlongitudeDelta] = useState(18.000);

  const [mapData, setMapData] = useState("states");
  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    const cache_text = await AsyncStorage.getItem("aqar_cache_data");
    const cache = JSON.parse(cache_text);
    const cached_cats = cache.data.cats;
    const cached_states = cache.data.states;
    setCatigories(cached_cats);
    setStates(cached_states);
  };


  const _getProps = async (state_name ,lat , long) => {

    try {
      setLoading(true);
      fetch(url.base_url + "properties/map.php?prop_state=" + state_name, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          if (json.success == true) {

            setMapData("props");
            setData(json.data);
            setlatitudeDelta(10.000);
            setlatitudeDelta(10.000);
            _MapReLocation(parseFloat(lat), parseFloat(long));
            setScrollEnabled(true);
            setZoomEnabled(true);
          
          }

          else {
            alert("لا يوجد عقارات متاحة حاليا في " + state_name);
          }
        })
        // .then(json => {
        //   setIsActive(cats[0].adv_id);
        // })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }

  const getAdvType = (val) => {
    switch (val) {
      case "for_sale":
        return "للبيع";
      case "for_rent":
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



  const _MapReLocation = async (lat, long) => {
      // setlatitudeDelta(1.5443);
      // setlongitudeDelta(1.34793);
    mapRef?.current.animateToRegion({
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
      latitudeDelta : 16,
      longitudeDelta : 16,
    });
  };

  const getCatItems = (item_id) => {
    setIsActive(item_id);
    setLoading(true);
    const url = url.base_url + "properties/list.php?type=" + item_id;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "cache-control": "no-cache",
      }
    }
    )
      .then(response => response.json())
      .then(json => {
        if (json.success == "true") {
          setData(json.data);
          _MapReLocation(
            parseFloat(json.data[0].prop_coords.split(",")[0]),
            parseFloat(json.data[0].prop_coords.split(",")[1]),
          );
          setLoading(false);
          //alert(JSON.stringify(json.data));
        }
        else {
          setData([]);
          alert("لا يوجد عقارات في هذه الفئة");
          setSelectedItem(null);
        }
      })
      .finally(() => setLoading(false));
  };

  const renderProps = () => {
    return data.map(item => {
      return (
        <Marker
          key={item.id}
          // title={item.title}
          // description={item.description}
          onPress={() => {
            setSelected(true);
            setSelectedItem(item);
          }}
          coordinate={{
            latitude: parseFloat(item.prop_coords.split(",")[0]) || 0,
            longitude: parseFloat(item.prop_coords.split(",")[1]) || 0
          }}
        >
          <View
            style={{
              backgroundColor: "#fe7e25",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              // borderBottomLeftRadius:10,
              // borderBottomRightRadius:10,
              // borderTopLeftRadius:10,
              // borderColor:"#143656",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              overflow: "visible"
            }}
          >
            <Text style={{ color: "#FFF", fontFamily: "Bold", fontSize: 12 }}>
              {item.prop_price}
            </Text>
          </View>
        </Marker>
      );
    });
  };


  onRegionChange = region => {
    console.log(region);

    if (region.latitudeDelta > 45) {
      setMapData("states");
      setZoomEnabled(false);
      setScrollEnabled(false);
      setSelectedItem(null);
      _MapReLocation(26.8859,44.0792);
    }


  }


  const renderStates = () => {
    return states.map(item => {
      return (
        <Marker
          key={item.id}
          onPress={() => {
            // setSelected(true);
            // setSelectedItem(item);
            _getProps(item.name, parseFloat(item.coords.split(",")[0]), parseFloat(item.coords.split(",")[1]));
          }}
          coordinate={{
            latitude: parseFloat(item.coords.split(",")[0]) || 0,
            longitude: parseFloat(item.coords.split(",")[1]) || 0
          }}
        >
          <View
            style={{
              backgroundColor: "#fe7e25",
              paddingVertical: 5,
              paddingHorizontal: 10,
              //borderRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 10,
              borderColor: "#143656",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              overflow: "visible"
            }}
          >
            <Text style={{ color: "#FFF", fontFamily: "Bold", fontSize: 12 }}>
              {item.name}
            </Text>
          </View>
        </Marker>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          backgroundColor: "#fe7e25",
          alignItems: "center",
          height: 60
        }}
      >
        <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
          عرض الخريطة
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={{
          flex: 1,
          width: "100%",
          height: "100%"
        }}
        rotateEnabled={false}
        scrollEnabled={scrollEnabled}
        zoomEnabled={zoomEnabled}
        //minZoomLevelLevel={14}
        onRegionChangeComplete = {this.onRegionChange}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        }}
      >
        {mapData == "states" ? renderStates() : renderProps()}
      </MapView>

      <View style={{ flex: 1, position: "absolute", top: 80, width: "100%" }}>
        <FlatList
          ref={ref => {
            setRef(ref);
          }}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          data={cats}
          style={[styles.categoryContainer, styles.categoryShadow]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => getCatItems(item.type_id)}
            >
              <View
                style={
                  isActive == item.type_id
                    ? styles.categoryItemActive
                    : styles.categoryItem
                }
              >
                <Text
                  style={
                    isActive == item.type_id
                      ? styles.categoryMapTextActive
                      : styles.categoryMapText
                  }
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>}
        />
      </View>

      {selectedItem !== null
        ? <View
          style={{ flex: 1, position: "absolute", bottom: 20, width: "100%" }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProperityDetail", {
                prop: selectedItem
              })}
            style={{
              backgroundColor: "#FFF",
              padding: 10,
              borderRadius: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 0.8,
              borderColor: "#15448F"
            }}
          >
            <View style={{ width: "30%" }}>
              <Image
                source={{
                  uri: url.media_url + selectedItem.prop_images.split(",")[0]
                }}
                style={{ width: 100, height: 90, borderRadius: 10, resizeMode: "stretch" }}
              />
            </View>

            <View
              style={{
                alignItems: "flex-end",
                paddingVertical: 5,
                width: "70%"
              }}
            >
              <View style={{
                width: "60%",
                flexDirection: "row-reverse",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: "#FFF",
                borderColor: "#C8DAEB",
                borderWidth: 1,
                paddingHorizontal: 5
              }}>
                <Image source={require("./../assets/verify.png")}
                  style={{ width: 30, height: 30 }} />
                <Text style={{
                  fontFamily: "Bold",
                  color: "#0e2e3b",
                  textAlign: "right",
                }}>
                  {getPropType(selectedItem.prop_type) + " " + getAdvType(selectedItem.adv_type)}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: 15,
                  width: "90%",
                  color: "#143656",
                  marginVertical: 5,
                  textAlign: "right",
                  paddingHorizontal: 10
                }}>
                {selectedItem.prop_price} ريال
              </Text>

              <View
                style={{
                  flexDirection: "row-reverse",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {selectedItem.user == null || selectedItem.user.user_image == "" ?
                  <Image
                    source={require('./../assets/man.png')}

                    style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "#46D0D9" }}
                  />

                  :
                  <Image
                    source={{ uri: url.media_url + selectedItem.user.user_image }}
                    style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "#46D0D9" }}
                  />
                }
                <Text
                  style={{
                    fontFamily: "Bold",
                    color: "#fe7e25",
                    paddingHorizontal: 10,
                    fontSize: 20
                  }}
                >
                  {selectedItem.user == null ? "معلن مجهول" : selectedItem.user.user_name}
                </Text>
              </View>


            </View>
          </TouchableOpacity>
        </View>
        : <View />}

      {isLoading == true
        ? <View
          style={{
            flex: 1,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color={"#fe7e25"} />
        </View>
        : <View />}
    </View>
  );
}