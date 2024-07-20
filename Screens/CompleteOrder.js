import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import styles from "../theme/style";
import CustomHeader from "../components/CustomHeader";
import { url } from "../constants/constants";
import ToggleSwitch from "toggle-switch-react-native";
export default function CompleteOrder({ route, navigation }) {
  const screenTitle = "اكمال عمليه الدفع";

  const { item } = route.params;
  const [data, setData] = useState([]);
  const [autoRenew, setAutoRenew] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);


  const [isLoading, setLoading] = React.useState(false);
  useEffect(() => {
    _retrieveData();
  }, []);


  const _retrieveData = async () => {
    try {
      fetch(url.base_url + "packages/list.php", {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          "cache-control": "no-cache",
          Connection: "keep-alive"
        }
      })
        .then(response => response.json())
        .then(json => {
          setData(json.data);
        })

        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };


  const _proceedToCheckOut = () => {
    if (paymentMethod == 'card') {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ'
        },
        body: JSON.stringify({
          amount: parseInt(item.package_price),
          currency: 'SAR',
          customer_initiated: true,
          threeDSecure: true,
          save_card: false,
          description: item.package_title,
          metadata: { udf1: 'Metadata 1' },
          reference: { transaction: 'txn_01', order: 'ord_01' },
          receipt: { email: true, sms: true },
          customer: {
            first_name: 'test',
            middle_name: 'test',
            last_name: 'test',
            email: 'test@test.com',
            phone: { country_code: 965, number: 51234567 }
          },
          merchant: { id: '1234' },
          source: { id: 'src_all' },
          post: { url: 'https://wdapp.sa/api/payment/recive.php' },
          redirect: { url: 'https://wdapp.sa/api/payment/recive.php' }
        })
      };

      fetch('https://api.tap.company/v2/charges/', options)
        .then(response => response.json())
        .then(response => {
          console.log("Payment Response");
          console.log(response);
          navigation.navigate('PaymentWidget', {
            url: response.transaction.url
          })
        })
        .catch(err => console.error(err));
      setLoading(false);
    }
    else if (paymentMethod == 'bank_transfer') {
      navigation.navigate("BankTransaction");
    }

    else {
      alert('you must choose payment method');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar backgroundColor="#fe7e25" barStyle="light-content" />
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center"
          }}
          style={{
            width: "100%",
            paddingHorizontal: 10
          }}>

          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: "Bold",
                color: "#000",
                textAlign: "center",
                fontSize: 18
              }}
            >
              {item.package_title}
            </Text>
          </View>

          <View style={{
            backgroundColor: "#FFF",
            borderColor: "#DDDDDD",
            borderWidth: 1,
            borderRadius: 5,
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 30
          }}>


            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5
            }}>

              <Text
                style={{
                  fontFamily: "Regular"
                }}
              >
                {item.package_price} SAR
              </Text>
              <Text style={{
                fontFamily: "Bold"
              }}>
                السعر
              </Text>
            </View>



            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5
            }}>

              <Text
                style={{
                  fontFamily: "Regular"
                }}
              >
                {item.package_price} SAR
              </Text>
              <Text style={{
                fontFamily: "Bold"
              }}>
                رسوم الخدمة
              </Text>
            </View>


            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5
            }}>

              <Text
                style={{
                  fontFamily: "Regular"
                }}
              >
                {item.package_price} SAR
              </Text>
              <Text style={{
                fontFamily: "Bold"
              }}>
                ضريبه القيمه المضافه
              </Text>
            </View>



            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5,
              borderTopColor: "#DDDDDD",
              paddingTop: 10,
              borderTopWidth: 1,
            }}>

              <Text
                style={{
                  fontFamily: "Regular"
                }}
              >
                {item.package_price} SAR
              </Text>
              <Text style={{
                fontFamily: "Bold"
              }}>
                الاجمالي
              </Text>
            </View>

          </View>




          {/* Mobile Input */}
          <View
            style={{
              flexDirection: "row-reverse",
              borderColor: "#DDDDDD",
              width: "100%",
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 2,
              marginVertical: 10,
              height: 58
            }}
          >


            <View
              style={{
                flexDirection: "row-reverse",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <TextInput
                selectionColor={"#fe7e25"}
                //onChangeText={phone_number => setPhone(phone_number)}
                //keyboardType="numeric"
                placeholder="أدخل الكوبون"
                style={{
                  fontFamily: "Regular",
                  textAlign: "right",
                  paddingBottom: 2,
                  height: "100%",
                  width: "100%",
                  fontSize: 20,
                  fontFamily: "Bold",
                  color: "grey"

                }}
              />

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  left: 0,
                  position: "absolute",
                  padding: 10,
                  flexDirection: "row-reverse",
                  backgroundColor: "#fe7e25",
                  borderRadius: 10
                }}
              >
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Bold"
                }}>
                  اضف كوبون
                </Text>
              </TouchableOpacity>
            </View>
          </View>


          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              marginVertical: 10,
              width: "100%"
            }}
          >
            <View
              style={{
                backgroundColor: "#FFF",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                width: 30,
                borderRadius: 15
              }}
            >
              <AntDesign name="creditcard" size={24} color="#fe7e25" />
            </View>
            <Text
              style={{
                fontFamily: "Bold",
                marginHorizontal: 10
              }}
            >
              اختر طريقه الدفع
            </Text>
          </View>

          <View style={{
            backgroundColor: "#FFF",
            borderColor: "#DDDDDD",
            borderWidth: 1,
            borderRadius: 5,
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 30
          }}>

            <View style={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}>
              <Text style={{
                fontFamily: "Bold",
              }}>
                تفعيل التجديد التلقائي
              </Text>
              <Text style={{
                fontFamily: "Regular",
                backgroundColor: "green",
                borderRadius: 50,
                paddingVertical: 2,
                paddingHorizontal: 5,
                marginHorizontal: 10,
                color: "#FFF"
              }}>
                خصم 10%
              </Text>
            </View>

            <View style={{
              flexDirection: "row-reverse",
              marginTop: 10

            }}>

              <View style={{
                width: "80%",

              }}>
                <Text style={{
                  fontFamily: "Regular",

                }}>
                  احصل على خصم 10% عند الدفع ببطاقه مدى
                </Text>

              </View>

              <View style={{
                width: "20%",
                alignItems: "flex-end"
              }}>
                <ToggleSwitch
                  isOn={autoRenew}
                  onColor="#fe7e25"
                  offColor="grey"
                  size="large"
                  onToggle={isOn => setAutoRenew(!autoRenew)}
                />
              </View>
            </View>
          </View>


          <View style={{
            width: "100%",
            paddingHorizontal: 10,
            marginTop: 30
          }}>

            <TouchableOpacity
              onPress={() => setPaymentMethod('card')}
              style={[styles.paymentMethod, {
                borderColor: paymentMethod == 'card' ? "#fe7e25" : '#DDDDDD'
              }]}>
              <View style={{
                alignItems: "center",
                flexDirection: "row-reverse"
              }}>
                <Image source={require('./../assets/payment/master.png')} style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain"
                }} />

                <Text style={{
                  fontFamily: "Bold",
                  marginHorizontal: 20
                }}>
                  الدفع الالكتروني بالبطاقه
                </Text>
              </View>
              <View>
                <Ionicons name={paymentMethod == 'card' ? "radio-button-on" : "radio-button-off"} size={24} color="#fe7e25" />
              </View>
            </TouchableOpacity>



            <TouchableOpacity
              onPress={() => setPaymentMethod('bank_transfer')}
              st style={[styles.paymentMethod, {
                borderColor: paymentMethod == 'bank_transfer' ? "#fe7e25" : '#DDDDDD'
              }]}>
              <View style={{
                alignItems: "center",
                flexDirection: "row-reverse"
              }}>
                <Image source={require('./../assets/payment/bank.png')} style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain"
                }} />

                <Text style={{
                  fontFamily: "Bold",
                  marginHorizontal: 20
                }}>
                  تحويل بنكي
                </Text>
              </View>
              <View>
                <Ionicons name={paymentMethod == 'bank_transfer' ? "radio-button-on" : "radio-button-off"} size={24} color="#fe7e25" />
              </View>
            </TouchableOpacity>



          </View>


          <TouchableOpacity
            onPress={() => _proceedToCheckOut()}
            style={{
              width: "90%",
              backgroundColor: "#fe7e25",
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20
            }}>
            {
              isLoading == true ?
                <ActivityIndicator size={40} color={'#FFF'} />
                :
                <Text style={{
                  color: "#FFF",
                  fontFamily: "Bold"

                }}>
                  متابعه
                </Text>
            }
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
