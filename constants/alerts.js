import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Text, View, Dimensions } from "react-native";
import styles from "../theme/style";

const toastConfig = {
  // Error Toast
  //##############################################
  erorrToast: ({ text1, text2 }) =>
    <View style={styles.toastContainer}>
      <View style={{ backgroundColor: "red", width: 7, height: "100%" }} />
      <View style={styles.toastIcon}>
        <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
          <Ionicons name="alert-circle" size={40} color="red" />
        </View>
      </View>

      <View style={{ paddingHorizontal: 5, width: "80%" }}>
        <Text style={{ fontFamily: "Bold", color: "#000" }}>خطأ</Text>
        <Text style={{ fontFamily: "Regular", color: "grey", fontSize: 13 }}>
          {text1}
        </Text>
      </View>
    </View>,



  // Showing Error Modal
  //##############################################
  erorrModal: ({ text1, text2 }) =>
    <View style={styles.modalContainer}>
      <View style={styles.modalToastBody}>
        <View style={{ backgroundColor: "red", width: 7, height: "100%" }} />
        <View
          style={{
            flexDirection: "row-reverse",
            width: "15%",
            justifyContent: "space-between"
          }}
        >
          <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
            <Ionicons name="alert-circle" size={40} color="red" />
          </View>
        </View>

        <View style={{ paddingHorizontal: 5, width: "80%" }}>
          <Text style={{ fontFamily: "Bold", color: "#000" }}>خطأ</Text>
          <Text style={{ fontFamily: "Regular", color: "grey", fontSize: 13 }}>
            {text1}
          </Text>
        </View>
      </View>
    </View>,



   // Showing Success Modal
  //##############################################
  successModal: ({ text1, text2 }) =>
    <View style={styles.modalContainer}>
      <View style={styles.modalToastBody}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: -30
          }}
        >
          <AntDesign name="checkcircle" size={60} color="green" />
        </View>

        <View
          style={{
            paddingHorizontal: 5,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 29
          }}
        >
          <Text style={{ fontFamily: "Bold", color: "#000" }}>
            {text1}
          </Text>
          <Text style={{ fontFamily: "Regular", marginTop: 20, color: "grey" }}>
            {text2}
          </Text>
        </View>
      </View>
    </View>,




   // Showing Success Modal
  //##############################################
  usersModal: ({ text1, text2 }) =>
    <View style={styles.modalContainer}>
      <View style={styles.modalToastBody}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: -30
          }}
        >
          <AntDesign name="checkcircle" size={60} color="green" />
        </View>

        <View
          style={{
            paddingHorizontal: 5,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 29
          }}
        >
          <Text style={{ fontFamily: "Bold", color: "#000" }}>
            {text1}
          </Text>
          <Text style={{ fontFamily: "Regular", marginTop: 20, color: "grey" }}>
            {text2}
          </Text>
        </View>
      </View>
    </View>
};

export default toastConfig;
