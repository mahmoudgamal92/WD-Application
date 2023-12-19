import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image
} from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { url } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "./../../components/CustomHeader";
import styles from "./../../theme/style";
import { useFocusEffect } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
export default function Interests({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const [bottomSheetState, SetBottomSheetState] = useState(-1);
  const [selected_state, setSelectedState] = useState(null);
  const [selected_state_name, setSelectedStateName] = useState(null);

  const [data, setData] = useState([]);
  const [states, setStates] = useState([]);
  const screenTitle = "الإهتمامات";

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _retrieveData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      _retrieveData();
    }, [])
  );

  const bottomSheetRef = useRef();
  const handleSheetChanges = useCallback(index => {}, []);

  const openBottomSheet = () => {
    SetBottomSheetState(0);
    bottomSheetRef.current.expand();
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    const cache_text = await AsyncStorage.getItem("aqar_cache_data");
    const cache = JSON.parse(cache_text);
    const cached_states = cache.data.states;
    setStates(cached_states);

    try {
      const token = await AsyncStorage.getItem("user_token");
      setLoading(true);
      if (token == null) {
        navigation.navigate("SignInScreen");
      } else {
        fetch(url.base_url + "profile/interests.php?user_token=" + token, {
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
            // alert(JSON.stringify(json));
            if (json.success == true) {
              setData(json.data);
              setLoading(false);
            } else {
              setData([]);
              setLoading(false);
            }
          })
          .catch(error => console.error(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addInterest = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_token");
      let formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("city_id", selected_state);
      formData.append("city_name", selected_state_name);
      setLoading(true);
      fetch(url.base_url + "profile/create_interest.php", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          "cache-control": "no-cache",
          Connection: "keep-alive"
        },
        body: formData
      })
        .then(response => response.json())
        .then(json => {
          if (json.success == true) {
            alert("تم إضافة المدينة بنجاح");
            closeBottomSheet();
            _retrieveData();
            setLoading(false);
          } else {
            alert(JSON.stringify(json));
            setLoading(false);
          }
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
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
        <Image source={require("./../../assets/no_result.png")} />
        <Text
          style={{
            fontFamily: "Bold",
            color: "#000",
            fontSize: 18,
            marginTop: 10
          }}
        >
          لا يوجد لديك أي إهتمامات حاليا
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        {isLoading == false
          ? <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              keyExtractor={(item, index) => `${item.id}`}
              ListEmptyComponent={handleEmptyProp()}
              renderItem={({ item }) =>
                <TouchableOpacity
                  style={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    height: 70,
                    backgroundColor: "#FFF",
                    marginHorizontal: 10,
                    marginVertical: 10,
                    borderRadius: 10,
                    paddingHorizontal: 10
                  }}
                >
                  <View style={{ width: "20%", alignItems: "flex-end" }}>
                    <MaterialIcons
                      name="my-location"
                      size={40}
                      color="#fe7e25"
                    />
                  </View>

                  <View style={{ width: "60%", justifyContent: "center" }}>
                
                      <Text
                        style={{
                          color: "grey",
                          fontFamily: "Bold",
                          textAlign: "right",
                          fontSize: 15,
                          marginHorizontal: 5
                        }}
                      >
                        {item.city_name}
                      </Text>
                  </View>

                  <View
                    style={{
                      width: "20%",
                      alignItems: "center",
                      justifyContent: "space-around",
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity>
                      <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>}
            />
          : <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator size={70} color="#fe7e25" />
            </View>}

        <View
          style={{
            margin: 20,
            width:"100%",
            paddingHorizontal:20
          }}
        >
          <TouchableOpacity
            onPress={() => openBottomSheet()}
            style={{
              backgroundColor: "#fe7e25",
              padding: 10,
              borderRadius: 10,
              width:"100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "center",
                color: "#FFF"
              }}
            >
              إضافة جديد
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetState}
        enableOverDrag={true}
        snapPoints={["80%"]}
        handleComponent={() => null}
        enableContentPanningGesture={true}
        onChange={handleSheetChanges}
        style={{
          borderRadius: 40,
          borderWidth: 1,
          borderColor: "#fe7e25",
          backgroundColor: "grey"
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: "#F8F8F8",
            flex: 1,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            overflow: "hidden",
            borderColor: "#fe7e25"
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
            إختر المدينة
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {states.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedState(item.state_id);
                    setSelectedStateName(item.name);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomColor: "#DDDDDD",
                    borderBottomWidth: 1,
                    padding: 10
                  }}
                >
                  {selected_state == item.state_id
                    ? <Ionicons
                        name="radio-button-on-outline"
                        size={30}
                        color="#fe7e25"
                      />
                    : <Ionicons
                        name="radio-button-off-sharp"
                        size={30}
                        color="grey"
                      />}
                  <Text
                    style={{
                      fontFamily: "Bold",
                      textAlign: "right"
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            onPress={() => addInterest()}
            style={{
              backgroundColor: "#fe7e25",
              padding: 10,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%"
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "center",
                color: "#FFF"
              }}
            >
              تأكيد
            </Text>
          </TouchableOpacity>

        </View>
      </BottomSheet>
    </View>
  );
}
