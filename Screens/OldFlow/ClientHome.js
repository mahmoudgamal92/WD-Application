import React, { Component } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
  Entypo,
  MaterialIcons,
  AntDesign,
  Feather
} from "@expo/vector-icons";
import { Button, Divider, Actionsheet, useDisclose, Center, NativeBaseProvider,Slider ,Box,Select,CheckIcon } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./ChatScreen";
import ProfileScreen from "../ProfileScreen";
import FavoriteScreen from "../FavoriteScreen";
import MessagesScreen from "./MessagesScreen";
import NewAdd from "../NewAdd";

import * as theme from "../theme/theme";
import styles  from "../../theme/style";



const mocks = [
  {
    id: 1,
    user: {
      name: "أسم المالك",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    saved: true,
    location: "القاهرة, مصر",
    temperature: 34,
    title: "عقار للبيع",
    description: "وصف العقار , وصف العقار ",
    rating: "438398 ج م",
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    images: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    user: {
      name: "أسم المالك",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    saved: true,
    location: "القاهرة, مصر",
    temperature: 34,
    title: "عقار للبيع",
    description: "وصف العقار , وصف العقار ",
    rating: "100000 ج م",
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80",
    images: [
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    user: {
      name: "أسم المالك",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    saved: true,
    location: "القاهرة, مصر",
    temperature: 34,
    title: "عقار للبيع",
    description: "وصف العقار , وصف العقار ",
    rating: "438398 ج م",
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    user: {
      name: "أسم المالك",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    saved: true,
    location: "القاهرة, مصر",
    temperature: 34,
    title: "عقار للبيع",
    description: "وصف العقار , وصف العقار ",
    rating: "438398 ج م",
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

function HomePage({ navigation, route }) {
  const CategoryList = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {mocks.map((item, index) =>
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Cat_items", {
                cat_id: item.id,
                cat_title: item.title
              })}
          >
            <View style={styles.categoryItem}>
              <FontAwesome5 name="home" size={24} color="black" />
              <Text style={styles.categoryText}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };

  
  const RenderProperites = () => {
 
    return (
      <View style={[styles.column, styles.destinations]}>
        <FlatList
          decelerationRate={0}
          style={{ overflow: "visible" }}
          data={mocks}
          keyExtractor={(item, index) => `${item.id}`}
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }} }])}
          renderItem={({ item }) =>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("ProperityDetail")}
            >
              <ImageBackground
                style={[styles.flex, styles.destination, styles.shadow]}
                imageStyle={{ borderRadius: theme.sizes.radius }}
                source={{ uri: item.preview }}
              >
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                  <View style={{ flex: 0 }}>

                  <MaterialIcons name="favorite-border"  size={theme.sizes.font * 1.8}
                      color={theme.colors.white} />
                 
                  </View>
                
                  <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0,
                      justifyContent: "center",
                      alignItems: "flex-end",
                      backgroundColor: "#fe7e25",
                      paddingHorizontal: 10,
                      marginHorizontal: 10,
                      borderRadius: 5
                    }}
                  >
                    <Text style={styles.rating}>للبيع</Text>
                  </View>
                  <View
                    style={{
                      flex: 0,
                      justifyContent: "center",
                      alignItems: "flex-end",
                      backgroundColor: "#fe7e25",
                      paddingHorizontal: 10,
                      borderRadius: 5
                    }}
                  >
                    <Text style={styles.rating}>جديد</Text>
                  </View>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.destinationData}>

                <View>
                  
                <View style={{ flexDirection: 'row'}}>
                <Entypo name="home" size={20} color="grey" />
                <Text style={{fontFamily: "Regular"}}>
                فيلا للبيع بحي الملقا
              </Text>
              </View>
              <View style={{ flexDirection: 'row'}}>
              <Entypo name="location" size={20} color="grey" />              
              <Text style={{fontFamily: "Regular"}}>
              القاهرة , مصر
              </Text>

              </View>
              <View style={{ flexDirection: 'row'}}>
              <MaterialIcons name="monetization-on" size={20} color="grey" />         
              <Text style={{fontFamily: "Regular",color:'#fe7e25'}}>
            589490 ر.س
              </Text>
              </View>
                </View>

                <View style={{}}>
                  <Text style={{fontFamily: "Regular"}}>
                    3.4
                  </Text>
                </View>
             
              </View>
            </TouchableOpacity>}
        />
        
      </View>
    );
  };


const Map_Button = () => {

return(
    <View style={{width:"100%",justifyContent: "center",alignItems:"center",}}>
  <TouchableOpacity 
 onPress={() =>
   navigation.navigate("MapScreen")}
  style={{
    width: 100,  
    height: 40,
    flexDirection:"row",  
    alignItems: "center", 
    borderRadius: 5,            
    backgroundColor: 'rgba(52, 52, 52, 0.7)',                              
    position: 'absolute',
    justifyContent: "center",                                          
    bottom: 30,                                                    
  }}>
   
    <Text style={{ fontFamily: "Regular",color:"#FFF",textAlign:"center",marginRight:5}}>
      الخريطة
    </Text>
    <Entypo name="map" size={20} color="#FFF" />
  </TouchableOpacity>
</View>
)
}

  const Search_Section = () => {
    const {
      isOpen,
      onOpen,
      onClose
    } = useDisclose();
   // let [service, setService] = React.useState("");
    return (
    <View>
        <NativeBaseProvider>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <View style={{height:500}}>
            <View>
              <Text style={{fontFamily: "Regular",color:"#fe7e25"}}>
                حدد السعر المناسب لك
              </Text>
              <Box alignItems="center" w="100%" style={{marginTop:20}}>
              <Slider w="3/4" maxW="300" defaultValue={70} minValue={0} maxValue={100} accessibilityLabel="hello world" step={10}  colorScheme="indigo">
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              </Box> 
            </View>

            <View style={{width:"100%"}}>
              <Text style={{ fontFamily: "Regular",color:"#fe7e25"}}>
                نوع العقار 
              </Text>

              <Box>
              <Select 
              width="300"
              placeholderStyle={{fontFamily: "Regular"}}
              accessibilityLabel="أختر نوع العقار"
              placeholder="أختر نوع العقار" 
              _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1}>
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </Box>
          </View>

          <View style={{width:"100%"}}>
              <Text style={{ fontFamily: "Regular",color:"#fe7e25"}}>
                المنطقة
              </Text>

              <Box>
              <Select 
              width="300"
              placeholderStyle={{fontFamily: "Regular"}}
              accessibilityLabel="أختر نوع العقار"
              placeholder="أختر نوع العقار" 
              _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1}>
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </Box>
          </View>

          <View style={{width:"100%"}}>
              <Text style={{ fontFamily: "Regular",color:"#fe7e25"}}>
             المدينة
              </Text>

              <Box>
              <Select 
              width="300"
              placeholderStyle={{fontFamily: "Regular"}}
              accessibilityLabel="أختر نوع العقار"
              placeholder="أختر نوع العقار" 
              _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1}>
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </Box>
          </View>

            <View style={{}}>
            <TouchableOpacity 
      style={styles.nextButton}>
        <Text style={styles.nextButtonText}>بحث</Text>
      </TouchableOpacity>
            </View>


            </View>
          </Actionsheet.Content>
        </Actionsheet>
        </NativeBaseProvider>
    <View style={{ flexDirection: "row" }}>
    <View
      style={{
        width: "25%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
          backgroundColor: "#FFF",
          paddingVertical: 10,
          borderRadius: 5,
          paddingHorizontal: 15,
          marginBottom: 10
        }}
        onPress={onOpen}
      >
    <MaterialIcons name="settings-input-component" size={30} color="black" />
      </TouchableOpacity>
    </View>

    <View style={styles.SearchboxContainer}>
      <TextInput
        placeholder="أبحث عن أي شيء"
        returnKeyType="search"
        placeholderTextColor="#666"
        style={styles.Searchbox}
        placeholderStyle={{
        fontFamily: "Regular"
        }}
        // onChangeText={search_val =>setSearch_val(search_val)}
        // onSubmitEditing={Search}
      />
      <TouchableOpacity
        style={styles.SearchboxIcon}
        // onPress={() =>
        //   navigation.navigate("Search", {
        //     s_val: search_val
        //   })}
      >

        <Feather name="search" size={22} color="#666" />
      </TouchableOpacity>
    </View>
  </View>
  </View>
  )}

  return (

    <View style={{flex:1,marginTop:50}}>
      {Search_Section()}
      {CategoryList()}
<ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: 60,
        paddingBottom: theme.sizes.padding
      }}
    >
      {RenderProperites()}
    </ScrollView>
    {Map_Button()}
    </View>
  );
}


// const Top = createMaterialTopTabNavigator();

// function Top() {
//   return (
//     <NavigationContainer>
//       <Top.Navigator>
//         <Top.Screen name="Home" component={HomePage} />
//       </Top.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator initialRouteName="Home">
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color, size }) =>
            <Text style={{ fontFamily: "Regular", color }}>الحساب </Text>,
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons name="account" size={30} color={color} />
        }}
      />

      <Tabs.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: ({ color, size }) =>
            <Text style={{ fontFamily: "Regular", color }}>المفضلة</Text>,
          tabBarIcon: ({ color, size }) =>
            <MaterialIcons name="favorite-outline" size={30} color={color} />
        }}
      />

      <Tabs.Screen
        name="courses"
        component={NewAdd}
        options={{
          tabBarLabel: () => <Text style={{ fontFamily: "Regular" }}>اعلان</Text>,
          tabBarIcon: () =>
            <View
              style={{
                height: 58,
                width: 58,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderColor: "#fe7e25",
                borderWidth: 2,
                borderRadius: 30,
                top: -18,
                elevation: 5
              }}
            >
              <FontAwesome name="plus" size={30} color="#fe7e25" />
            </View>
        }}
      />

      <Tabs.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          tabBarLabel: ({ color, size }) =>
            <Text style={{ fontFamily: "Regular", color }}>الرسائل</Text>,
          tabBarIcon: ({ color, size }) =>
            <Entypo name="message" size={30} color={color} />
        }}
      />

      <Tabs.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: ({ color, size }) =>
            <Text style={{ fontFamily: "Regular", color }}>الرئيسية</Text>,
          tabBarIcon: ({ color, size }) =>
            <Entypo name="home" size={30} color={color} />
        }}
      />
      {/* 
          <Tabs.Screen name="Add" component={Add} />
          <Tabs.Screen name="Favorite" component={Favorite} />
          <Tabs.Screen name="Profile" component={Profile} /> */}
    </Tabs.Navigator>
  );
}
