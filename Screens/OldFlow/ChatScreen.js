import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  Feather,
  Ionicons
} from "@expo/vector-icons";
import styles from "../../theme/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {url} from "../../constants/constants";

export default function ChatScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [user_id, setUserID] = useState("");
  const [user_token, setUserToken] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setSendLoader] = useState(false);
  const { thread_id } = route.params;

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem("user_name");
      const token = await AsyncStorage.getItem("user_token");
      const id = await AsyncStorage.getItem("user_id");
      setUserToken(token);
      setUserID(id);
      fetch(
        url.base_url + "conversations&endpointChild=messages&thread_id=" + thread_id,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + token,
            "Content-type": "multipart/form-data;",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive"
          }
        }
      )
        .then(response => response.json())
        .then(json => {
          setData(json.data);
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const SendMessage = () => {
    if(message.trim().length !== 0)
    {
    let formData = new FormData();
    formData.append("message", message);
    formData.append("conversation_id", thread_id);
    setSendLoader(true);
    fetch(url.base_url + "conversations&endpointChild=new-messages", {
      method: "POST",
      headers: {
        Accept: "*/*",
        'Authorization' : "Bearer "+user_token,
        "Content-type": "multipart/form-data;",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data !== undefined) {
          setMessage("");
          _retrieveData();
        } else {
          setMessage("");
          alert("Sorry, Internal Erorr !");
        }
        setSendLoader(false);
      });
  }};
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fe7e25",
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingTop: 10
        }}
      >

          <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={{ width: "50%", justifyContent: "center",alignItems:"flex-end" }}>
          <Text
            style={{
              color: "#FFF",
              fontFamily: "Regular",
              textAlign: "left",
              fontSize: 14
            }}
          >
            {data.conversation_author_display_name}
          </Text>

        </View>

        <View style={{ width: "30%",alignItems:"flex-end"}}>
          <Image
            source={{ uri: data.user_custom_picture }}
            resizeMode="contain"
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              margin: 5,
              borderWidth: 2,
              borderColor: "#fe7e25"
            }}
          />
        </View>
       
      </View>


      <FlatList
        style={{ paddingVertical: 20, paddingHorizontal: 10 }}
        data={data.messages_data}
        inverted={true}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) =>
        <View>
          {item.message_author == user_id ?
          <View style={styles.rightMessageContainer}>
            <View
              style={{
                ...styles.messageTileright,
                backgroundColor: "#fe7e25"
              }}
            >
              <Text
                style={{ fontSize: 15, color: "#FFF", fontFamily: "Regular" }}
              >
                {item.message_content}
              </Text>
              <Text style={{fontFamily: "Regular",color:"#FFF",fontSize:10}}>
              {item.message_time}
              </Text>
            </View>    
          </View>
          :
          <View style={styles.leftMessageContainer}>
          <View
            style={{
              ...styles.messageTileleft,
              backgroundColor: "grey"
            }}
          >
            <Text
              style={{ fontSize: 15, color: "#FFF", fontFamily: "Regular" }}
            >
              {item.message_content}
            </Text>
            <Text style={{fontFamily: "Regular",color:"#FFF",fontSize:10}}>
              {item.message_time}
            </Text>
          </View>    
        </View>
        }
          </View>
          }
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{
           width: "90%",
           flexDirection: "row",
           backgroundColor: "#fff",
           elevation: 8,
           marginBottom: 10,
           justifyContent: "center",
           alignItems: "center",
           borderRadius: 50,
           paddingHorizontal:10
        }}>

        {
          loader == true ?
          <View style={{width:"20%",padding:10}}>
        <ActivityIndicator size={20} color="#666"/>
          </View>
          :
        <TouchableOpacity style={{width:"20%",padding:10}} onPress={() => SendMessage()} >
            <Feather name="send" size={30} color="#666" />
        </TouchableOpacity>
        }
     

          <TextInput
            placeholder="أكتب رسالتك....."
            returnKeyType="send"
            placeholderTextColor="#666"
            value={message}
            onChangeText={message => setMessage(message)}
            style={{  
              padding: 15,
              fontSize: 15,
              fontFamily: "Regular",
              textAlign:"right",
              width: "80%",
            }}
            placeholderStyle={{
              fontFamily: "Regular"
            }}
          />


         
        </View>
      </View>
    </View>
  );
}
