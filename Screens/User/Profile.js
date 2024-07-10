
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Linking
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Feather,
  Octicons
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from "./../../theme/style";
import { url } from "./../../constants/constants";
import DefaultHeader from "./../../components/DefaultHeader";
export default function ProfilePage() {
  const navigation = useNavigation();
  const [failed_alert, SetFailedAlert] = React.useState(false);
  const [contact_alert, setContactAlert] = React.useState(false);

  const [delete_alert, SetDeleteAlert] = React.useState(false);
  const [confirm_alert, SetConfirmAlert] = React.useState(false);

  const [user_token, setToken] = useState(null);
  const [user_image, setProfileImg] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      _retrieveData();
    }, [])
  );


  const _deleteAccount = user_token => {
    fetch(url.base_url + "profile/delete.php?user_token=" + user_token, {
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
        if (responseJson.success == true) {
          alert("تم حذف الحساب بنجاح");
          _removeSession();
          // _retrieveData();
        } else {
          alert(responseJson.message);
        }
      });
  };




  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");

      if (user_token == null) {
        navigation.navigate("SignInScreen");
      }

      else {
        let formData = new FormData();
        formData.append("user_token", user_token);
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
            // alert(JSON.stringify(json.data.user_image));
            if (json.data.user_image == "" || json.data.user_image == null) {
            }
            else {
              setProfileImg(url.media_url + json.data.user_image);
            }

          })
          .catch(error => console.error(error));
      }
    } catch (error) {
      console.log(error);
    }
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
        backgroundColor: "#F8FBFF",
        flex: 1,
        alignItems: "center"
      }}
    >
      <DefaultHeader />
      <View style={styles.rootContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center"
          }}
          style={{
            width: "100%"
          }}
        >



          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileInfo")}
          >
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
            {user_image == null
              ?
              <Image
                source={require('./../../assets/man.png')}
                resizeMode="contain"
                style={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderWidth: 2,
                  borderColor: "#fe7e25",
                  backgroundColor: "#fe7e25"
                }}
              /> :
              <Image
                source={{ uri: user_image }}
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
            }
          </TouchableOpacity>




          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileInfo")}
            style={styles.profileItem}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                حسابي
              </Text>

              <View style={styles.profileItemIcon}>
                <Iconify
                  icon="iconamoon:profile-fill"
                  size={30}
                  color="#fe7e25"
                />
              </View>
            </View>

            <View>
              <MaterialIcons name="arrow-back-ios" size={30} color="black" />
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalProperites")}
            style={styles.profileItem}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                عقاراتي
              </Text>

              <View style={styles.profileItemIcon}>
                <FontAwesome5 name="clipboard-list" size={30} color="#fe7e25" />

              </View>
            </View>

            <View>
              <MaterialIcons name="arrow-back-ios" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
            style={styles.profileItem}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                الشروط و الأحكام
              </Text>
              <View style={styles.profileItemIcon}>
                <Iconify icon="ic:round-flag" size={30} color="#fe7e25" />
              </View>
            </View>

            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Complains")}
            style={styles.profileItem}>
            <View style={{ flexDirection: "row" }}>

              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                الشكاوي و المقترحات
              </Text>

              <View style={styles.profileItemIcon}>
                <Iconify icon="mdi:chat-warning" size={30} color="#fe7e25" />
              </View>
            </View>

            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PricingPlans")}
            style={styles.profileItem}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                باقات الإشتراك
              </Text>
              <View style={styles.profileItemIcon}>
                <Iconify
                  icon="fluent:payment-16-filled"
                  size={30}
                  color="#fe7e25"
                />
              </View>
            </View>
            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => setContactAlert(!contact_alert)}
            style={styles.profileItem}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                تواصل معنا
              </Text>
              <View style={styles.profileItemIcon}>
                <Iconify
                  icon="solar:call-chat-bold"
                  size={30}
                  color="#fe7e25"
                />
              </View>
            </View>
            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => SetFailedAlert(!failed_alert)}
            style={styles.profileItem}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                تسجيل الخروج
              </Text>
              <View style={styles.profileItemIcon}>
                <Iconify icon="majesticons:logout" size={30} color="#fe7e25" />
              </View>
            </View>
            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => SetDeleteAlert(true)}
            style={styles.profileItem}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
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
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => SetConfirmAlert(!confirm_alert)} style={styles.profileItem}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#143656",
                  marginHorizontal: 10
                }}
              >
                اعلن معنا
              </Text>
              <View style={styles.profileItemIcon}>
                <MaterialCommunityIcons
                  name="offer"
                  size={24}
                  color="#fe7e25"
                />
              </View>
            </View>
            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>


      {/* Modals Start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={failed_alert}
        onRequestClose={() => {
          SetFailedAlert(!failed_alert);
        }}
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
              <FontAwesome name="exclamation" size={24} color="#FFF" />
            </View>

            <TouchableOpacity
              onPress={() => SetFailedAlert(!failed_alert)}
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingHorizontal: 20
              }}
            >
              <FontAwesome name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalText}>تسجيل الخروج</Text>
            <Text style={styles.modalBody}>
              هل أنت متأكد من تسجيل الخروج من التطبيق ؟ لابد من أن تكون متذكر كل
              بياناتك جيدا قبل تسجيل الخروج
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => _removeSession()}
            >
              <Text style={styles.textStyle}> تسجيل الخروج</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>




      {/* Modals Start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contact_alert}
        onRequestClose={() => {
          setContactAlert(!contact_alert);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "#fe7e25",
                width: 50,
                height: 50,
                marginTop: -25,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25
              }}
            >

              <Iconify icon="mdi:face-agent" size={30} color="#FFF" />
            </View>

            <TouchableOpacity
              onPress={() => setContactAlert(!contact_alert)}
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingHorizontal: 20
              }}
            >
              <FontAwesome name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalText}>
              لا تترد أبدا في التواصل معنا
            </Text>

            <Text style={styles.modalBody}>
              يمكنك التواصل معنا في أي وقت عن طريق الواتساب أو البريد الإلكتروني
            </Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
              width: "100%",
              paddingHorizontal: 20
            }}>
              <TouchableOpacity
                onPress={() => Linking.openURL('whatsapp://send?phone=+9660595020090')
                }
                style={{
                  width: "45%",
                  backgroundColor: "#fe7e25",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10
                }}>
                <Iconify icon="bi:whatsapp" size={50} color="#FFF" />
                <Text style={{
                  fontFamily: "Regular",
                  color: "#FFF",
                  fontSize: 10
                }}>
                  الواتساب
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:support@wdapp.sa')
                }

                style={{
                  width: "45%",
                  backgroundColor: "#fe7e25",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10
                }}>
                <Iconify icon="eva:email-fill" size={50} color="#FFF" />
                <Text style={{
                  fontFamily: "Regular",
                  color: "#FFF",
                  fontSize: 10
                }}>
                  البريد الإلكتروني
                </Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>



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
              onPress={() => _deleteAccount(user_token)}
            >
              <Text style={styles.textStyle}>تأكيد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={confirm_alert}
        onRequestClose={() => SetConfirmAlert(!confirm_alert)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "#fe7e25",
                width: 50,
                height: 50,
                marginTop: -25,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25
              }}
            >
              <Image source={require('./../../assets/wd_white.png')} style={{
                width: 50,
                height: 50
              }} />
            </View>

            <TouchableOpacity
              onPress={() => SetConfirmAlert(!confirm_alert)}
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingHorizontal: 20
              }}
            >
              <FontAwesome name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalText}>
              تأكيد
            </Text>

            <Text style={styles.modalBody}>
              إذا كنت تريد الإشتراك معنا كمعلن لابد من توثيق حسابك في نفاذ و أيضا توثيق الرخصة العقارية الخاصة بك
            </Text>

            <TouchableOpacity
              onPress={() => {
                SetConfirmAlert(!confirm_alert);
                navigation.navigate("PricingPlans")
              }}
            >
              <Text style={{
                fontFamily: "Regular",
                fontSize: 16,
                color: "#fe7e25",
                textDecorationLine: "underline"
              }}>
                الإطلاع  علي باقات الإشتراك
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#fe7e25" }]}
              onPress={() => {
                SetConfirmAlert(!confirm_alert);
                navigation.navigate("FaLicense")
              }
              }
            >
              <Text style={styles.textStyle}>متابعة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modals End */}
    </View>
  );
}