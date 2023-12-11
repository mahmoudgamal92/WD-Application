import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ClientHome from "./Client/Home";
import UserHome from "./User/Home";
export default function HomePage() {
  const user_info = useSelector(state => state.userReducer.user);

  if(user_info == null || user_info == "" || user_info == undefined)
  {
    return (<UserHome/>);
  }

  else 
  {
    const user = JSON.parse(user_info);
    if (user.user_type == "client") {
      return (<ClientHome/>);
    } else if (user.user_type == "user") {
      return (<UserHome/>);
    } 
    else {
      return (<UserHome/>);
    }
  }

}