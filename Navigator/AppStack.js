import { createStackNavigator } from '@react-navigation/stack';

import ProperityDetail from './../Screens/ProperityDetail';
import HomePage from '../Screens/HomePage';
import MyProps from '../Screens/Client/MyProps';

import ProfileInfo from '../Screens/Shared/ProfileInfo';
import PersonalProperites from '../Screens/Client/PersonalProperites';
import PricingPlans from '../Screens/PricingPlans';
import CurrentSubscription from '../Screens/Client/CurrentSubscription';
import UsersScreen from '../Screens/Client/UsersScreen';
import AddUser from '../Screens/Client/AddUser';

import Invoices from '../Screens/Client/Invoices';
import InvoiceDetails from '../Screens/Client/InvoiceDetails';
import PrivacyPolicy from '../Screens/Shared/PrivacyPolicy';
import Terms from '../Screens/Shared/Terms';
import FilterScreen from '../Screens/OldFlow/FilterScreen';
import ResultScreen from './../Screens/ResultScreen';
import SellerInfo from './../Screens/SellerInfo';
import Logout from '../Screens/Auth/Logout';
import Notification from './../Screens/Notification';
import OrdersMap from './../Screens/Client/OrdersMap';

import AddRequest from '../Screens/Shared/AddRequest';
import RequestDetails from "../Screens/RequestDetails";
import NewAdd from "../Screens/NewAdd";
import AdBasicInfo from "../Screens/Ad/BasicInfo";
import AdMapInfo from "./../Screens/Ad/MapInfo";
import AdMediaInfo from "./../Screens/Ad/MediaInfo";
import FaLicense from "./../Screens/FaLicense";
const HomeStack = createStackNavigator();
export const AppStack = () => {
    return(
        <HomeStack.Navigator initialRouteName='HomePage' screenOptions={{ headerShown: false}}>
        <HomeStack.Screen name="HomePage" component={HomePage} />
        <HomeStack.Screen name="Terms" component={Terms} />
        <HomeStack.Screen name="ProperityDetail" component={ProperityDetail} />
        <HomeStack.Screen name="MyProps" component={MyProps} />
        <HomeStack.Screen name="ProfileInfo" component={ProfileInfo} />
        <HomeStack.Screen name="PersonalProperites" component={PersonalProperites} />
        <HomeStack.Screen name="PricingPlans" component={PricingPlans} />
        <HomeStack.Screen name="CurrentSubscription" component={CurrentSubscription} />
        <HomeStack.Screen name="UsersScreen" component={UsersScreen} />
        <HomeStack.Screen name="AddUser" component={AddUser} />
        <HomeStack.Screen name="Invoices" component={Invoices} />
        <HomeStack.Screen name="InvoiceDetails" component={InvoiceDetails} />
        <HomeStack.Screen name="FilterScreen" component={FilterScreen} />
        <HomeStack.Screen name="ResultScreen" component={ResultScreen} />
        <HomeStack.Screen name="Logout" component={Logout} />
        <HomeStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <HomeStack.Screen name="SellerInfo" component={SellerInfo} />
        <HomeStack.Screen name="AddRequest" component={AddRequest} />
        <HomeStack.Screen name="Notification" component={Notification} />
        <HomeStack.Screen name="RequestDetails" component={RequestDetails} />
        <HomeStack.Screen name="NewAdd" component={NewAdd} />
        <HomeStack.Screen name="AdBasicInfo" component={AdBasicInfo} />
        <HomeStack.Screen name="AdMapInfo" component={AdMapInfo} />
        <HomeStack.Screen name="AdMediaInfo" component={AdMediaInfo} />
        <HomeStack.Screen name="FaLicense" component={FaLicense} />
        <HomeStack.Screen name="OrdersMap" component={OrdersMap} />        
        </HomeStack.Navigator>
      )
  }