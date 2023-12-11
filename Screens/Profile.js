import React,{useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import ClientProfile from "./Client/Profile";
import UserProfile from "./User/Profile";

export default function Profile() {
  const navigation = useNavigation();
  const user_info = useSelector(state => state.userReducer.user);

  useFocusEffect(
   useCallback(() => {
      _retrieveData();
    }, [])
  );

  const _retrieveData = async () => {
    const user_token = await AsyncStorage.getItem("user_token");
    if (user_token == null) {
      navigation.navigate("SignInScreen");
    }
  };


  if(user_info == null || user_info == "" || user_info == undefined)
  {
    return (<UserProfile/>);
  }

  else 
  {
    const user = JSON.parse(user_info);
    if (user.user_type == "client") {
      return (<ClientProfile/>);
    } else if (user.user_type == "user") {
      return (<UserProfile/>);
    } 
  }

}