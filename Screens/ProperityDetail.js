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
  Modal,
  ImageBackground
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Entypo
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url, icons } from "../constants/constants";
import Constants from "expo-constants";
import { Dropdown } from 'react-native-element-dropdown';
import { getAdvType, getPropType } from "./../utils/functions";
import { Video, ResizeMode } from 'expo-av';
import { Iconify } from "react-native-iconify";

const ProperityDetail = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [video_modal, setVideoModal] = useState(false);

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [adv_val, setAdvVal] = useState("for_sale");
  const [user_token, setUserToken] = useState("");

  const { prop } = route.params;
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const send_msg = "مرحبا أود الأستفسار عن العقار " + prop.adv_title;
  const Screenwidth = Dimensions.get("window").width;
  const Screenheight = Dimensions.get("window").height;

  useEffect(() => {
    console.log(prop);
    _retrieveData();
    _retriveLike();
  }, []);



  const toggleFavorite = (prop_id) => {
    try {
      //setFavLoading(prop_id);
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
    } catch (error) {
      console.log(error);
    }
  };



  const PropertyDetails = () => {
    return (
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10
      }}>


        {icons.map((item) => (
          prop[item.name] !== "" && prop[item.name] !== "false" ?
            <View style={{
              width: 80,
              //height: 50,
              maxHeight: 80,
              margin: 10,
              backgroundColor: "#DDDDDD",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5
            }}>
              {item.icon}

              <Text style={{
                fontFamily: "Regular",
                color: "grey",
                fontSize: 10
              }}>
                {item.nameAR}
              </Text>
              <Text style={{
                fontFamily: "Regular",
                color: "grey"
              }}>
                {prop[item.name]}
              </Text>
            </View>
            :
            null
        ))}
      </View>
    );
  };

  const openAddressOnMap = (label, lat, lng) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    //const label = label;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };



  const _retriveLike = () => {
    fetch(url.base_url + "properties/like.php?type=" + prop.prop_type, {
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
          // alert(JSON.stringify(json.data));
          setData(json.data);

        }
        else {
          setData([]);
        }
      })
  }

  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      setUserToken(user_token);
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
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={{ flex: 1 }}>
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
                  أختر نوع الإعلان
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
                  placeholder={isFocus !== "type" ? 'أختر نوع المنتج ' : '...'}
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


        <Modal
          animationType="slide"
          transparent={true}
          visible={video_modal}
          onRequestClose={() => {
            setVideoModal(!video_modal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.reportModalView}>

              <View style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: 10
              }}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                  onPress={() => setVideoModal(!video_modal)}
                >
                  <AntDesign name="closesquareo" size={30} color="red" />
                </TouchableOpacity>

                <Text style={{
                  fontFamily: "Bold"
                }}>
                  فيديو العقار
                </Text>
              </View>

              <Video
                style={{
                  width: 300,
                  height: 500
                }}
                source={{
                  uri: url.media_url + prop.prop_video,
                }}
                useNativeControls
                resizeMode={"stretch"}
                isLooping
              //onPlaybackStatusUpdate={status => setStatus(() => status)}
              />


            </View>
          </View>
        </Modal>

        <View
          style={{
            backgroundColor: "#F8F8F8",
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View>
              {prop.prop_images !== ""
                ?
                <ScrollView
                  horizontal
                  pagingEnabled
                  style={{ flexDirection: "row-reverse", height: Screenheight * 0.35, }}>
                  {prop.prop_images.split(",").map((item) => {
                    return (
                      <ImageBackground
                        source={{
                          uri: url.media_url + item
                        }}
                        resizeMode="stretch"
                        style={{
                          width: Screenwidth,
                          height: Screenheight * 0.35,
                        }}
                      >

                        <View style={{
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          flex: 1,
                          padding: 10
                        }}>
                          <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingHorizontal: 10,
                            marginTop: 50
                          }}>
                            <Ionicons name="notifications" size={40} color="#FFF" />
                            <TouchableOpacity
                              onPress={() => navigation.goBack()}
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#FFF",
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center"
                              }}>
                              <MaterialIcons name="keyboard-arrow-right" size={30} color="#fe7e25" />
                            </TouchableOpacity>
                          </View>

                          <View style={{
                            width: 50,
                            height: 40,
                            backgroundColor: "grey",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <Text style={{
                              fontFamily: "Bold",
                              color: "#FFF"
                            }}>1/2</Text>
                          </View>
                        </View>

                      </ImageBackground>
                    )
                  })}

                </ScrollView>

                : <Image
                  source={{
                    uri:
                      "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                  }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 300
                  }}
                />}
            </View>

            <ScrollView horizontal>
              {prop.prop_images.split(",").map((item) => {
                return (
                  <Image
                    source={{
                      uri: url.media_url + item
                    }}
                    resizeMode="stretch"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      margin: 5,
                      borderWidth: 1,
                      borderColor: "#DDDDDD"
                    }}
                  />)
              })}
              {prop.prop_video == null || prop.prop_video == "" ?
                null :
                <TouchableOpacity
                  onPress={() => setVideoModal(true)}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    margin: 5,
                    borderWidth: 1,
                    borderColor: "#DDDDDD",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FontAwesome name="video-camera" size={24} color="black" />
                </TouchableOpacity>
              }
            </ScrollView>


            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
                paddingHorizontal: 10,

              }}
            >
              <View style={{ width: "70%", marginTop: 10, alignItems: "flex-end" }}>

                <View style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  borderRadius: 10,
                  paddingHorizontal: 10
                }}>
                  <Text style={{
                    fontFamily: "Bold",
                    color: "#0e2e3b",
                    textAlign: "right",
                    fontSize: 20
                  }}>
                    {getPropType(prop.prop_type) + " " + getAdvType(prop.adv_type)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#fff2e9",
                  borderColor: "#fe7e25",
                  borderWidth: 1,
                  padding: 5
                }}
              >
                <Text
                  style={{
                    fontFamily: "Regular",
                    color: "#fe7e25",
                    paddingVertical: 5,
                    paddingHorizontal: 15
                  }}
                >
                  {getAdvType(prop.adv_type)}
                </Text>
              </View>
            </View>



            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                marginTop: 20,
                paddingHorizontal: 15,

              }}
            >
              <Ionicons name="location" size={30} color="#fe7e25" />
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: 15,
                  marginHorizontal: 5,
                  textAlign: "right"
                }}
              >
                {prop.prop_address}
              </Text>
            </View>




            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#C8DAEB",
                paddingHorizontal: 15,

              }}
            >


              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "flex-end",
                  marginTop: 10,
                  textAlign: "center",
                  backgroundColor: "#fe7e25",
                  padding: 10,
                  borderRadius: 10
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bold",
                    color: "#FFF",
                    fontSize: 20,
                    marginHorizontal: 5
                  }}
                >
                  {prop.prop_price}
                </Text>

                <Text
                  style={{
                    fontFamily: "Regular",
                    color: "#FFF",
                    fontSize: 12
                  }}
                >
                  ر.س
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "flex-end",
                  marginTop: 10,
                  textAlign: "center",
                  backgroundColor: "#FFF",
                  padding: 10,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bold",
                    color: "#fe7e25",
                    fontSize: 18,
                    marginHorizontal: 5
                  }}
                >
                  عقار رقم {parseInt(parseInt(prop.prop_id) + 1000)}
                </Text>
              </View>


            </View>

            <View style={{
              paddingHorizontal: 15
            }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: 20,
                  textAlign: "right",
                  marginTop: 20,
                  marginBottom: 10
                }}
              >
                الوصف :
              </Text>

              <View style={{

                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#DDDDDD",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "flex-start",
                height: 100,
                padding: 10
              }}>
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 15,
                    width: "100%",
                    marginTop: 20,
                    marginHorizontal: 10,
                    textAlign: "right"
                  }}
                >
                  {prop.prop_desc}
                </Text>
              </View>
            </View>
            <View style={{
              paddingHorizontal: 15
            }}>

              <Text style={{
                fontFamily: "Bold",
                fontSize: 17,
                marginVertical: 10
              }}>
                مميزت العقار
              </Text>
            </View>


            {PropertyDetails()}



            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15

              }}
            >
              <Text
                style={{
                  width: "100%",
                  fontFamily: "Bold",
                  fontSize: 20,
                  textAlign: "right",
                  marginVertical: 20
                }}
              >
                موقع العقار
              </Text>

              <TouchableOpacity
                onPress={() => openAddressOnMap(
                  prop.adv_title + "(تطبيق عقار تك)",
                  parseFloat(prop.prop_coords.split(",")[0]),
                  parseFloat(prop.prop_coords.split(",")[1])
                )}
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 20,
                  overflow: "hidden"
                }}
              >
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
                    latitude: parseFloat(prop.prop_coords.split(",")[0]) || 0,
                    longitude: parseFloat(prop.prop_coords.split(",")[1]) || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                >
                  <Marker
                    key={prop.prop_id}
                    coordinate={{
                      latitude: parseFloat(prop.prop_coords.split(",")[0]) || 0,
                      longitude: parseFloat(prop.prop_coords.split(",")[1]) || 0,
                    }}
                  >
                    <Image
                      source={require("./../assets/location.png")}
                      style={{ width: 50, height: 50 }}
                    />
                  </Marker>
                </MapView>
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 15, marginTop: 50, marginBottom: 20 }}>
              <Text
                style={{
                  width: "100%",
                  fontFamily: "Bold",
                  fontSize: 20,
                  textAlign: "right",
                  marginVertical: 20
                }}
              >
                معلومات المعلن
              </Text>

              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#DDDDDD",
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View style={{ width: "100%", flexDirection: "row-reverse" }}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}>

                    <View>

                      <Text
                        style={{
                          fontFamily: "Bold",
                          textAlign: "center",
                          fontSize: 16
                        }}>
                        {user !== null ? user.user_name : "معلن مجهول"}
                      </Text>


                      <View style={{
                        flexDirection: "row"
                      }}>
                        <AntDesign name="star" size={20} color="#DDDDDD" />
                        <AntDesign name="star" size={20} color="#FCF566" />
                        <AntDesign name="star" size={20} color="#FCF566" />
                        <AntDesign name="star" size={20} color="#FCF566" />
                        <AntDesign name="star" size={20} color="#FCF566" />
                      </View>

                    </View>

                    <MaterialIcons
                      name="account-circle"
                      size={60}
                      color="#c9c9c9"
                    />
                  </View>
                </View>

                <View style={{
                  flexDirection: "row",
                  paddingHorizontal: 40,
                  justifyContent: "space-around",
                  width: "100%",
                  marginTop: 20
                }}>
                  <View style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: "#fe7e25",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <MaterialCommunityIcons name="message-processing-outline" size={24} color="#fe7e25" />
                  </View>


                  <View style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: "#fe7e25",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Ionicons name="call" size={24} color="#fe7e25" />
                  </View>


                  <View style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: "#fe7e25",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FontAwesome name="whatsapp" size={24} color="#fe7e25" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  setReportModalVisible(true)
                }
                style={{
                  padding: 15,
                  borderRadius: 10,
                  borderColor: "red",
                  borderWidth: 1,
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="report" size={24} color="red"
                  style={{ marginHorizontal: 10 }} />
                <Text style={{ fontFamily: "Bold", color: "red" }}>
                  الابلاغ عن المحتوي
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30, marginBottom: 20, paddingHorizontal: 15 }}>
              <Text style={{ fontFamily: "Bold", fontSize: 20 }}>
                إعلانات مشابهة :
              </Text>
            </View>

            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View style={{ flex: 1, width: "100%" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProperityDetail", {
                        prop: item
                      })}
                    style={{
                      backgroundColor: "#FFF",
                      borderRadius: 10,
                      marginHorizontal: 20,
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderWidth: 0.8,
                      borderColor: "#DDDDDD",
                      height: 140,
                      marginVertical: 5
                    }}>
                    <View style={{ width: "40%" }}>
                      <ImageBackground
                        source={{ uri: url.media_url + item.prop_images.split(",")[0] }}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}

                        imageStyle={{
                          borderBottomRightRadius: 10,
                          borderTopRightRadius: 10,
                          resizeMode: "stretch",
                        }}>

                        <View style={{
                          alignItems: "flex-end",
                          width: "100%",
                          height: "100%",
                          padding: 5
                        }}>


                          <View style={{
                            backgroundColor: "#FFF",
                            borderRadius: 40,
                            height: 35,
                            width: 35,
                            alignItems: "center",
                            justifyContent: "center"
                          }}>

                            <TouchableOpacity onPress={() => toggleFavorite(item.prop_id)}>
                              <AntDesign name="hearto" size={24} color="grey" />

                            </TouchableOpacity>
                          </View>

                          <View style={{
                            width: "100%",
                            flex: 1,
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            padding: 5
                          }}>

                            <View style={{
                              backgroundColor: "#fe7e25",
                              borderRadius: 50,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                            }}>
                              <Text style={{
                                fontFamily: "Bold",
                                color: "#FFF"
                              }}>
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
                      <View style={{
                        width: "60%",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        borderRadius: 10,
                        backgroundColor: "#FFF",
                        paddingHorizontal: 5
                      }}>

                        <Text style={{
                          fontFamily: "Bold",
                          color: "#0e2e3b",
                          textAlign: "right",
                          fontSize: 16
                        }}>
                          {getPropType(item.prop_type) + " " + getAdvType(item.adv_type)}
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
                        }}>
                        {item.prop_price} ريال
                      </Text>


                      <View>

                      </View>

                      <View
                        style={{
                          flexDirection: "row-reverse",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >

                        <Entypo name="location-pin" size={30} color="grey" />
                        <Text style={{
                          fontFamily: "Regular",
                          color: "grey",
                        }}>
                          {item.address.substring(0, 25)}...
                        </Text>
                      </View>


                    </View>
                  </TouchableOpacity>
                </View>
              }
            />

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