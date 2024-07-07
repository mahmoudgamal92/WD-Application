import { createStackNavigator } from '@react-navigation/stack';

import Start from "./../Screens/Auth/Start";
import SplashScreen from './../Screens/Auth/SplashScreen';
import SignUpScreen from './../Screens/Auth/SignUpScreen';
import SignInScreen from './../Screens/Auth/SignInScreen';
import OtpScreen from './../Screens/Auth/OtpScreen';

import { ClientTabStack } from "./ClientBottomTabs";
import { UserTabStack } from "./UserBottomTabs";

export const Authentication = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      <AuthStack.Screen name="Start" component={Start} />
      <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStack.Screen name="OtpScreen" component={OtpScreen} />
      <AuthStack.Screen name="ClientFlow" component={ClientTabStack} />
      <AuthStack.Screen name="UserFlow" component={UserTabStack} />

    </AuthStack.Navigator>
  )
}



