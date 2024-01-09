import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { EvilIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { prop_type, url } from "./../constants/constants";
import CustomHeader from "./../components/CustomHeader";
import { getAdvType, getPropType } from "./../utils/functions";

import styles from "./../theme/style";
export default function ResultScreen({ route, navigation }) {
  const screenTitle = " نتائج البحث ";

  const { cat, adv, state, min_price, max_price } = route.params;
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = useState([]);
  const [fav_loading, setFavLoading] = useState(0);
  const [extraData, setExtraData] = React.useState(new Date());

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("prop_type", cat);
    formData.append("adv_type", adv);
    formData.append("prop_state", state);

    const fetch_url = url.base_url + "properties/filter.php";
    fetch(fetch_url, {
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
      .then(json => {
        alert(JSON.stringify(json));
        if (json.success == true) {
          setData(json.data);
          setLoading(false);
        } else {
          alert(JSON.stringify(json));
          setData([]);
          setLoading(false);
        }
      });
  };

  const handleEmptyProp = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 160
        }}
      >
        <Image source={require("./../assets/no_result.png")} />
        <Text
          style={{
            fontFamily: "Bold",
            color: "#000",
            fontSize: 18,
            marginTop: 10
          }}
        >
          لا توجد لديك أي عقارات حاليا
        </Text>

        <Text
          style={{
            fontFamily: "Regular",
            color: "grey",
            textAlign: "center",
            fontSize: 14,
            marginTop: 10
          }}
        >
          لا توجد لديك أي عقارات حاليالا توجد لديك أي عقارات حاليا
        </Text>
      </View>
    );
  };

  const RenderProperites = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#F8FBFF" }}>
        {isLoading == false
          ? <FlatList
            legacyImplementation={true}
            showsVerticalScrollIndicator={false}
            data={data}
            extraData={extraData}
            keyExtractor={(item, index) => `${item.prop_id}`}
            ListEmptyComponent={handleEmptyProp()}
            //onEndReached={() => getExtraProp()}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProperityDetail", {
                    prop: item
                  })}
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                  marginHorizontal: 10,
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 0.8,
                  borderColor: "#DDDDDD",
                  height: 140,
                  marginVertical: 5
                }}
              >
                <View style={{ width: "40%" }}>
                  <ImageBackground
                    source={{
                      uri: url.media_url + item.prop_images.split(",")[0]
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
                          onPress={() => toggleFavorite(item.prop_id)}
                        >
                          <AntDesign name="heart" size={24} color="red" />
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
                            {getPropType(item.prop_type)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>

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
                      {getPropType(item.prop_type) +
                        " " +
                        getAdvType(item.adv_type)}
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
                    {item.prop_price} ريال
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
                      {/* {item.prop_address.substring(0, 25)}... */}
                    </Text>
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
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        <View style={{ height: 50, marginTop: 20 }}>
          <ScrollView
            horizontal
            style={{ height: 40 }}
            showsHorizontalScrollIndicator={false}
          >
            {cat !== ""
              ? <View
                style={{
                  flexDirection: "row-reverse",
                  backgroundColor: "#fe7e25",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  height: 30,
                  alignItems: "center"
                }}
              >
                <AntDesign
                  name="filter"
                  size={20}
                  color="#FFF"
                  style={{ marginLeft: 5 }}
                />

                <Text style={{ fontFamily: "Regular", color: "#FFF" }}>
                  {getPropType(cat)}
                </Text>
              </View>
              : <View />}

            {adv !== ""
              ? <View
                style={{
                  flexDirection: "row-reverse",
                  backgroundColor: "#fe7e25",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  height: 30,
                  alignItems: "center"
                }}
              >
                <AntDesign
                  name="filter"
                  size={20}
                  color="#FFF"
                  style={{ marginLeft: 5 }}
                />

                <Text style={{ fontFamily: "Regular", color: "#FFF" }}>
                  {getAdvType(adv)}
                </Text>
              </View>
              : <View />}

            {max_price !== ""
              ? <View
                style={{
                  flexDirection: "row-reverse",
                  backgroundColor: "#fe7e25",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  height: 30
                }}
              >
                <AntDesign
                  name="filter"
                  size={20}
                  color="#FFF"
                  style={{ marginLeft: 5 }}
                />

                <Text style={{ fontFamily: "Regular", color: "#FFF" }}>
                  أعلي سعر: {max_price}
                </Text>
              </View>
              : <View />}

            {min_price !== ""
              ? <View
                style={{
                  flexDirection: "row-reverse",
                  backgroundColor: "#fe7e25",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  height: 30
                }}
              >
                <AntDesign
                  name="filter"
                  size={20}
                  color="#FFF"
                  style={{ marginLeft: 5 }}
                />

                <Text style={{ fontFamily: "Regular", color: "#FFF" }}>
                  أقل سعر: {min_price}
                </Text>
              </View>
              : <View />}

            {state !== ""
              ? <View
                style={{
                  flexDirection: "row-reverse",
                  backgroundColor: "#fe7e25",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  height: 30
                }}
              >
                <AntDesign
                  name="filter"
                  size={20}
                  color="#FFF"
                  style={{ marginLeft: 5 }}
                />

                <Text style={{ fontFamily: "Regular", color: "#FFF" }}>
                  {state}
                </Text>
              </View>
              : <View />}
          </ScrollView>
        </View>
        <View style={{ flex: 1, width: "100%", marginTop: 10 }}>
          {data.length > 0
            ? <Text
              style={{
                width: "100%",
                fontFamily: "Bold",
                textAlign: "center",
                marginBottom: 20
              }}
            >
              نتائج البحث :
            </Text>
            : <Text />}
          {isLoading == false
            ? RenderProperites()
            : <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                width: "100%"
              }}
            >
              <ActivityIndicator size={70} color="#fe7e25" />
            </View>}
        </View>
      </View>
    </View>
  );
}