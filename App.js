import "./constants/ignoreWarning";
import React, { useState, useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import { I18nManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Authentication } from "./Navigator/AuthStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
// to test git ios
import { Provider } from "react-redux";
import { store } from "./store";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  if (Device.isDevice) {
    const {
      status: existingStatus
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId
    });
    //console.log(token);
  } else {
    alert("Must physical real device for Push Notifications");
  }

  AsyncStorage.setItem("notification_token", token.data);
  return token;
}

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        //console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);

  let [fontsLoaded] = useFonts({
    Bold: require("./assets/fonts/Bold.ttf"),
    Light: require("./assets/fonts/Light.ttf"),
    Regular: require("./assets/fonts/Regular.ttf"),
    Medium: require("./assets/fonts/Medium.ttf")
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Authentication />
      </NavigationContainer>
    </Provider>
  );
}