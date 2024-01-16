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
import BottomSheet from "@gorhom/bottom-sheet";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import toastConfig from "../../components/Toast";
import { useNavigation } from '@react-navigation/native';
import { regions, cities, districts } from "./../../utils/address";

export default function UserHome() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [search_param, setSearchParam] = useState("");
  const [map_view, setMapView] = useState("standard");
  const [filter_cat, setFilterCat] = useState("");
  const [filter_city, setFilterCity] = useState("");
  const [filter_state, setFilterState] = useState("");
  const [filter_district, setFilterDistrict] = useState("");
  const [region_id, setRegionID] = useState(null);
  const [min_price, setminPrice] = useState("");
  const [max_price, setMaxPrice] = useState("");
  const [selected_type, setSelectedType] = useState(null);
  const [data, setData] = useState([]);
  const [cats, setCatigories] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [prop_cat, setPropCat] = useState("");
  const [bottomSheetState, SetBottomSheetState] = useState(-1);
  const [filtered_cities, setCities] = useState([]);
  const [filtered_districts, setDistricts] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [ref, setRef] = useState(null);
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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

  const bottomSheetRef = useRef();
  const handleSheetChanges = useCallback(index => { }, []);

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

  const openBottomSheet = () => {
    setSideBarVisible(false);
    SetBottomSheetState(0);
    bottomSheetRef.current.expand();
  };

  const closeBottomSheet = () => {
    setSideBarVisible(true);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const _retrieveData = async () => {
    const cache_text = await AsyncStorage.getItem("aqar_cache_data");
    const cache = JSON.parse(cache_text);
    const cached_cats = cache.data.cats;
    const cached_states = cache.data.states;
    setCatigories(cached_cats);
    setStates(cached_states);
  };

  const _applyFilter = async () => {
    if (filter_cat == "" || filter_state == "") {
      Toast.show({
        type: "erorrToast",
        text1: "يجب إكمال الخيارات المتاحة",
        bottomOffset: 80,
        visibilityTime: 2000
      });

      return;
    }
    else {
      closeBottomSheet();
      navigation.navigate("ResultScreen", {
        cat: filter_cat,
        adv: selected_type,
        state: filter_state,
        min_price: min_price,
        max_price: max_price,
      });
    }
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
            setlatitudeDelta(10.0);
            setlatitudeDelta(10.0);
            _MapReLocation(parseFloat(lat), parseFloat(long));
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




  const _MapReLocation = async (lat, long) => {
    mapRef?.current.animateToRegion({
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
      latitudeDelta: 16,
      longitudeDelta: 16,
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
            _MapReLocation(
              parseFloat(json.data[0].prop_coords.split(",")[0]),
              parseFloat(json.data[0].prop_coords.split(",")[1])
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
      setFilterCat(null);
      setRegionID(null);
      setZoomEnabled(false);
      setScrollEnabled(false);
      setSelectedItem(null);
      _MapReLocation(26.8859, 44.0792);
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
            onPress={() => _MapReLocation(user_latitude, user_longitude)}
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
              placeholder="أبحث عن ما تريد"
              returnKeyType="search"
              placeholderTextColor="#666"
              style={styles.Searchbox}
              //defaultValue={search_param}
              onChangeText={param => setSearchParam(param)}
              onSubmitEditing={() => ApplySearch()}
              placeholderStyle={{
                fontFamily: "Medium",
                textAlign: "right"
              }}
            />

            <TouchableOpacity
              style={styles.SearchboxIcon}
              onPress={() => ApplySearch()}
            >
              <AntDesign name="search1" size={24} color="#143656" />
            </TouchableOpacity>
          </View>

          <View style={{ width: "17%" }}>
            <TouchableOpacity onPress={() => openBottomSheet()}>
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
          width: "100%", 
          left: 10, 
          backgroundColor: "#fe7e25", 
          height: 40,
          width:150,
          paddingHorizontal:10,
          alignItems: "center",
          flexDirection:"row",
          justifyContent: "center",
          borderRadius:10,
        }}>

          <Text style={{
            color: "white",
            fontFamily:"Bold",
            fontSize:10,
          }}>
            {getRegionById(region_id)}
          </Text>

          <Entypo name="location" size={24} color="#FFF" />
        </View>
        :
        null
      }
      {selectedItem !== null
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

      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetState}
        enableOverDrag={true}
        snapPoints={["100%"]}
        handleComponent={() => null}
        enableContentPanningGesture={true}
        onChange={handleSheetChanges}
        style={{

        }}
      >
        <ScrollView style={{
          width: "100%",
          backgroundColor: "#F8F8F8",
          flex: 1
        }}>

          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: "#F8F8F8",
              flex: 1,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              overflow: "hidden",
              borderColor: "#fe7e25",
            }}
          >
            <TouchableOpacity
              onPress={() => closeBottomSheet()}
              style={{
                marginTop: 20
              }}
            >
              <Text style={{ fontFamily: "Bold", fontSize: 15 }}>إغلاق</Text>
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "Bold",
                color: "#fe7e25",
                textAlign: "center",
                fontSize: 20
              }}
            >
              فلتر البحث
            </Text>

            <View>
              <Text
                style={{
                  fontFamily: "Bold",
                  marginVertical: 10,
                  textAlign: "right"
                }}
              >
                إختر نوع العقار
              </Text>

              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingHorizontal: 10
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedType("buy")}
                  style={{
                    width: "30%",
                    backgroundColor:
                      selected_type == "buy" ? "#fe7e25" : "#FFF",
                    paddingVertical: 10,
                    borderRadius: 30,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#fe7e25"
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontFamily: "Bold",
                      color: selected_type == "buy" ? "#FFF" : "#fe7e25"
                    }}
                  >
                    للبيع
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedType("rent")}
                  style={{
                    width: "30%",
                    backgroundColor:
                      selected_type == "rent" ? "#fe7e25" : "#FFF",
                    paddingVertical: 10,
                    borderRadius: 30,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#fe7e25",
                    borderWidth: 1,
                    borderColor: "#fe7e25"
                  }}
                >
                  <Text
                    style={{
                      color: selected_type == "rent" ? "#FFF" : "#fe7e25",
                      fontFamily: "Bold"
                    }}
                  >
                    للأيجار
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedType("invest")}
                  style={{
                    width: "30%",
                    backgroundColor:
                      selected_type == "invest" ? "#fe7e25" : "#FFF",
                    paddingVertical: 10,
                    borderRadius: 30,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#fe7e25"
                  }}
                >
                  <Text
                    style={{
                      color: selected_type == "invest" ? "#FFF" : "#fe7e25",
                      fontFamily: "Bold"
                    }}
                  >
                    للإستثمار
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                marginTop: 10,
                width: "100%"
              }}
            >
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus == "prop_type" && { borderColor: "blue" }
                ]}
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
                placeholder={isFocus !== "prop_type" ? "أختر نوع العقار " : "..."}
                //  value={prop_cat}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setFilterCat(item.type_id);
                  setIsFocus(false);
                }}
                renderRightIcon={() =>
                  <FontAwesome
                    style={styles.icon}
                    name="building"
                    size={24}
                    color="#fe7e25"
                  />}
                renderLeftIcon={() =>
                  <SimpleLineIcons name="arrow-down" size={24} color="grey" />}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                marginTop: 10,
                width: "100%"
              }}
            >
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
                placeholder={"أختر المنطقة المطلوبة"}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  getCitiessByRegionId(item.region_id);
                  setFilterState(item.region_id);
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
              }}
            >
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
                placeholder={"أختر المدينة المطلوبة"}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  getDistrictsByCityID(item.city_id);
                  setFilterCity(item.city_id);
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
              }}
            >
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
                placeholder={"أختر الحي"}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setFilterCity(item.district_id);
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
                  أختر الحد الأدنى والأعلى للسعر
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >

                <View style={{
                  width: "45%",
                  backgroundColor: "#FFF",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 25,
                  height: 50,
                  borderColor: "#DDDDDD",
                  borderWidth: 1.5,
                  marginBottom: 20,
                  paddingHorizontal: 15
                }}>
                  <TextInput
                    placeholder="السعر الأدني"
                    keyboardType="numeric"
                    onChangeText={price => setminPrice(price)}
                    style={{
                      height: 50,
                      width: "90%",
                      fontFamily: "Regular",
                      textAlign: "right",
                    }}
                  />
                  <MaterialIcons name="attach-money" size={24} color="black" />


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

                <View style={{
                  width: "45%",
                  backgroundColor: "#FFF",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 25,
                  height: 50,
                  borderColor: "#DDDDDD",
                  borderWidth: 1.5,
                  marginBottom: 20,
                  paddingHorizontal: 15
                }}>
                  <TextInput
                    placeholder="السعر الأعلي"
                    keyboardType="numeric"
                    onChangeText={price => setMaxPrice(price)}
                    style={{
                      height: 50,
                      width: "90%",
                      fontFamily: "Regular",
                      textAlign: "right",
                    }}
                  />
                  <MaterialIcons name="attach-money" size={24} color="black" />
                </View>
              </View>
            </View>


            <View style={{ width: "100%", paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={() => _applyFilter()}
                style={{
                  width: "100%",
                  backgroundColor: "#fe7e25",
                  borderRadius: 20,
                  padding: 10,
                  alignItems: "center",

                }}>
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Bold"
                }}>
                  تطبيق الفلتر
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
      <Toast config={toastConfig} />
    </View>
  );
}