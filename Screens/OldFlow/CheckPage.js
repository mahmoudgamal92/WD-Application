import React, { Component, useState, useEffect } from "react";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Select, CheckIcon, NativeBaseProvider } from "native-base";

export default class CheckPage extends Component {
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View style={{ flex: 1, backgroundColor: "#EDECEC" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            padding: 20,
            paddingTop: Constants.statusBarHeight
          }}
        >
          <Text
            style={{
              color: "grey",
              textAlign: "auto",
              fontFamily: "Regular",
              fontSize:20,
              width: "100%",
              marginBottom: 50,
              textAlign:"center"
            }}
          >
           أختر نوع الحساب
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("OwnerHome")}

              style={{
                padding: 10,
                backgroundColor: "#FFF",
                marginHorizontal: 15,
                borderColor: "grey",
                borderWidth: 1.5,
                borderRadius: 10
              }}
            >
            
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ClientHome")}
              style={{
                padding: 10,
                backgroundColor: "#FFF",
                marginHorizontal: 15,
                borderColor: "grey",
                borderWidth: 1.5,
                borderRadius: 10
              }}
            >
           
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            //  onPress={this.LoginUser}
            disabled={true}
            onPress={() => this.props.navigation.navigate("OtpScreen")}
            style={{
              backgroundColor: "#fe7e25",
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%",
              marginBottom: 10,
              marginTop:100
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Regular"
              }}
            >
              استمرار
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
