import {
  Animated,
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
  Linking,
  TextInput,
  ActivityIndicator,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {url} from "../constants/constants";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
  EvilIcons
} from "@expo/vector-icons";
import {
  Actionsheet,
  useDisclose,
  NativeBaseProvider,
  Box,
  Select,
  CheckIcon
} from "native-base";
export default function BlankPage({ route, navigation }) {
  const { author_id } = route.params;
  const { isOpen, onOpen, onClose } = useDisclose();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [message, setMessage] = useState("");

  const [isLoading, setLoading] = React.useState(false);
  const [personal_data, setPersonal] = useState([]);
  const [insights, setInsights] = useState([]);
  const [props, setProps] = useState([]);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      setLoading(true);
      fetch(url.base_url + "author-page&author_id=" + author_id, {
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
          setPersonal(json.data.user_info);
          setInsights(json.data.user_insight);
          setProps(json.data.user_propery);
          //alert(JSON.stringify(json))
        })
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const SendMessage = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      let formData = new FormData();
      const msg_param = message;
      formData.append("message", msg_param);
      formData.append("prop_id", prop_id);
      setButtonLoading(true);
      fetch(url.base_url + "conversations&endpointChild=new", {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + user_token,
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        },
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.data !== undefined) {
            SetSuccessAlert(!success_alert);
          } else {
            alert("Sorry, Internal Erorr !");
          }
          setButtonLoading(false);
          onClose();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmptyProp = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40
        }}
        >
        <Image
          source={require("./../assets/computer.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text
          style={{
            fontFamily: "Regular",
            color: "#c9c9c9",
            fontSize: 18,
            marginTop: 10
          }}
        >
          هذا المستخدم ليس لديه اي عقارات
        </Text>
      </View>
    );
  };

  return (
    <View>
      {isLoading == false
        ? <View style={styles.container}>
            <View
              style={{
                paddingHorizontal: 40,
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                backgroundColor: "#fe7e25",
                height: 60,
                width: "100%",
                alignItems: "center"
               }}
             >
              <Text
                style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}
              >
                معلومات المعلن
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-circle-sharp"
                  size={24}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={{marginBottom:50}}>
              <View style={{justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SellerInfo")}
                  style={{
                    marginTop: 20,
                    padding: 10,
                    borderWidth: 1.5,
                    borderColor: "#46D0D9",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    width: "85%"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      paddingHorizontal: 10,
                      alignItems: "center"
                    }}
                  >
                    {personal_data.author_custom_picture === "" ||
                    personal_data.author_custom_picture === undefined
                      ? <MaterialIcons
                          name="account-circle"
                          size={40}
                          color="#c9c9c9"
                        />
                      : <Image
                          source={{ uri: personal_data.author_custom_picture }}
                          style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                            borderRadius: 50
                          }}
                        />}

                    <View>
                      <Text
                        style={{
                          fontFamily: "Bold",
                          color: "#143656",
                          fontSize: 16,
                          marginHorizontal: 10,
                          textAlign: "right"
                        }}
                      >
                        {personal_data.author_first_name +
                          " " +
                          personal_data.author_last_name}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 5
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Bold",
                        color: "#143656",
                        alignItems: "center",
                        fontSize: 10
                      }}
                    >
                      رقم المعلن: {personal_data.author_phone}
                    </Text>

                    <Text
                      style={{
                        fontFamily: "Bold",
                        color: "#143656",
                        fontSize: 10
                      }}
                    >
                      صفة المعلن : {personal_data.author_character}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("SellerInfo")}
                  style={{
                    marginTop: 20,
                    padding: 10,
                    borderWidth: 1.5,
                    borderColor: "#46D0D9",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    width: "85%"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <View
                      style={{ width: "20%", flexDirection: "row-reverse" }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          borderWidth: 6,
                          alignItems: "center",
                          justifyContent: "center",
                          borderColor: "#46D0D9"
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                        width: "80%"
                      }}
                    >
                      {insights.map((item, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row-reverse",
                              width: "33.3%"
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "Regular",
                                marginHorizontal: 5
                              }}
                            >
                              {item.number}
                            </Text>
                            <Text style={{ fontFamily: "Regular" }}>
                              {item.title}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 50
                }}
              >
                <TouchableOpacity
                  onPress={onOpen}
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    borderColor: "#46D0D9",
                    borderWidth: 1,
                    backgroundColor: "#09551A",
                    flexDirection: "row-reverse",
                    alignItems: "center"
                  }}
                >
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={24}
                    color="#FFF"
                  />

                  <Text style={{ fontFamily: "Regular", color: "#FFF" }}>
                    محادثة
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("tel:" + personal_data.author_mobile)}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    borderColor: "#46D0D9",
                    borderWidth: 1,
                    backgroundColor: "#7B8EA0",
                    flexDirection: "row-reverse"
                  }}
                >
                  <Feather name="phone-call" size={24} color="#FFF" />
                  <Text style={{ fontFamily: "Bold", color: "#FFF" }}>
                    اتصال
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 50,
                  marginBottom: 20,
                  width: "100%",
                  paddingHorizontal: 20
                }}
              >
                <Text
                  style={{ fontFamily: "Bold", fontSize: 20, color: "#fe7e25" }}
                >
                  العقارات
                </Text>
              </View>

              <FlatList
                style={{ width: "100%", paddingHorizontal: 5 }}
                data={props}
                ListEmptyComponent={handleEmptyProp()}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) =>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ProperityDetail", {
                          prop_id: item.id
                        })}
                      style={{
                        paddingTop: 5,
                        flexDirection: "row-reverse",
                        height: 120,
                        backgroundColor: "#FFF",
                        borderRadius: 10,
                        marginHorizontal: 10,
                        paddingTop: 5,
                        marginBottom: 5
                      }}
                    >
                      <View
                        style={{
                          width: "25%",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Image
                          source={{ uri: item.thumbnail }}
                          resizeMode="cover"
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 10,
                            margin: 5
                          }}
                        />
                      </View>

                      <View style={{ width: "50%", justifyContent: "center" }}>
                        <Text
                          style={{
                            color: "#000",
                            fontFamily: "Bold",
                            textAlign: "center"
                          }}
                        >
                          {item.title}
                        </Text>

                        <View style={{ flexDirection: "row-reverse" }}>
                        {item.property_overview.map((item, index) =>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginHorizontal: 10,
                            justifyContent: "center"
                          }}
                        >
                          <FontAwesome5
                          name={item.icon_class.replace("fas fa-", "").trim()}
                          size={16}
                          color="#7B8EA0"
                        />
                          <Text
                            style={{
                              fontFamily: "Regular",
                              color: "grey",
                              fontSize: 16,
                              margin: 5
                            }}
                          >
                           {item.value}
                          </Text>
                        </View>
                       )}
                        </View>
                      </View>
                      <View
                        style={{
                          width: "25%",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row-reverse",
                            marginBottom: 5
                          }}
                        >
                          <EvilIcons
                            name="location"
                            size={24}
                            color="#019AFF"
                          />
                          <Text
                            style={{
                              fontFamily: "Regular",
                              textAlign: "center",
                              color: "#019AFF",
                              fontSize: 12
                            }}
                          >
                            {item.state}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row-reverse",
                            alignItems: "flex-end",
                            justifyContent: "space-between"
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Bold",
                              color: "#fe7e25",
                              fontSize: 20
                            }}
                          >
                            {item.prop_price}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Regular",
                              fontSize: 10,
                              marginHorizontal: 2
                            }}
                          >
                            رس
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>}
              />
              <NativeBaseProvider>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content>
                    <View style={{ height: 200, width: "100%", padding: 20 }}>
                      <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontFamily: "Bold", color: "#fe7e25" }}>
                          أكتب رسالتك
                        </Text>
                        <TextInput
                          onChangeText={message => setMessage(message)}
                          placeholder="أكتب ما تريد اخبار المالك به"
                          style={{
                            backgroundColor: "#FFF",
                            height: 60,
                            marginBottom: 20,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: "#41A2D8",
                            width: "100%",
                            fontFamily: "Regular",
                            textAlign: "right"
                          }}
                        />
                      </View>

                      <View style={{}}>
                        <TouchableOpacity
                          //onPress={() => SendMessage()}
                          style={{
                            backgroundColor: "#41A2D8",
                            paddingVertical: 15,
                            borderRadius: 20,
                            width: "100%",
                            marginBottom: 20
                          }}
                        >
                          {buttonLoading == false
                            ? <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    marginHorizontal: 10
                                  }}
                                >
                                  ارسال
                                </Text>
                                <Ionicons name="send" size={24} color="#FFF" />
                              </View>
                            : <ActivityIndicator size="large" color={"#FFF"} />}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Actionsheet.Content>
                </Actionsheet>
              </NativeBaseProvider>
            </ScrollView>
          </View>
        : <View
            style={{
              flex: 1,
              marginTop: 400,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size={70} color="grey" />
          </View>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});
