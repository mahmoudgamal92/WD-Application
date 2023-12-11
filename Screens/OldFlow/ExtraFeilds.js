import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Image,
  ToastAndroid,
  Modal
} from "react-native";
import {
  NativeBaseProvider,
  Select,
  CheckIcon,
  Slider,
  VStack,
  Checkbox
} from "native-base";
//import Counters from "react-native-counters";
import { AntDesign, Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import styles from "../../theme/style";
import {url} from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ExtraFeilds({ route, navigation }) {
  // Params
  const { prop_id, type_id } = route.params;
  const [success_alert, SetSuccessAlert] = React.useState(false);
  // Push Array
  const [formData, setFormData] = useState([]);

  // Feilds
  const [cached_data, setCach] = useState([]);
  const [feilds, setFeilds] = useState([]);
  const [screen_feilds, setScreenFeilds] = useState([]);
  const [screens_num, setScreenMax] = useState();
  const [current_screen, setCurrentScreen] = React.useState(0);
  const [extraData, setExtraData] = React.useState(new Date());
  const [slider_val, setSliderVal] = useState(0);

  // Loading States
  const [isLoading, setLoading] = React.useState(false);
  const [loading, handleLoading] = React.useState(false);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    // alert(type_id);
    try {
      const cache_text = await AsyncStorage.getItem("aqar_cache_data");
      setCach(JSON.parse(cache_text));
      setFeilds(JSON.parse(cache_text).extra_fields[type_id]);
      setScreenFeilds(
        JSON.parse(cache_text).extra_fields[type_id].screen_0.data
      );
      setCurrentScreen(0);
      setScreenMax(JSON.parse(cache_text).extra_fields[type_id].screens_count);
    } catch (error) {
      //console.log(error);
    }
  };

  const PushValue = (id, value, isRequired) => {
    const obj = formData.find(item => item.field_id === id);
    if (obj === undefined) {
      const new_obj = {
        field_id: id,
        input_value: value,
        is_required: isRequired
      };
      formData.push(new_obj);
    } else {
      formData.map(item => {
        if (item.field_id === id) {
          item.input_value = value;
        }
      });
    }
    //setFormData(formData);
    console.log(formData);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "* لابد من اكمال جميع البيانات المطلوبة",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const submitProperity = async () => {
    const token = await AsyncStorage.getItem("user_token");
    let submitForm = new FormData();
    submitForm.append("action", "update_property");
    submitForm.append("prop_id", prop_id);
    {
      formData.map(item => {
        submitForm.append(item.field_id, item.input_value);
      });
    }
    handleLoading(true);
    fetch(url.base_url + "properties&endpointChild=submit", {
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
        if (responseJson.data !== undefined) {
          SetSuccessAlert(!success_alert);
          // alert("تم الحفظ بنجااح");
          //navigation.navigate("PersonalProperites");
        } else {
          alert(responseJson.message);
        }

        handleLoading(false);
      });
  };

  const proceed = async () => {
    SetSuccessAlert(!success_alert);
    navigation.navigate("PersonalProperites");
  };

  const Validate_form = async () => {
    var flag = true;
    for (var i = 0; i < formData.length; i++) {
      if (formData[i].is_required == 1 && formData[i].input_value == "") {
        flag = false;
        break;
      }
    }
    _goNextPage(flag);
  };

  // const _goNextPage = async form_status => {
  //   if (form_status == false) {
  //     //alert("لابد من اكمال جميع البيانات المسبوقة بعلامة * ");
  //     //showToast;
  //     showToastWithGravity();
  //   } else {
  //     if (current_screen < screens_num - 1) {
  //       const next_screen = current_screen + 1;
  //       setScreenFeilds(feilds["screen_" + next_screen].data);
  //       setCurrentScreen(next_screen);
  //     } else {
  //       submitProperity();
  //     }
  //   }
  // };


  const _goNextPage = async form_status => {

    if (form_status == false) {

      showToastWithGravity();
    } 
    else {

      formData.map(x => {
        feilds["screen_" + current_screen].data.map(item =>{
          if(item.field_id == x.field_id)
          {
            switch(item.type){
             case "text":
              item.value = x.input_value;
              break;

              case "textarea":
              item.value = x.input_value;
              break;

              case "number":
              item.value = x.input_value;
              break;

              case "radio":
              item.value = [x.input_value];
              break;
            }
  
          }
          console.log(feilds["screen_" + current_screen].data);
        }); 
      });


      if (current_screen < screens_num - 1) {
        const next_screen = current_screen + 1;
        setScreenFeilds(feilds["screen_" + next_screen].data);
        setCurrentScreen(next_screen);
      } 
      else {
        submitProperity();
      }
    }
  };



  const _goPreviousPage = async () => {
    if (current_screen > 0) {
      const prev_screen = current_screen - 1;
      setScreenFeilds(feilds["screen_" + prev_screen].data);
      setCurrentScreen(prev_screen);
    }
  };




  const switch_val = (id) =>{
    const obj = formData.find(item => item.field_id === id);
    if(obj == -1 || obj == undefined)
    {
     return 1;
    }
 
    else
    {
     const val = obj.input_value
     if(val == 0 || val == "0" || val == null || val == "" || val == -1 || val == undefined)
     return 1;
     else
     return 0;
    }
     }

     

  function renderCheckBox({ item }) {
    PushValue(item.field_id, "0", item.required);
    return (
      <View
        style={{
          margin: 10,
          paddingBottom: 10,
          width: "100%",
          paddingHorizontal: 20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 30,
            paddingVertical: 10,
            justifyContent: "space-between",
            paddingHorizontal: 5
          }}
        >
          <Checkbox
            value="1"
            key={item.field_id}
            color="#0341A0"
              onChange={() => PushValue(item.field_id, parseInt(switch_val(item.field_id)), item.required)}
          />

          <Text style={{ fontFamily: "Bold", color: "#0341A0", width: "80%" }}>
            {item.label}
          </Text>
        </View>
      </View>
    );
  }

  function renderNumberInput({ item }) {
    PushValue(item.field_id, "", item.required);
    return (
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={styles.InputLabel}>
          {item.label}
        </Text>
        <TextInput
          onChangeText={value => PushValue(item.field_id, value)}
          placeholder={item.placeholder}
          caretHidden
          keyboardType="numeric"
          defaultValue={item.value}
          style={styles.InputText}
        />
      </View>
    );
  }

  function renderTextInput({ item }) {
    PushValue(item.field_id, item.value, item.required);
    return (
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={styles.InputLabel}>
          {item.label}
        </Text>
        <TextInput
          onChangeText={value => PushValue(item.field_id, value)}
          placeholder={item.placeholder}
          caretHidden
          defaultValue={item.value}
          style={styles.InputText}
        />
      </View>
    );
  }

  function renderTextAreaInput({ item }) {
    PushValue(item.field_id, "", item.required);
    return (
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={styles.InputLabel}>
          {item.label}
        </Text>
        <TextInput
          onChangeText={value => PushValue(item.field_id, value)}
          placeholder={item.placeholder}
          caretHidden
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          autoCompleteType="email"
          style={[styles.InputText, { height: 100 }]}
        />
      </View>
    );
  }

  function renderSliderBox({ item }) {
    PushValue(item.field_id, 0 , 0);
    return (
      <View
        style={{
          width: "100%",
          padding: 20,
          flexDirection: "row-reverse",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              color: "#fe7e25",
              textAlign: "right",
              marginBottom: 10
            }}
          >
            {item.label}
          </Text>
          <Text />
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            width: "30%",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* <Counters
            buttonStyle={{
              borderColor: "#1DA0C9",
              borderWidth: 1.5,
              borderRadius: 20
            }}
            buttonTextStyle={{
              color: "#1DA0C9"
            }}
            countTextStyle={{
              color: "#000"
            }}
            minusIcon={() =>
              <AntDesign name="minus" size={20} color="#1DA0C9" />}
            plusIcon={() => <AntDesign name="plus" size={20} color="#1DA0C9" />}
            onChange={len => {
              PushValue(item.field_id, parseInt(len), item.required);
            }}
          /> */}
        </View>
      </View>
    );
  }

  function renderSelectInput({ item }) {
    PushValue(item.field_id, "", item.required);
    const mapOptions = () => {
      return item.options.map((option, index) => {
        return (
          <Select.Item  
          flexDirection="row-reverse"
          minWidth="200"
            label={option.name}
            key={option.id}
            value={option.id}
          />
        );
      });
    };

    return (
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={styles.InputLabel}>
          {item.label}
        </Text>
        <Select
          minWidth="200"
          height="50"
          borderRadius="10"
          borderColor="#230D33"
          marginBottom="3"
          borderWidth="1"
          backgroundColor="#FFF"
          placeholder={item.label}
          fontFamily="Regular"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }}
          mt={1}
          onValueChange={value => {
            PushValue(item.field_id, value);
          }}
        >
          {mapOptions()}
        </Select>
      </View>
    );
  }

  return (
    <NativeBaseProvider style={{ backgroundColor: "#FFF" }}>
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#F9F9F9" }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            backgroundColor: "#fe7e25",
            alignItems: "center",
            height: 60,
            width: "100%"
          }}
        >
          <Text style={{ fontFamily: "Regular", fontSize: 15, color: "#FFF" }}>
            البيانات الأضافية
          </Text>
          <TouchableOpacity onPress={() => _goPreviousPage()}>
            <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={success_alert}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  backgroundColor: "green",
                  width: 50,
                  height: 50,
                  marginTop: -25,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25
                }}
              >
                <Entypo name="check" size={24} color="#FFF" />
              </View>
              <Text style={styles.modalText}>تم اضافة العقار بنجاح</Text>
              <Text style={styles.modalBody}>سيتم توجيهك لصفحة عقاراتك</Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => proceed()}
              >
                <Text style={styles.textStyle}>متابعة</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {isLoading == false
          ? <View style={{ width: "100%", flex: 1 }}>
              <ScrollView>
                {screen_feilds.map((item, index) => {
                  switch (item.type) {
                    case "text":
                      return renderTextInput({ item });
                      break;

                    case "textarea":
                      return renderTextAreaInput({ item });
                      break;

                    case "number":
                      return renderNumberInput({ item });
                      break;

                    case "select":
                      return renderSelectInput({ item });
                      break;

                    case "checkbox":
                      return renderCheckBox({ item });
                      break;

                    case "slider":
                      return renderSliderBox({ item });
                      break;
                  }
                })}
              </ScrollView>
              {current_screen === screens_num - 1
                ? <View style={{ padding: 10 }}>
                    {loading == false
                      ? <TouchableOpacity
                          onPress={() => Validate_form()}
                          style={{
                            backgroundColor: "#fe7e25",
                            paddingVertical: 15,
                            borderRadius: 10,
                            width: "100%",
                            marginBottom: 10,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color="#FFF"
                          />
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontFamily: "Regular",
                              marginHorizontal: 20
                            }}
                          >
                            حفظ البيانات
                          </Text>
                        </TouchableOpacity>
                      : <TouchableOpacity
                          style={{
                            backgroundColor: "#c9c9c9",
                            paddingVertical: 10,
                            borderRadius: 10,
                            width: "100%",
                            marginBottom: 10
                          }}
                        >
                          <ActivityIndicator size="large" color={"#FFF"} />
                        </TouchableOpacity>}
                  </View>
                : <View style={{ padding: 10, alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => Validate_form()}
                      style={{
                        backgroundColor: "#230D33",
                        paddingVertical: 10,
                        paddingHorizontal:20,
                        borderRadius: 10,
                        width: "50%",
                        flexDirection: "row-reverse",
                        justifyContent: "center",
                        alignItems: "space-around",
                        marginBottom: 20,

                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontFamily: "Regular"
                        }}
                      >
                        التالي
                      </Text>
                      <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color="#FFF"
                      />
                    </TouchableOpacity>
                  </View>}
            </View>
          : <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "#FFF",
                width: "100%"
              }}
            >
              <ActivityIndicator size={70} color="#fe7e25" />
            </View>}
      </View>
    </NativeBaseProvider>
  );
}
