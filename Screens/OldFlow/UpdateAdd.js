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
  ActivityIndicator
} from "react-native";
import LottieView from "lottie-react-native";
import {
  NativeBaseProvider,
  Select,
  CheckIcon,
} from "native-base";
import Checkbox from 'expo-checkbox';
import styles from "../../theme/style";
import {url} from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// make array and push items inside it
// make function will update  on textinput change => check if object exist or not on array =>
//if exist update it if not push it in arry
// then map this array and append to FormData

export default function NewAdd({ route, navigation }) {
  
  const [isEnabled, setIsEnabled] = useState(false);
  const [isChecked, setChecked] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  //const formData = [];

  const [formData, setFormData] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [loading, handleLoading] = React.useState(false);
  const [main_feilds, setMainFeilds] = useState([]);
  // const [prop_type, setPropType] = useState("");
  const [extra_feilds, setExtraFeilds] = useState([]);

  useEffect(() => {
    _retrieveData();
  }, []);


  const PushValue = (id, value) => {

    const obj = formData.find(item => item.field_id === id);
    if (obj === undefined) {
      const new_obj = { field_id: id, input_value: value };
      formData.push(new_obj);
    } 
    else {
      formData.map(item => {
        if (item.field_id === id) {
          item.input_value = value;
        }
      });
    }
   // console.log(formData);
  };


  const submitProperity = async () => {
    const token = await AsyncStorage.getItem("user_token");
    let submitForm = new FormData();
      submitForm.append("action","add_property");
      submitForm.append("gdpr_agreement","yes");
      submitForm.append("prop_features","array");
      submitForm.append("prop_featured","array");
    {formData.map(item => {
      submitForm.append(item.field_id,item.input_value);
    })}
    handleLoading(true);
    fetch(url.base_url + "properties/submit", {
      method: "POST",
      headers: {
        Accept: "*/*",
        'Authorization' : "Bearer "+token,
       "Content-type": "multipart/form-data;",
       "Accept-Encoding":"gzip, deflate, br",
       "Connection":"keep-alive"
      },
      body: submitForm,
    })
      .then((response) => response.json())
      .then((responseJson) => {
      if(responseJson.data !== undefined)
      { 
        alert("تمت اضافة العقار بنجاح برقم :"+responseJson.data)
      }
      else
      {
        alert(responseJson.message)
      }
      handleLoading(false);
      });
  };

  const _retrieveData = async () => {
    // const feilds_storage = await AsyncStorage.getItem("step_feilds");
    // if (feilds_storage !== null) {
    //   setMainFeilds(JSON.parse(feilds_storage));
    // } else {
      try {
        setLoading(true);
        fetch(url.base_url + "properties/step-fields", {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive"
          }
        })
          .then(response => response.json())
          .then(json => {
            setMainFeilds(json.data.screen_0);
            AsyncStorage.setItem("step_feilds", JSON.stringify(json.data));
            setLoading(false);
          })
          .catch(error => console.error(error));
      } catch (error) {
        console.log(error);
      }
   // }
  };

  const getExtraFeilds = prop_type => {
    try {
      fetch(
        url.base_url + "properties/extra-fields?tax_id=" + prop_type,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive"
          }
        }
      )
        .then(response => response.json())
        .then(json => {
          setExtraFeilds(json.data)
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

function handleCheck(id) {
if(id == 0)
return false;
else
return true;
}

function renderCheck(id){
  if(id === 1)
  return true;
  else
  return false;
}

function CheckItem(id){

}
  function renderCheckBox({item}){
    return(
      <View style={{margin:10,marginHorizontal:30,flexDirection: "row",alignItems: "center",borderBottomWidth:1,borderBottomColor:"#c9c9c9",paddingBottom:10}}>
          <Checkbox
          value={renderCheck(item.required)}
          onValueChange={renderCheck(!item.required)}
          color={renderCheck(item.required) ? '#fe7e25' : undefined}
        />
          <Text style={{color:"grey",fontFamily: "Regular",marginHorizontal:10}}>
            {item.label}
            </Text>
      </View>
    )
  }


  function renderRadioButton({item}){
    return(
      <View style={{margin:10,marginHorizontal:20,
      flexDirection: "row",alignItems: "center",borderRadius:5,backgroundColor: "#FFF"}}>

         <Switch
        trackColor={{ false: "#767577", true: "#fe7e25" }}
        thumbColor={isEnabled ? "#fe7e25" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
         />
          <Text style={{color:"grey",fontFamily: "Regular",marginHorizontal:10}}>
            {item.label}
          </Text>
      </View>
    )
  }

  function renderTextInput({ item }) {
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
          style={styles.InputText}
        />
      </View>
    );
  }


  function renderSelectInput({ item }) {
    const mapOptions = () => {
      return item.options.map((option,index) => {
        return (
          <Select.Item
            style={{ fontFamily: "Regular" }}
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
          borderRadius="10"
          marginBottom="3"
          borderWidth="0"
          backgroundColor="#FFF"
          placeholder={item.label}
          fontFamily="Regular"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }}
          mt={1}

          onValueChange={ value => { 
            if(item.field_id === "prop_type[]")
            {
             PushValue(item.field_id, value);
              getExtraFeilds(value);
             
            }
            else {
              PushValue(item.field_id, value)
            }
        }
      }
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
            paddingTop: 50,
            paddingBottom: 30,
            backgroundColor: "#FFF",
            width: "100%"
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              textAlign: "center",
              color: "#fe7e25"
            }}
          >
            اضافة اعلان جديد
          </Text>
        </View>
        {isLoading == false
          ? 
          <View  style={{ width: "100%",flex:1}}>
          <ScrollView>
              <FlatList
                style={{ width: "100%" }}
                data={main_feilds}
                keyExtractor={(item, index) => {item.id+index}}
                renderItem={({ item }) => {
                  switch(item.type) {
                    case "text" :
                      return renderTextInput({ item });
                      break;
                    
                    case "textarea":
                      return renderTextInput({ item });
                      break;
               
                    case "number":
                      return renderTextInput({ item });
                      break;
               
                    case "select":
                      return renderSelectInput({ item });
                      break;

                      case "checkbox":
                        return renderCheckBox({ item });
                        break;

                        
                      case "radio":
                        return renderRadioButton({ item });
                        break;

                    }
               
                }}
              />

              <FlatList
                style={{ width: "100%" }}
                data={extra_feilds}
                keyExtractor={(item, index) => {item.id}}
                renderItem={({ item }) => {
                  switch(item.type) {
                    case "text" :
                      return renderTextInput({ item });
                      break;
                    
                    case "textarea":
                      return renderTextInput({ item });
                      break;
               
                    case "number":
                      return renderTextInput({ item });
                      break;
               
                    case "select":
                      return renderSelectInput({ item });
                      break;

                      case "checkbox":
                        return renderCheckBox({ item });
                        break;

                        
                      case "radio":
                        return renderRadioButton({ item });
                        break;
                    }
                }}
              />
            </ScrollView>
            
            <View style={{padding:10}}>

            {loading == false
              ?


            <TouchableOpacity
            onPress={() => submitProperity()}
              style={{
                backgroundColor: "#fe7e25",
                paddingVertical: 15,
                borderRadius: 10,
                width: "100%",
                marginBottom: 10,
              }}
            >
            
              <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Regular"
            }}
          >
              حفظ 
              </Text>
              </TouchableOpacity>
 : 
 
      
      <TouchableOpacity
        style={{
          backgroundColor: "#c9c9c9",
          paddingVertical: 10,
          borderRadius: 10,
          width: "100%",
          marginBottom: 10,
        }}
      >
      
      <ActivityIndicator size="large" color={"#FFF"} />

        </TouchableOpacity>
      }



         
            </View>
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
              <LottieView
                autoPlay
                style={{
                  width: 100,
                  height: 100,
                  bottom: 0
                }}
                source={require("../../assets/app_loader.json")}
              />
            </View>}
      </View>
    </NativeBaseProvider>
  );
}
