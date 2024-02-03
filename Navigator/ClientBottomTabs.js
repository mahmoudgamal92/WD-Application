import React, { Component, useState, useEffect } from "react";

import {
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform
} from "react-native";

import { Iconify } from "react-native-iconify";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Screens/Profile";
import MapScreen from "./../Screens/Client/MapScreen";
import UserHome from "./../Screens/User/Home";

import Requests from "./../Screens/Requests";
import NewRequest from "./../Screens/NewRequest";
import { AppStack } from "./AppStack";


const Tabs = createBottomTabNavigator();
export const ClientTabStack = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const _proceedNavigation = screen => {
    setModalVisible(!modalVisible);
    navigation.navigate(screen);
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
          //zIndex: 99999999
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-end"
                }}
              >
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    paddingHorizontal: 10
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Bold"
                    }}
                  >
                    اغلاق
                  </Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => _proceedNavigation("AddRequest")}
                style={{
                  flexDirection: "row-reverse",
                  borderRadius: 10,
                  borderColor: "#DDDDDD",
                  paddingVertical: 10,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 10,
                  paddingHorizontal: 10
                }}
              >
                <View style={{ width: "20%", alignItems: "center" }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: "#fff2e9",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Iconify
                      icon="ant-design:home-filled"
                      size={32}
                      color="#fe7e25"
                    />
                  </View>
                </View>
                <View style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontFamily: "Bold",
                      color: "#000",
                      textAlign: "right"
                    }}
                  >
                    أطلب عقار
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      color: "grey",
                      fontSize: 12,
                      textAlign: "right"
                    }}
                  >
                    سجل طلبك إذا لم تجدة في العقارات المعروضة لدينا
                  </Text>
                </View>

                <View style={{ width: "20%", alignItems: "center" }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Iconify
                      icon="fluent:ios-arrow-24-filled"
                      size={32}
                      color="#fe7e25"
                    />
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => _proceedNavigation("NewAdd")}
                style={{
                  flexDirection: "row-reverse",
                  borderRadius: 10,
                  borderColor: "#DDDDDD",
                  paddingVertical: 10,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 10,
                  paddingHorizontal: 10
                }}
              >
                <View style={{ width: "20%", alignItems: "center" }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: "#fff2e9",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Iconify
                      icon="ic:sharp-add-home"
                      size={32}
                      color="#fe7e25"
                    />
                  </View>
                </View>
                <View style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontFamily: "Bold",
                      color: "#000",
                      textAlign: "right"
                    }}
                  >
                    إضافة عقار جديد
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      color: "grey",
                      textAlign: "right",
                      textAlign: "right"
                    }}
                  >
                    إضافة عقار للبيع أو الإيجار
                  </Text>
                </View>

                <View style={{ width: "20%", alignItems: "center" }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Iconify
                      icon="fluent:ios-arrow-24-filled"
                      size={32}
                      color="#fe7e25"
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: Platform.OS === "ios" ? 30 : 12,
          right: "40%",
          left: "40%",
          width: 60,
          height: 60,
          backgroundColor: "#fe7e25",
          borderRadius: 30,
          zIndex: 99999,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Iconify icon="ph:plus" size={40} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Tabs.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        backgroundColor="#FFF"
        barStyle={{
          flexDirection: "row-reverse",
          backgroundColor: "#FFF"
        }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#fe7e25",
          tabBarInactiveTintColor: "#969696",
          tabBarStyle: {
            backgroundColor: "#FFF",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopColor: "#fe7e25",
            borderTopWidth: 1.5,
            // Not Working Fine In IOS
            height: Platform.OS == "ios" ? 80 : 60
          }
        }}
      >
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: ({ color, size }) =>
              <Text style={{ fontFamily: "Regular", color }}>الحساب </Text>,
            tabBarIcon: ({ color, size }) =>
              <Iconify icon="iconamoon:profile-fill" size={24} color={color} />
          }}
        />

        <Tabs.Screen
          name="Requests"
          component={Requests}
          options={{
            tabBarLabel: ({ color, size }) =>
              <Text style={{ fontFamily: "Regular", color }}>الطلبات</Text>,
            tabBarIcon: ({ color, size }) =>
              <Iconify
                icon="material-symbols:order-approve-outline"
                size={24}
                color={color}
              />
          }}
        />

        <Tabs.Screen
          name="NewRequest"
          component={NewRequest}
          options={{
            tabBarLabel: ({ color, size }) =>
              <Text style={{ fontFamily: "Regular", color }} />
          }}
        />

        <Tabs.Screen
          name="MapScreen"
          component={UserHome}
          options={{
            tabBarLabel: ({ color, size }) =>
              <Text style={{ fontFamily: "Regular", color }}>الخريطة</Text>,
            tabBarIcon: ({ color, size }) =>
              <Iconify icon="solar:earth-bold" size={24} color={color} />
          }}
        />

        <Tabs.Screen
          name="Home"
          component={AppStack}
          options={{
            tabBarLabel: ({ color, size }) =>
              <Text style={{ fontFamily: "Regular", color }}>الرئيسية</Text>,
            tabBarIcon: ({ color, size }) =>
              <Iconify icon="ant-design:home-filled" size={24} color={color} />
          }}
        />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
