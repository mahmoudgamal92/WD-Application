import {
    TouchableOpacity,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Image,
    TextInput,
    ScrollView
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { MaterialCommunityIcons, AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
  import { url,client_type } from "../../constants/constants";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import CustomHeader from "./../../components/CustomHeader";
  import styles from "./../../theme/style";
  import { Dropdown } from "react-native-element-dropdown";

  export default function AddUser({ route, navigation }) {
    const [isLoading, setLoading] = React.useState(false);
    const [data, setData] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const [user_name, setUserName] = useState("");
    const [user_email, setUserEmail] = useState("");
    const [user_phone, setUserPhone] = useState("");
    const [user_type, setUserType] = useState("");

    const screenTitle = "إضافة عميل جديد";
  
    const wait = timeout => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    };
  
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      _retrieveData();
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
    const createUser = async () => {
      try {
        const user_id = await AsyncStorage.getItem("user_token");
        let formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("name", user_name);
        formData.append("email", user_email);
        formData.append("phone", user_phone);
        formData.append("type", user_type);
        setLoading(true);
        fetch(url.base_url + "profile/create_client.php", {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            "cache-control": "no-cache",
            Connection: "keep-alive"
          },
          body:formData
        })
          .then(response => response.json())
          .then(json => {
            if (json.success == true) {
              alert("تم انشاء الحساب");
              navigation.navigate("Clients");
              setLoading(false);
            } else {
              setLoading(false);
            }
          })
          .catch(error => console.error(error));
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader text={screenTitle} />
        <View style={styles.rootContainer}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingHorizontal: 10
              }}
            >
              {/* Mobile Input */}
              <View
                style={{
                  flexDirection: "row-reverse",
                  borderColor: "#fe7e25",
                  width: "100%",
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginVertical: 10,
                  height: 58
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: "flex-end",
                    position: "absolute",
                    marginTop: -10
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      fontFamily: "Regular",
                      backgroundColor: "#FFF",
                      textAlign: "right",
                      paddingHorizontal: 10
                    }}
                  >
                    أسم العميل
                  </Text>
                </View>
  
                <View
                  style={{
                    flexDirection: "row-reverse",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <TextInput
                    selectionColor={"#fe7e25"}
                    onChangeText={val => setUserName(val)}
                    style={{
                      fontFamily: "Regular",
                      textAlign: "right",
                      paddingBottom: 2,
                      height: "100%",
                      width: "100%",
                      fontSize: 20,
                      fontFamily: "Bold",
                      color: "grey"
                    }}
                  />
  
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      right: 0,
                      position: "absolute",
                      flexDirection: "row-reverse"
                    }}
                  >
                    <Feather name="user" size={35} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>
  
              {/* Mobile Input */}
              <View
                style={{
                  flexDirection: "row-reverse",
                  borderColor: "#fe7e25",
                  width: "100%",
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginVertical: 10,
                  height: 58
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: "flex-end",
                    position: "absolute",
                    marginTop: -10
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      fontFamily: "Regular",
                      backgroundColor: "#FFF",
                      textAlign: "right",
                      paddingHorizontal: 10
                    }}
                  >
                    رقم الجوال
                  </Text>
                </View>
  
                <View
                  style={{
                    flexDirection: "row-reverse",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <TextInput
                    selectionColor={"#fe7e25"}
                    onChangeText={val => setUserPhone(val)}
                    keyboardType="numeric"
                    style={{
                      fontFamily: "Regular",
                      textAlign: "right",
                      paddingBottom: 2,
                      height: "100%",
                      width: "100%",
                      fontSize: 20,
                      fontFamily: "Bold",
                      color: "grey"
                    }}
                  />
  
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      right: 0,
                      position: "absolute",
                      flexDirection: "row-reverse"
                    }}
                  >
                    <AntDesign
                      name="caretdown"
                      size={12}
                      color="grey"
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 16,
                        color: "grey",
                        marginHorizontal: 5
                      }}
                    >
                      +966
                    </Text>
                    <Image
                      source={require("./../../assets/ksa.png")}
                      style={{ width: 30, height: 25, borderRadius: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
  
              {/* Mobile Input */}
              <View
                style={{
                  flexDirection: "row-reverse",
                  borderColor: "#fe7e25",
                  width: "100%",
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginVertical: 10,
                  height: 58
                }}
                >
                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: "flex-end",
                    position: "absolute",
                    marginTop: -10
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      fontFamily: "Regular",
                      backgroundColor: "#FFF",
                      textAlign: "right",
                      paddingHorizontal: 10
                    }}
                  >
                    البريد الإلكتروني
                  </Text>
                </View>
  
                <View
                  style={{
                    flexDirection: "row-reverse",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <TextInput
                    selectionColor={"#fe7e25"}
                    onChangeText={val => setUserEmail(val)}
                    keyboardType="email-address"
                    style={{
                      fontFamily: "Regular",
                      textAlign: "right",
                      paddingBottom: 2,
                      height: "100%",
                      width: "100%",
                      fontSize: 20,
                      fontFamily: "Bold",
                      color: "grey"
                    }}
                  />
  
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      right: 0,
                      position: "absolute",
                      flexDirection: "row-reverse"
                    }}
                  >
                    <MaterialIcons name="email" size={35} color="grey" />
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
                styles.dropdown,{ borderRadius: 10,borderColor:"#fe7e25",height:60 }
              ]}
              itemContainerStyle	={{width:"100%"}}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{ fontFamily: "Regular", fontSize: 12,textAlign:"right" }}
              data={client_type}
              //search
              maxHeight={300}
              labelField="title"
              valueField="slug"
              placeholder={ "أختر نوع العميل "}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setUserType(item.slug);
                setIsFocus(false);
              }}
              renderLeftIcon={() =>

                <Feather name="user"   
                style={styles.icon}
                size={30}
                color="grey" />
              }
              renderRightIcon={() =>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={30}
                  color="grey"
                />}
            />
          </View>


              {isLoading == true
                ? 
                <TouchableOpacity
                    style={{
                      width: "100%",
                      marginVertical: 10,
                      backgroundColor: "#fe7e25",
                      padding: 10,
                      borderRadius: 10
                    }}
                  >
                    <ActivityIndicator size={40} color={"#FFF"} />
                  </TouchableOpacity>
                : 
                <TouchableOpacity
                    onPress={() => createUser()}
                    style={{
                      width: "100%",
                      marginVertical: 10,
                      backgroundColor: "#fe7e25",
                      padding: 10,
                      borderRadius: 10
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Bold",
                        textAlign: "center",
                        color: "#FFF"
                      }}
                    >
                      إضافة عميل جديد
                    </Text>
                  </TouchableOpacity>
                }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  