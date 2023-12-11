import React from "react";
import { View, Text, StatusBar, ImageBackground } from "react-native";
import DefaultHeader from "../../components/DefaultHeader";
import styles from "../../theme/style";
import { Iconify } from "react-native-iconify";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ClientHome() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <StatusBar backgroundColor="#fe7e25" />
      <DefaultHeader />

      <View
        style={{
          backgroundColor: "#fafafa",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
          paddingVertical: 10,
          alignItems: "center"
        }}
      />

      <View
        style={{
          width: "100%",
          alignItems: "center"
        }}
      >
        <ImageBackground
          source={require("./../../assets/slider.png")}
          style={{
            width: "90%",
            height: 200,
            borderRadius: 10,
            resizeMode: "contain"
          }}
          imageStyle={{
            borderRadius: 10,
            resizeMode: "contain"
          }}
        >
          <LinearGradient
            colors={["#fe7e25", "#000"]}
            style={{
              opacity: 0.75,
              width: "100%",
              height: "100%",
              flex: 1,
              justifyContent: "center",
              borderRadius: 10,
              alignItems: "flex-end",
              padding: 20
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: "#FFF",
                fontSize: 25,
                marginVertical: 5
              }}
            >
              ود .... عقارانك بكل ود
            </Text>
            <Text
              style={{
                fontFamily: "Regular",
                color: "#FFF",
                fontSize: 20,
                marginVertical: 5
              }}
            >
              إذا كنت تبحث عن فيلا , شقة , منزل
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#fe7e25",
                paddingVertical: 15,
                borderRadius: 10,
                width: "100%",
                marginBottom: 10,
                paddingHorizontal: 10,
                marginVertical: 5
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  color: "#FFF"
                }}
              >
                أطلب عقارك الأن
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={styles.sectionView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CurrentSubscription")}
          style={styles.sectionContainer}
        >
          <Iconify icon="ri:shake-hands-fill" size={32} color="#fe7e25" />
          <Text
            style={{
              fontFamily: "Bold"
            }}
          >
            إشتراكاتي
          </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <Iconify icon="ri:shake-hands-fill" size={32} color="#fe7e25" />
          <Text
            style={{
              fontFamily: "Bold"
            }}
          >
            صفقاتي
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("UsersScreen")}
          style={styles.sectionContainer}
        >
          <Iconify icon="fa:users" size={32} color="#fe7e25" />
          <Text
            style={{
              fontFamily: "Bold"
            }}
          >
            عملائي
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("UsersScreen")}
          style={styles.sectionContainer}
        >
          <Iconify icon="mdi:users-add" size={32} color="#fe7e25" />
          <Text
            style={{
              fontFamily: "Bold"
            }}
          >
            المستخدمين
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileInfo")}
          style={styles.sectionContainer}
        >
          <Iconify icon="mingcute:profile-fill" size={32} color="#fe7e25" />
          <Text
            style={{
              fontFamily: "Bold"
            }}
          >
            معلوماتي
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Invoices")}
          style={styles.sectionContainer}
        >
          <Iconify icon="mdi:invoice-edit" size={32} color="#fe7e25" />
          <Text
            style={{
              fontFamily: "Bold"
            }}
          >
            فواتيري
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("OrdersMap")}
          style={styles.sectionContainer}>
          <Iconify icon="solar:map-point-wave-bold" size={32} color="#fe7e25" />
          <Text
            style={{
              fontFamily: "Bold"
            }}
          >
            خريطة الطلبات
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}