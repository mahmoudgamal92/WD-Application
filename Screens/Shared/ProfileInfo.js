import React, { Component, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Modal
} from "react-native";

import { Entypo, MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { url } from "../../constants/constants";
import styles from "../../theme/style";
import { useSelector, useDispatch } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { userSlice } from "../../store/userSlice";
export default function PersonalInfo({ navigation, route }) {
  const dispatch = useDispatch();
  const user_info = useSelector(state => state.userReducer.user);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [profile_img, setProfileImg] = useState("");
  const [new_upload, setNewUpload] = useState(false);
  const [user_name, setUserName] = useState(null);
  const [user_email, setUserEmail] = useState(null);
  const [user_phone, setUserPhone] = useState(null);
  const [delete_alert, SetDeleteAlert] = useState(false);
  const [user_token, setToken] = useState(null);

  const screenTitle = "تعديل البيانات الشخصية";


  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      setToken(user_token);

      let formData = new FormData();
      formData.append("user_token", token);
      fetch(url.base_url + "profile/user.php", {
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
          setUserName(json.data.user_name);
          setUserEmail(json.data.email);
          setUserPhone(json.data.phone);
          setData(json.data);
          if (json.data.user_image == "" || json.data.user_image == null) {
          }
          else {
            setProfileImg({ uri: url.media_url + json.data.user_image });
          }
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateProfile = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("user_token");
    let formData = new FormData();
    formData.append("user_token", token);
    formData.append("user_name", user_name);
    formData.append("user_email", user_email);
    formData.append("user_phone", user_phone);
    if (new_upload == true) {
      if (profile_img !== null && profile_img !== "") {
        formData.append("profile_img", {
          uri: profile_img.uri,
          name: profile_img.name,
          type: profile_img.type
        });
      }
    }
    fetch(url.base_url + "profile/update.php", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        "cache-control": "no-cache"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.sucess == false) {
          alert("نأسف هناك عطل من طرفنا");
        } else {
          alert(responseJson.message);
          if (profile_img !== null && profile_img !== "") {
            updateUserStore();
          }
          _retrieveData();
          _storeInfo(responseJson.user);
        }
        setLoading(false);
      });
  };

  const updateUserStore = () => {
    user_info.user_image = profile_img.name;
    dispatch(userSlice.actions.setUserInfo(JSON.stringify(user_info)));
  }

  const _storeInfo = async data => {
    try {
      await AsyncStorage.setItem("user_info", JSON.stringify(data));
      dispatch(userSlice.actions.setUserInfo(JSON.stringify(data)));
    } catch (error) {
      console.log(error);
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1
      });
      if (!result.canceled) {
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let img_type = match ? `image/${match[1]}` : `image`;
        setProfileImg({
          uri: localUri,
          name: filename,
          type: img_type
        });
        setNewUpload(true);
      }
    } catch (E) {
      console.log(E);
    }
  };




  const _deleteAccount = async () => {
    const token = await AsyncStorage.getItem("user_token");

    fetch(url.base_url + "profile/delete.php?user_token=" + token, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "cache-control": "no-cache",
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(token);
        // console.log(responseJson);
        if (responseJson.success == true) {
          alert("تم حذف الحساب بنجاح");
          _removeSession();
          // _retrieveData();
        } else {
          alert(responseJson.message);
        }
      });
  };

  // LogOut Function
  const _removeSession = async () => {
    try {
      //SetFailedAlert(!failed_alert);
      AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => navigation.replace("Logout"));
    } catch (error) {
      console.log(error);
      alert("Erorr : " + error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9F9F9",
        width: "100%"
      }}
    >
      <CustomHeader text={screenTitle} />

      <View style={styles.rootContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            paddingHorizontal: 15
          }}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >

          <Modal
            animationType="slide"
            transparent={true}
            visible={delete_alert}
            onRequestClose={() => SetDeleteAlert(!delete_alert)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    backgroundColor: "red",
                    width: 50,
                    height: 50,
                    marginTop: -25,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25
                  }}
                >
                  <AntDesign name="delete" size={24} color="#FFF" />
                </View>

                <TouchableOpacity
                  onPress={() => SetDeleteAlert(!delete_alert)}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingHorizontal: 20
                  }}
                >
                  <FontAwesome name="close" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.modalText}>حذف حسابك</Text>

                <Text style={styles.modalBody}>
                  هل متأكد من حذف حسابك من التطبيق ؟
                  {"\n"}
                  سيتم حذف جميع بياناتك
                </Text>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => _deleteAccount()}
                >
                  <Text style={styles.textStyle}>تأكيد</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={{
            marginVertical: 20
          }}>


            {profile_img !== null && profile_img !== ""
              ?
              <TouchableOpacity onPress={() => _pickImage()}>
                {/* <Text> {profile_img.uri.toString()} </Text> */}
                <View style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  zIndex: 1000,
                  alignItems: "flex-end",
                  justifyContent: "flex-end"
                }}>
                  <View style={{
                    backgroundColor: "#FFF",
                    borderRadius: 20,
                    width: 35,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center"

                  }}>
                    <MaterialIcons name="edit" size={30} color="#fe7e25" />

                  </View>
                </View>

                <Image
                  source={{ uri: profile_img.uri }}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    borderWidth: 2,
                    borderColor: "#fe7e25"

                  }}
                />

              </TouchableOpacity>
              :

              <TouchableOpacity onPress={() => _pickImage()}>
                <View style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  zIndex: 1000,
                  alignItems: "flex-end",
                  justifyContent: "flex-end"
                }}>
                  <View style={{
                    backgroundColor: "#FFF",
                    borderRadius: 20,
                    width: 35,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center"

                  }}>
                    <MaterialIcons name="edit" size={30} color="#fe7e25" />

                  </View>
                </View>

                <Image
                  source={require('./../../assets/man.png')}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 150,
                    height: 150,

                  }}
                />

              </TouchableOpacity>
            }

          </View>

          <View style={styles.inputContainer}>
            <View style={styles.placeHolderContainer}>
              <Text style={styles.placeholderText}>أسم المستخدم</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                selectionColor={"grey"}
                onChangeText={value => setUserName(value)}
                style={styles.inputStyle}
                defaultValue={data.user_name}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.placeHolderContainer}>
              <Text style={styles.placeholderText}>البريد الألكتروني</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                onChangeText={value => setUserEmail(value)}
                defaultValue={data.email}
                keyboardType="email-address"
                placeholder="البريد الألكتروني"
                style={styles.inputStyle}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>

            <View style={styles.placeHolderContainer}>
              <Text style={styles.placeholderText}>رقم الهاتف</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                selectionColor={"#fe7e25"}
                onChangeText={value => setUserPhone(value)}
                defaultValue={data.phone}
                placeholder="رقم الهاتف"
                keyboardType="numeric"
                style={styles.inputStyle}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => SetDeleteAlert(true)}
            style={[styles.profileItem, { width: '100%', borderColor: 'red', borderWidth: 1, }]}
          >
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "red",
                  marginHorizontal: 10
                }}
              >
                حذف الحساب
              </Text>
              <View style={styles.profileItemIcon}>
                <MaterialIcons name="delete" size={30} color="red" />
              </View>
            </View>
            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="red" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <TouchableOpacity
              onPress={() => UpdateProfile()}
              style={{
                backgroundColor: "#fe7e25",
                paddingVertical: 15,
                borderRadius: 10,
                width: "100%",
                marginBottom: 10
              }}
            >
              {isLoading == false
                ? <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Bold",
                    paddingHorizontal: 50
                  }}
                >
                  حفظ
                </Text>
                : <ActivityIndicator
                  size="large"
                  color={"#FFF"}
                  style={{ paddingHorizontal: 50 }}
                />}
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </View>
  );
}
