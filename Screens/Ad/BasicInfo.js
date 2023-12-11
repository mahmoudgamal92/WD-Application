import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import styles from "./../../theme/style";
import { useFocusEffect } from "@react-navigation/native";
import CustomHeader from "./../../components/CustomHeader";
import { Dropdown } from "react-native-element-dropdown";
import * as Progress from "react-native-progress";
import ToggleSwitch from "toggle-switch-react-native";

export default function NewAdd({ route, navigation }) {

  const { jsonForm } = route.params;
  const [loader, setLoader] = React.useState(true);
  const [formData, setFormData] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const screenTitle = "إضافة عقار جديد";

  useEffect(() => {
    _retrieveData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      _retrieveData();
    }, [])
  );

  const _retrieveData = async () => {
    try {
      setLoader(true);
      fetch("https://bnookholding.com/wd/api/input/list.php", {
        method: "GET",
        headers: {
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          if (json.success == "true") {
            setInputs(json.data);
          } else {
            alert("No Inputs Retrived");
          }
        })
        .finally(() => setLoader(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const PushValue = (key, value) => {
    const updatedFormData = [...formData];
    const existingIndex = updatedFormData.findIndex(
      item => item.input_key === key
    );
    if (existingIndex !== -1) {
      updatedFormData[existingIndex] = { input_key: key, input_value: value };
    } else {
      updatedFormData.push({ input_key: key, input_value: value });
    }
    setFormData(updatedFormData);
    console.log(updatedFormData);
  };

  const valSelected = (inputKey, value) => {
    const selectedInput = formData.find(item => item.input_key === inputKey);
    if (selectedInput) {
      return selectedInput.input_value === value;
    }
    return false;
  };

  const Validate_form = () => {
    const concatenatedJson = [...jsonForm, ...formData];
    navigation.navigate("AdMapInfo", {
      jsonForm: concatenatedJson
    });
  };

  function renderTextInput({ item }) {
    return (
      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={styles.InputLabel}>
          {item.input_desc}
        </Text>
        <TextInput
          onChangeText={value => PushValue(item.input_key, value)}
          placeholder={item.input_placeholder}
          caretHidden
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.InputText}
          defaultValue={item.value}
        />
      </View>
    );
  }

  function renderDropDown({ item }) {
    return (
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 10,
          marginTop: 10,
          width: "100%"
        }}
      >
        <Text
          style={{
            fontFamily: "Bold",
            textAlign: "right",
            marginBottom: 5,
            color: "#fe7e25",
            zIndex: 10,
            marginBottom: 20
          }}
        >
          {item.input_label}
        </Text>

        <Dropdown
          style={[
            styles.dropdown,
            isFocus == item.input_id && { borderColor: "blue" }
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={{ fontFamily: "Regular", fontSize: 12 }}
          data={item.values}
          //search
          maxHeight={300}
          labelField="param"
          valueField="value"
          placeholder={item.input_placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={val => {
            PushValue(item.input_key, val.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() =>
            <MaterialIcons
              style={styles.icon}
              name="keyboard-arrow-down"
              size={24}
              color={isFocus == item.input_id ? "blue" : "grey"}
            />}
          renderRightIcon={() =>
            <Feather
              style={styles.icon}
              color={isFocus == item.input_id ? "blue" : "grey"}
              name="home"
              size={20}
            />}
        />
      </View>
    );
  }

  function renderToggleInput({ item }) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFF",
          paddingVertical: 10,
          borderBottomColor: "grey",
          borderBottomWidth: 1
        }}
      >
        <ToggleSwitch
          isOn={valSelected(item.input_key, true)}
          onColor="#fe7e25"
          offColor="grey"
          size="large"
          onToggle={isOn => PushValue(item.input_key, isOn)}
        />

        <Text
          style={{
            fontFamily: "Bold"
          }}
        >
          {item.input_placeholder}
        </Text>
      </View>
    );
  }

  function renderSelectGrid({ item }) {
    return (
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 10,
          marginTop: 10,
          width: "100%"
        }}
      >
        <Text
          style={{
            fontFamily: "Bold",
            textAlign: "right",
            marginBottom: 5,
            color: "#fe7e25",
            zIndex: 10,
            marginBottom: 20
          }}
        >
          {item.input_label}
        </Text>

        <View
          style={{
            width: "100%",
            flexDirection: "row-reverse",
            flexWrap: "wrap"
          }}
        >
          {item.values.map((val, index) => {
            return (
              <TouchableOpacity
                onPress={() => PushValue(item.input_key, val.value)}
                style={{
                  borderRadius: 10,
                  minWidth: 50,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "#fe7e25",
                  backgroundColor: valSelected(item.input_key, val.value)
                    ? "#fe7e25"
                    : "#FFF",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  margin: 5
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bold",
                    color: valSelected(item.input_key, val.value)
                      ? "#FFF"
                      : "grey"
                  }}
                >
                  {val.param}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        width: "100%"
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 25,
          left: 20,
          zIndex: 1000
        }}
      >
        <Progress.Pie
          progress={0.25}
          size={40}
          color="#FFF"
          borderWidth={1.5}
        />
      </View>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>

        {loader == false ?
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", paddingHorizontal: 20 }}
          >
            {inputs.map((item, index) => {
              switch (item.input_type) {
                case "text_input":
                  return renderTextInput({ item });
                  break;

                case "number_input":
                  return renderTextInput({ item });
                  break;

                case "toggle":
                  return renderToggleInput({ item });
                  break;

                case "dropdown":
                  return renderDropDown({ item });
                  break;

                case "select":
                  return renderSelectGrid({ item });
                  break;
              }
            })}

            <TouchableOpacity
              onPress={() => Validate_form()}
              style={{
                backgroundColor: "#fe7e25",
                padding: 10,
                borderRadius: 10,
                width: "100%",
                flexDirection: "row-reverse",
                justifyContent: "center",
                alignItems: "space-around",
                marginVertical: 20
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Bold"
                }}
              >
                التالي
              </Text>
              <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
          </ScrollView>
          :
          <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ActivityIndicator size={'70'} color="  #fe7e25" />
          </View>
        }
      </View>
    </View>
  );
}
