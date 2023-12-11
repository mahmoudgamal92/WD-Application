import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Platform,
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialIcons,
  AntDesign,
  Feather,
  Ionicons,
  Fontisto,
  EvilIcons,
} from "@expo/vector-icons";

import * as theme from "../theme/theme";
import styles from "../../theme/style";
import {url} from "../../constants/constants";
import * as Location from 'expo-location';
import Constants from 'expo-constants';

import { useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native";



export default function HomePage({ navigation, route }) {
  const user_info = useSelector((state) => state.userReducer.user);
  const [current_page, setCurrentPage] = useState(0);
  const [extra_loading, setExtraLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [location_info, setLocationInfo] = useState(null);

  const [isActive, setIsActive] = useState(0);
  const [current_slug, setCurrentSlug] = useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [ref, setRef] = useState(null);

  const [extraData, setExtraData] = React.useState(new Date());
  const [data, setData] = useState([]);
  const [base, setBase] = useState([]);
  const [cats, setCatigories] = useState([]);
  const [search_param, setSearch] = useState("");
  const [user_token, setUserToken] = useState("");
  const [user_name, setUserName] = useState("");

  const [fav_loading, setFavLoading] = useState(0);
  const [profile_img, setProfileImg] = useState(null);
  const [end_reached, setEndReached] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // get_image();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    _retrieveData();
    get_image();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      get_image();
    }, [])
  );

  const get_image = () => {
    if (user_info !== "") {
      const user = JSON.parse(user_info);
      setProfileImg(url.media_url + user.user_image);
    }
    else {
      setProfileImg(null);
    }
  };

  const _retrieveData = async () => {
    setLoading(true);
    try {
      const name = await AsyncStorage.getItem("user_name");
      const token = await AsyncStorage.getItem("user_token");
      const cache_text = await AsyncStorage.getItem("aqar_cache_data");
      const cache = JSON.parse(cache_text);
      const cached_cats = cache.data.cats;

      setCatigories(cached_cats);
      setUserToken(token);
      setUserName(name);
      setCurrentPage(1);
      fetch(url.base_url + "properties/list.php?user_token=" + token, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          "cache-control": "no-cache",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          if (json.success == "true") {
            setData(json.data);
            setBase(json.data);
            setLoading(false);
          }
          else {
            setData([]);
            setBase([]);
            setLoading(false);
          }
          //alert(JSON.stringify(json.data));
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };


  const getCatItems = (item_id) => {
    setSearch("");
    setCurrentSlug(null);
    setIsActive(item_id);
    setLoading(true);
    const url = url.base_url + "properties/list.php?user_token=" + user_token +
      "&type=" + item_id;
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
          setBase(json.data);
          setLoading(false);
        }
        else {
          setData([]);
          setBase([]);
          setLoading(false);
        }
      })
      .finally(() => setLoading(false));
  };


  const fliterAdvType = (slug) => {
    // setData(base);
    setCurrentSlug(slug);
    // if(base.length !== 0)
    // {
    const filtered_data = base.filter(item => item.adv_type == slug);
    setData(filtered_data);
    //}
  };


  const getType = (val) => {
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



  const sub_cats = [
    {
      id: 1,
      title: "للبيع",
      slug: "for_sale",
    },
    {
      id: 2,
      title: "للإيجار",
      slug: "for_rent",
    },
    {
      id: 3,
      title: "للإستثمار",
      slug: "for_invest",
    },
  ];

  const ApplySearch = () => {
    Keyboard.dismiss();
    if (search_param !== "") {
      try {
        setLoading(true);
        fetch(
          url.base_url + "properties/search.php?param=" + search_param,
          {
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
            if (json.success == true) {
              //alert(JSON.stringify(json.data));
              setData(json.data);
              setLoading(false);
              setIsActive(null);
            }
            else {
              //alert(JSON.stringify(json.data));
              setData([]);
              setLoading(false);
              setIsActive(null);
            }
          })
          .catch(error => console.error(error));
      } catch (error) {
        console.log(error);
      }
    }
    else { }
  };
  
  const toggleFavorite = (prop_id) => {
    const temp = data;
    try {
      setFavLoading(prop_id);
      fetch(
        url.base_url + "favourite/toggle.php?prop_id=" + prop_id + "&user_token=" + user_token,
        {
          headers: {
            Accept: "*/*",
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            "cache-control": "no-cache",
            Connection: "keep-alive",
          }
        }).then(response => response.json())
        .then(responseJson => {
          temp.map(item => {
            if (item.prop_id == prop_id) {
              item.isFavourite = !item.isFavourite;
            }
          });
          setExtraData(new Date());
          setData(temp);
          setFavLoading(0);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const getLocation = async () => {
    const location_coordinates = await AsyncStorage.getItem("current_location");
    const location_info = await AsyncStorage.getItem("location_info");
    if (location_coordinates !== null && location_info !== null) {
      setCoordinates(JSON.parse(location_coordinates));
      setLocationInfo(JSON.parse(location_info));
    }

    else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCoordinates(location);
      const location_txt = JSON.stringify(location);
      AsyncStorage.setItem("current_location", location_txt);
      fetch(constants.geocode_url + "lat=" + location.coords.latitude + "&lon=" +
        location.coords.longitude + "&format=json&accept-language=ar", {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          setLocationInfo(json);
          AsyncStorage.setItem("location_info", JSON.stringify(json));
        })
        .catch(error => console.error(error));

    }
  }

  const handleEmptyProp = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 180
        }}
      >

        <Text
          style={{
            fontFamily: "Regular",
            color: "#c9c9c9",
            fontSize: 18,
            marginTop: 10
          }}
        >
          لا توجد أي عقارات
        </Text>
      </View>
    );
  };

  const CategoryList = () => {
    return (
      <View style={{ overflow: "hidden" }}>
        <FlatList
          ref={ref => {
            setRef(ref);
          }}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          data={cats}
          style={styles.categoryContainer}
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
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>}
        />
      </View>
    );
  };





  const subCategoryList = () => {
    return (
      <View style={{ overflow: "hidden" }}>
        <FlatList
          ref={ref => {
            setRef(ref);
          }}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          data={sub_cats}
          style={styles.categoryContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => fliterAdvType(item.slug)}
            >
              <View
                style={
                  current_slug == item.slug
                    ? styles.subcategoryItemActive
                    : styles.subcategoryItem
                }
              >
                <Text
                  style={
                    current_slug == item.slug
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {item.title}
                </Text>
                <AntDesign name="filter" size={24}
                  color={current_slug == item.slug ? "#FFF" : "#000"}
                />
              </View>
            </TouchableOpacity>}
        />
      </View>
    );
  };


  const RenderProperites = () => {
    return (

      <View style={{ flex: 1, backgroundColor: "#F8FBFF" }}>
        {isLoading == false
          ? <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            legacyImplementation={true}
            data={data}
            extraData={extraData}
            keyExtractor={(item, index) => `${item.prop_id}`}
            ListEmptyComponent={handleEmptyProp()}
            //onEndReached={() => getExtraProp()}
            renderItem={({ item }) =>
              <TouchableOpacity
                style={{ marginBottom: theme.sizes.margin * 0.6 }}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("ProperityDetail", {
                    prop: item
                  })}
              >
                <ImageBackground
                  style={styles.itemBackground}
                  imageStyle={{ borderRadius: theme.sizes.radius }}
                  source={require("./../assets/placeholder.jpg")}
                >
                  <ImageBackground
                    style={[styles.destination, styles.shadow]}
                    imageStyle={{ borderRadius: theme.sizes.radius }}
                    source={{
                      uri: url.media_url + item.prop_images.split(",")[0]
                    }}
                  >
                    <View
                      style={[
                        styles.row,
                        { justifyContent: "space-between" }
                      ]}
                    >
                      <View
                        style={{
                          flex: 0,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#FFF",
                          borderRadius: 10,
                          borderColor: "#230D33",
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          paddingVertical: 2
                        }}
                      >
                        <Text style={styles.rating}>
                          {getType(item.adv_type)}
                        </Text>
                        <EvilIcons name="location" size={20} color="grey" />
                      </View>
                      <View
                        style={{
                          flex: 0,
                          backgroundColor: "#FFF",
                          padding: 5,
                          borderRadius: 50,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <TouchableOpacity onPress={() => toggleFavorite(item.prop_id)}>
                          {
                            fav_loading == item.prop_id ?
                              <ActivityIndicator size={24} color="grey" />
                              :
                              <MaterialIcons
                                name={
                                  item.isFavourite == false
                                    ? "favorite-border"
                                    : "favorite"
                                }
                                size={24}
                                color="#f26060"
                              />
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ImageBackground>
                </ImageBackground>

                <View style={styles.destinationData}>
                  <View style={{ width: "35%" }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: "Bold",
                          color: "#143656",
                          textAlign: "left",
                          fontSize: 14
                        }}
                      >
                        {item.prop_price} ريال
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: "65%" }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: "Bold",
                          color: "#143656",
                          fontSize: 14,
                          width: "90%",
                          textAlign: "right"
                        }}
                      >
                        {item.adv_title}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row-reverse", paddingHorizontal: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginHorizontal: 10,
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Regular",
                            color: "grey",
                            fontSize: 16,
                            margin: 5
                          }}
                        >
                          {item.prop_space} متر مربع
                        </Text>
                        <Image source={require("./../assets/area.png")}
                          style={{ width: 22, height: 22 }} />
                      </View>
                    </View>


                    {item.user !== null ?
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          paddingHorizontal: 20
                        }}>

                        {item.user.user_image == null || item.user.user_image == "" ?

                          <Image
                            source={require('./../assets/man.png')}

                            style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "#46D0D9" }}
                          />

                          :
                          <Image
                            source={{ uri: url.media_url + item.user.user_image }}
                            style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "#46D0D9" }}
                          />
                        }

                        <Text
                          style={{
                            fontFamily: "Regular",
                            marginHorizontal: 10
                          }}
                        >
                          {item.user.user_name}
                        </Text>
                      </View>

                      :
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          paddingHorizontal: 20
                        }}>
                        <Image
                          source={require('./../assets/man.png')}

                          style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "#46D0D9" }}
                        />
                        <Text
                          style={{
                            fontFamily: "Regular",
                            marginHorizontal: 10
                          }}
                        >
                          معلن مجهول
                        </Text>
                      </View>
                    }


                  </View>
                </View>
              </TouchableOpacity>}
          />
          : <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              width: "100%",
              marginTop: 160
            }}
          >
            <ActivityIndicator size={70} color="#fe7e25" />
          </View>}
        {extra_loading == true ?
          <View style={{ marginVertical: 10, backgroundColor: "transparent" }}>
            <ActivityIndicator size={40} color="#afaac2" />
          </View> : <View></View>}
        {
          end_reached == true ?
            <View style={{ marginVertical: 15, backgroundColor: "transparent" }}>
              <Text style={{ fontFamily: "Regular", textAlign: "center", color: "#afaac2" }}>
                لا يوجد مزيد من العقارات
              </Text>
            </View>
            :
            <View></View>
        }
      </View>
    );
  };

  const Search_Section = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20
        }}
      >
        <View style={{ width: "17%" }}>
          <TouchableOpacity onPress={() => navigation.navigate("FilterScreen", {
            cats: cats
          })}>
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
                borderRadius: 10,
                fontFamily: "Regular",
                textAlign: "right",
              }}
            >
              <Text style={{
                fontFamily: "Regular",
                textAlign: "right",
                color: "#FFF",
              }}>
                فلتر
              </Text>
              <Ionicons name="options-outline" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.SearchboxContainer}>
          <TextInput
            placeholder="أبحث عن ما تريد"
            returnKeyType="search"
            placeholderTextColor="#666"
            style={styles.Searchbox}
            defaultValue={search_param}
            onChangeText={param => setSearch(param)}
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
      </View>
    );
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#F8FBFF",

    }}>
      <StatusBar backgroundColor="#fe7e25" />
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
          backgroundColor: "#fe7e25",
          flexDirection: "row-reverse",
          height: 60,
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center"
        }}
      >

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity style={{ marginHorizontal: 10 }}>
            <Feather name="settings" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => getLocation()}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}>

          <Ionicons name="location-outline" size={15} color="#FFF" />
          <Text style={{ color: "#FFF", fontFamily: "Regular", fontSize: 15, marginHorizontal: 10 }}>
            {location_info == null ? "لم يتم تحديد موقعك " :
              location_info.address.city + "," + location_info.address.state}
          </Text>
          <Fontisto name="angle-down" size={15} color="#FFF" />
        </TouchableOpacity>
        <View>
          {profile_img == null
            ?
            <Image
              source={require("./../assets/man.png")}
              style={{ width: 40, height: 40 }}
            />
            :
            <Image
              source={{ uri: profile_img }}
              style={{ width: 45, height: 45, borderRadius: 22.5, borderColor: "#1DA0C9", borderWidth: 1 }}
            />
          }
        </View>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginVertical: 30
        }}
      >
        <View>
          <Text style={{ fontFamily: "Bold", color: "#fe7e25", textAlign: "right", marginVertical: 5 }}>
            مرحبا , {user_name}
          </Text>
          <Text style={{ fontFamily: "Regular", textAlign: "right" }}>
            أبدأ بالبحث عن العقار المناسب لك
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MapScreen")}

            style={{
              height: 40,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
              backgroundColor: "#051A3A",
              justifyContent: "center",
              paddingHorizontal: 10,
              width: 40
            }}
          >
            <Ionicons name="earth-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* <ScrollView> */}
      {Search_Section()}
      {CategoryList()}
      {subCategoryList()}

      {RenderProperites()}
      {/* </ScrollView> */}

      {/* <View style={{
        position:"absolute" , 
        bottom:-20, 
        zIndex:100000000,
        width:"100%",
        height:100,
        alignItems:"center",
        justifyContent:"flex-end"}}>
        <TouchableOpacity style={{
          width:60,
          height:60,
          borderRadius:50,
          backgroundColor:"red",
          alignItems:"center",
          justifyContent:"center"
          }}>
        <Text style={{color:"#FFF",fontSize:30}}>+</Text>
        </TouchableOpacity>

      </View> */}
    </View>
  );
}