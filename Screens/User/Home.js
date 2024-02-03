import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import {
  Entypo,
  Ionicons,
  AntDesign,
  FontAwesome,
  SimpleLineIcons,
  Octicons,
  MaterialIcons,
  FontAwesome5
} from "@expo/vector-icons";
import DefaultHeader from "../../components/DefaultHeader";
import * as Location from "expo-location";

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../theme/style";
import { getAdvType, getPropType, getRegionById, getCityById } from './../../utils/functions';

import { url } from "../../constants/constants";
import Toast from "react-native-toast-message";
import toastConfig from "../../components/Toast";
import { useNavigation } from '@react-navigation/native';
import { regions, cities, districts } from "./../../utils/address";

export default function UserHome() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [map_view, setMapView] = useState("standard");

  const [region_id, setRegionID] = useState(null);
  const [data, setData] = useState([]);
  const [cats, setCatigories] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isActive, setIsActive] = useState(null);
  const [ref, setRef] = useState(null);
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [sidear_visible, setSideBarVisible] = useState(true);

  const [user_latitude, setUserLatitude] = useState("");
  const [user_longitude, SetUserLongitude] = useState("");
  const [latitude, setLatitude] = useState(24.8859);
  const [longitude, SetLongitude] = useState(45.0792);
  const [latitudeDelta, setlatitudeDelta] = useState(21.0);
  const [longitudeDelta, setlongitudeDelta] = useState(20.0);

  const [mapData, setMapData] = useState("states");
  useEffect(() => {
    _retrieveData();
    getLocation();

  }, []);

  const _retrieveData = async () => {
    const cache_text = await AsyncStorage.getItem("aqar_cache_data");
    const cache = JSON.parse(cache_text);
    const cached_cats = cache.data.cats;
    const cached_states = cache.data.states;
    setCatigories(cached_cats);
    setStates(cached_states);
  };


  const _getProps = async (region_id, lat, long) => {
    try {
      setLoading(true);
      fetch(url.base_url + "properties/map.php?prop_state=" + region_id, {
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
            setRegionID(region_id);
            setMapData("props");
            setData(json.data);
            console.log(json.data);
            setlatitudeDelta(10.0);
            setlatitudeDelta(10.0);
            _MapReLocation(parseFloat(lat), parseFloat(long), 16, 16);
            setScrollEnabled(true);
            setZoomEnabled(true);
          }
          else {
            Toast.show({
              type: "erorrToast",
              text1: "لا يوجد عقارات متاحة حاليا في " + getRegionById(region_id),
              bottomOffset: 80,
              visibilityTime: 2000
            });
          }
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };


  const _MapReLocation = async (lat, long, latDelta, longDelta) => {
    mapRef?.current.animateToRegion({
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
      latitudeDelta: parseFloat(latDelta),
      longitudeDelta: parseFloat(longDelta),
    });
  };



  const getLocation = async () => {
    const location_coordinates = await AsyncStorage.getItem("current_location");
    if (location_coordinates !== null) {
      setUserLatitude(JSON.parse(location_coordinates).latitude);
      SetUserLongitude(JSON.parse(location_coordinates).longitude);
    }
    else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLatitude(location.coords.latitude);
      SetUserLongitude(location.coords.longitude);
      AsyncStorage.setItem("current_location", JSON.stringify(location.coords));
    }
  };


  function numberToWordsSimplified(number) {
    const units = ["", "ألف", "مليون"];

    if (number === 0) {
      return "zero";
    }

    let words = "";

    for (let i = 0; number > 0 && i < units.length; i++) {
      const chunk = number % 1000;
      if (chunk > 0) {
        words = chunk + " " + units[i] + " " + words;
      }
      number = Math.floor(number / 1000);
    }

    return words.trim();
  }

  const toggleFavorite = async prop_id => {
    const user_token = await AsyncStorage.getItem("user_token");
    try {
      //setFavLoading(prop_id);
      fetch(
        url.base_url +
        "favourite/toggle.php?prop_id=" +
        prop_id +
        "&user_token=" +
        user_token,
        {
          headers: {
            Accept: "*/*",
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            "cache-control": "no-cache",
            Connection: "keep-alive"
          }
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          //alert(JSON.stringify(responseJson));
          Toast.show({
            type: "successToast",
            text1: "تم الاضافه للمفضله بنجاح",
            bottomOffset: 80,
            visibilityTime: 2000
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getCatItems = item_id => {
    if (mapData == "states") {
      Toast.show({
        type: "erorrToast",
        text1: "لابد من اختيار المنطقه اولا",
        bottomOffset: 80,
        visibilityTime: 2000
      });
    }
    else {
      setIsActive(item_id);
      setLoading(true);
      const fetch_url = url.base_url + "properties/list.php?type=" + item_id + "&region_id=" + region_id;
      fetch(fetch_url, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "cache-control": "no-cache"
        }
      })
        .then(response => response.json())
        .then(json => {
          if (json.success == "true") {
            setData(json.data);
            console.log(json.data);

            _MapReLocation(
              parseFloat(json.data[0].prop_coords.split(",")[0]),
              parseFloat(json.data[0].prop_coords.split(",")[1]),
              16, 16
            );
            setLoading(false);
          } else {
            setData([]);
            Toast.show({
              type: "erorrToast",
              text1: "لا يوجد عقارات في هذه الفئة",
              bottomOffset: 80,
              visibilityTime: 2000
            });
            setSelectedItem(null);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const renderProps = () => {
    return data.map(item => {
      return (
        <Marker
          key={item.prop_id}
          // title={item.title}
          // description={item.description}
          onPress={() => {
            setSelected(true);
            setSelectedItem(item);
            //console.log(item);
          }}
          coordinate={{
            latitude: parseFloat(item.prop_coords.split(",")[0]) || 0,
            longitude: parseFloat(item.prop_coords.split(",")[1]) || 0
          }}
          style={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "#fe7e25",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              overflow: "visible"
            }}
          >
            <Text style={{ color: "#FFF", fontFamily: "Bold", fontSize: 12 }}>
              {numberToWordsSimplified(item.prop_price)}
            </Text>
          </View>
          <Entypo
            name="triangle-down"
            size={30}
            color="black"
            style={{
              marginTop: -12
            }}
          />
        </Marker>
      );
    });
  };

  onRegionChange = region => {
    //console.log(region);
    if (region.latitudeDelta > 45) {
      setMapData("states");
      setIsActive(null);
      setRegionID(null);
      setZoomEnabled(false);
      setScrollEnabled(false);
      setSelectedItem(null);
      _MapReLocation(26.8859, 44.0792, 21, 21);

    }
  };

  const renderStates = () => {
    return regions.map(item => {
      return (
        <Marker
          key={item.region_id}
          onPress={() => {
            _getProps(
              item.region_id,
              parseFloat(item.center[0]),
              parseFloat(item.center[1])
            );
          }}
          //stopPropagation={true}
          coordinate={{
            latitude: parseFloat(item.center[0]) || 0,
            longitude: parseFloat(item.center[1]) || 0
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
              {item.name_ar.replace('منطقة', '')}
            </Text>
          </View>
        </Marker>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fe7e25" />
      <DefaultHeader />


      {sidear_visible == true ?

        <View style={{
          position: "absolute",
          width: 50,
          right: 10,
          zIndex: 1,
          top: 250
        }}>
          <TouchableOpacity style={{
            width: 50,
            height: 50,
            backgroundColor: "#fe7e25",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            marginVertical: 10,
            borderColor: "#FFF",
            borderWidth: 2,
          }}>
            <FontAwesome name="th-list" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMapView(map_view == "satellite" ? "standard" : "satellite")}
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#fe7e25",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              marginVertical: 10,
              borderColor: "#FFF",
              borderWidth: 2,

            }}>
            <FontAwesome5 name="satellite" size={24} color="#FFF" />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => _MapReLocation(user_latitude, user_longitude, 1, 1)}
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#fe7e25",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              marginVertical: 10,
              borderColor: "#FFF",
              borderWidth: 2,

            }}>
            <Ionicons name="ios-location-sharp" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        :
        null
      }
      <View
        style={{
          backgroundColor: "#fafafa",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
          paddingVertical: 20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20
          }}
        >
          <View style={styles.SearchboxContainer}>
            <TextInput
              editable={false} selectTextOnFocus={false}
              placeholder="أبحث عن ما تريد"
              returnKeyType="search"
              placeholderTextColor="#666"
              style={styles.Searchbox}
              //defaultValue={search_param}
              // onChangeText={param => setSearchParam(param)}
              // onSubmitEditing={() => ApplySearch()}
              placeholderStyle={{
                fontFamily: "Medium",
                textAlign: "right"
              }}
            />

            <TouchableOpacity
              style={styles.SearchboxIcon}
            //onPress={() => ApplySearch()}
            >
              <AntDesign name="search1" size={24} color="#143656" />
            </TouchableOpacity>
          </View>

          <View style={{ width: "17%" }}>
            <TouchableOpacity onPress={() => navigation.navigate("FilterScreen")}>
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  paddingVertical: 15,
                  backgroundColor: "#fe7e25",
                  elevation: 8,
                  marginBottom: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  fontFamily: "Regular",
                  textAlign: "right"
                }}
              >
                <Ionicons name="options-outline" size={20} color="#FFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: "100%" }}>
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
                  {
                    isActive == item.type_id ?
                      null
                      //<FontAwesome name="check-square-o" size={24} color="black" />
                      :
                      null
                  }

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
      </View>

      <View
        style={{
          width: "100%",
          flex: 1,
          paddingHorizontal: 10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          overflow: "hidden"
        }}
      >
        <View
          style={{
            width: windowWidth,
            flex: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            overflow: "hidden"
          }}
        >
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
            showsUserLocation={true}
            mapType={map_view}
            //minZoomLevelLevel={14}
            onRegionChangeComplete={this.onRegionChange}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta
            }}
          >
            {mapData == "states" ? renderStates() : renderProps()}
          </MapView>
        </View>
      </View>

      {region_id !== null
        ?
        <View style={{
          position: "absolute",
          top: 250,
          left: 10,
          backgroundColor: "#fe7e25",
          paddingVertical: 5,
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: 10,
        }}>

          <Text style={{
            color: "white",
            fontFamily: "Bold",
            fontSize: 10,
          }}>
            {getRegionById(region_id)}
          </Text>

          <MaterialIcons name="location-pin" size={24} color="#FFF" />
        </View>
        :
        null
      }



      {region_id !== null
        ?
        <TouchableOpacity
          onPress={() => {
            setMapData("states");
            setIsActive(null);
            setRegionID(null);
            setZoomEnabled(false);
            setScrollEnabled(false);
            setSelectedItem(null);
            _MapReLocation(26.8859, 44.0792, 21, 21);
          }
          }
          style={{
            position: "absolute",
            bottom: 5,
            left: 10,
            backgroundColor: "#fe7e25",
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 10,
          }}>


          <Text style={{
            color: "white",
            fontFamily: "Bold",
            fontSize: 10,
          }}>
            عودة للمناطق
          </Text>

          <AntDesign name="back" size={24} color="#FFF" />
        </TouchableOpacity>
        :
        null
      }
      {
        selectedItem !== null
          ? <View
            style={{ flex: 1, position: "absolute", bottom: 20, width: "100%" }}
          >
            <View

              style={{
                backgroundColor: "#FFF",
                borderRadius: 10,
                marginHorizontal: 20,
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 0.8,
                borderColor: "#15448F",
                height: 140
              }}
            >

              <TouchableOpacity
                onPress={() => setSelectedItem(null)}
                style={{
                  zIndex: 100000,
                  position: "absolute",
                  right: 10,
                  top: 10,
                  width: 50,
                  height: 50,
                }}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProperityDetail", {
                    prop: selectedItem
                  })}
                style={{ width: "40%" }}>
                <ImageBackground
                  source={{
                    uri: url.media_url + selectedItem.prop_images.split(",")[0]
                  }}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  imageStyle={{
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    resizeMode: "stretch"
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-end",
                      width: "100%",
                      height: "100%",
                      padding: 5
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#FFF",
                        borderRadius: 40,
                        height: 35,
                        width: 35,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => toggleFavorite(selectedItem.prop_id)}
                      >
                        <AntDesign name="hearto" size={24} color="grey" />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flex: 1,
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        padding: 5
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#fe7e25",
                          borderRadius: 50,
                          paddingHorizontal: 10,
                          paddingVertical: 5
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Bold",
                            color: "#FFF"
                          }}
                        >
                          {getPropType(selectedItem.prop_type)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <View
                style={{
                  alignItems: "flex-end",
                  paddingVertical: 5,
                  width: "60%"
                }}
              >
                <View
                  style={{
                    width: "60%",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: "#FFF",
                    paddingHorizontal: 5
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Bold",
                      color: "#0e2e3b",
                      textAlign: "right",
                      fontSize: 16
                    }}
                  >

                    {getPropType(selectedItem.prop_type) +
                      " " +
                      getAdvType(selectedItem.adv_type)}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: "Bold",
                    fontSize: 15,
                    width: "90%",
                    color: "#fe7e25",
                    marginVertical: 5,
                    textAlign: "right",
                    paddingHorizontal: 10
                  }}
                >
                  {selectedItem.prop_price} ريال
                </Text>

                <View />

                <View
                  style={{
                    flexDirection: "row-reverse",
                    width: "100%",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="location-pin" size={30} color="grey" />
                  <Text
                    style={{
                      fontFamily: "Regular",
                      color: "grey"
                    }}
                  >
                    {getRegionById(selectedItem.prop_state) + " , " + getCityById(selectedItem.prop_city)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          : <View />
      }

      {
        isLoading == true
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
          : <View />
      }

      <Toast config={toastConfig} />
    </View >
  );
}