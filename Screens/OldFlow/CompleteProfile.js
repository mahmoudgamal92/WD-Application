import React, { Component, useState, useEffect } from "react";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { NativeBaseProvider, Select, CheckIcon } from "native-base";
import {url} from "../../constants/constants";
import styles from "../../theme/style";
import { Ionicons } from '@expo/vector-icons'; 

export default function CompleteProfile({ navigation, route }) {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [user_type, setUserType] = useState([]);
  const [user_title, setUserTitle] = useState("");
  
  const [isLoading, setLoading] = React.useState(false);
  const [loading, handleLoading] = React.useState(false);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const user_name = await AsyncStorage.getItem("user_name");
      const token = await AsyncStorage.getItem("user_token");
      const user_type = await AsyncStorage.getItem("user_type");
      const user_title = await AsyncStorage.getItem("user_type_title");
       setUserTitle(user_title);
      setUserType(user_type);
      handleLoading(true);
      fetch(url.base_url + "signup-type/fields?user_type="+user_type, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + token,
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          setData(json.data);
          handleLoading(false);
        })
        
    .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const PushValue = (id, value) => {
    const obj = formData.find(item => item.field_id === id);
    if (obj === undefined) {
      const new_obj = { field_id: id, input_value: value };
      formData.push(new_obj);
    } else {
      formData.map(item => {
        if (item.field_id === id) {
          item.input_value = value;
        }
      });
    }
    console.log(formData);
  };




  const Validate_form = async () => {
    var x = true;
    for (var i = 0; i < formData.length; i++) {
      if(formData[i].input_value == "")
      {
        x = false;
       break;
      }
      }
      UpdateProfile(x);
     };



  const UpdateProfile = async (flag) => {

    if(flag === false)
    {
     alert("لابد من اكمال جميع البيانات المطلوبة*");
    }

  else{
    const token = await AsyncStorage.getItem("user_token");
    let submitForm = new FormData();

    {
      formData.map(item => {

        submitForm.append(item.field_id, item.input_value);
      });
    }
    
    setLoading(true);
    fetch(url.base_url + "profile/update", {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      },
      body: submitForm
    })
      .then(response => response.json())
      .then(responseJson => {
      //  console.log(responseJson);
      //   alert(JSON.stringify(responseJson));
        if (responseJson.success == true) {
         alert("تم حفظ بياناتك بنجاح");
          setLoading(false);
          navigation.replace("HomePage");
          confirm_complete();
        } else {
          alert(responseJson.message);
          setLoading(false);
        }
      });
    }
  };

  const confirm_complete = async () => {
     AsyncStorage.setItem('data_complete','true');
  }


  function renderTextInput({ item }) {
    PushValue(item.field_id,"");
    return (
      <View style={{ width: "100%", paddingHorizontal: 20}}>
        <Text style={[styles.InputLabel, { textAlign: "right",backgroundColor:"#FFF",paddingHorizontal:10,paddingVertical:2,borderRadius:5,alignSelf:"flex-end",marginRight:15,marginBottom:-15}]}>
          {item.label}
        </Text>
        <TextInput
          onChangeText={value => PushValue(item.field_id, value)}
          placeholder={item.placeholder}
          defaultValue={item.value}
          style={styles.InputText}
        />
      </View>
    );
  }


  return (
    <View 
    style={{ flex: 1 }}>
            <StatusBar backgroundColor="#fe7e25" barStyle="light-content" />
          <NativeBaseProvider>
      <View
        style={{
          paddingHorizontal: 40,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          backgroundColor: "#fe7e25",
          height: 60,
          width: "100%",
          alignItems: "center"
        }}
      >
        <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
        نوع الحساب : {user_title}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>


<ScrollView>
      <View style={{alignItems: "center",justifyContent:"center"}}>
        <Image source={require('./../assets/logo.png')} 
        style={{width:150,height:150,marginBottom:20,marginTop: 20}}/>
        </View>
        { loading == false
      ? 
      <View>
        <FlatList
          style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 10 }}
          data={data}
          keyExtractor={(item) => {item.field_id}}
          renderItem={({ item }) => {
            switch (item.type) {
              case "text":
                return renderTextInput({ item });
                break;

              case "textarea":
                return renderTextInput({ item });
                break;

              case "number":
                return renderTextInput({ item });
                break;
            }
          }}
        />
         <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => Validate_form()}
            //onPress={() => this.props.navigation.navigate("OtpScreen")}
            style={{
              backgroundColor: "#fe7e25",
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%",
              marginBottom: 10
            }}
          >
            {isLoading == false
              ? <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Regular"
                  }}
                >
                  حفظ 
                </Text>
              : <ActivityIndicator size="large" color={"#FFF"} />}
          </TouchableOpacity>
        </View>
        </View>
        :
         <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: "100%",
          height:400
        }}
      >
       <ActivityIndicator size={70} color={"#fe7e25"} />
      </View>
      }
       </ScrollView>
      </NativeBaseProvider>
    </View>
  );
}
