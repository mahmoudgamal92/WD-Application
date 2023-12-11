import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {url} from '../../constants/constants';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from '../../store/userSlice';

export default function Spalsh({ route, navigation }) {

    const dispatch = useDispatch();
    useFocusEffect(
      React.useCallback(() => {
        _fetchUser();
        _getCache();
      }, [])
    );

  const _fetchUser = async () => {
    const user = await AsyncStorage.getItem("user_info");
    if (user !== null) 
    {
      dispatch(userSlice.actions.setUserInfo(user));
    }
    else 
    {
      dispatch(userSlice.actions.setUserInfo(""));
    }
  }


    const _getCache = async () => {
      fetch(url.base_url + "cache/cache.php", {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "cache-control": "no-cache",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          AsyncStorage.setItem("aqar_cache_data", JSON.stringify(json));
          navigation.replace("AppFlow");
        })
    };

  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      height: "100%",
      width: "100%",
    }}>
      <StatusBar translucent backgroundColor={"transparent"}/>
      <ImageBackground style={{
        width: "100%",
        height: "100%",
        flex: 1
      }}
        source={require("./../../assets/tower.jpg")}
      >

        <LinearGradient
          // Background Linear Gradient
          colors={['#fe7e25', '#000' ]}
          style={{
            opacity: 0.75,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{
            paddingHorizontal: 20,
            width:"100%",
            height:100,
            alignItems:"center",
            justifyContent:"center",
            flex:1
          }}>


            <Image source={require("./../../assets/wd_white.png")} 
            style={{
              width:300,
              height:300
            }}/>


            <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Bold",
                  fontSize:16
                }}
              >
                ود .... عقاراتك بكل ود
              </Text>
            <TouchableOpacity
              // onPress={() => navigation.replace("Start")}
              style={{
                position:"absolute",
                bottom:20,
                backgroundColor: "#fe7e25",
                paddingVertical: 15,
                borderRadius: 10,
                width: "100%",
                marginBottom: 10
              }}
            >

              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Bold"
                }}
              >
              هيا بنا لنبدأ  
              </Text>
            </TouchableOpacity>

          </View>
        </LinearGradient>
      </ImageBackground>

    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#042352",

  },
  buttonContainer: {
    paddingTop: 20
  }
});