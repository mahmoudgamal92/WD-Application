

import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Platform,
    TextInput,
    ScrollView,
    Modal
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import styles from "../../../theme/style";
import CustomHeader from "../../../components/CustomHeader";
import uuid from 'react-native-uuid';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from "react-native-toast-message";
import toastConfig from "./../../../components/Toast";
import LottieView from 'lottie-react-native';

export default function NafathNationalID({ route, navigation }) {
    const screenTitle = "أدخل رقم الهوية الشخصية";
    const [loading, setLoading] = useState(false);
    const [nationalID, setNationalID] = useState(null);
    const [waiting_modal, setWaitingModal] = useState(false);
    const [confirm_number, setConfirmNumber] = useState(false);
    const [trans_id, setTransId] = useState(false);
    const animation = useRef();

    function validateSaudiNationalId(id) {
        // Check if the length is 10
        if (id.length !== 10) {
            return false;
        }

        // Check if it starts with 1 or 2
        if (id[0] !== '1' && id[0] !== '2') {
            return false;
        }

        // Convert the ID to an array of numbers
        const idArray = id.split('').map(Number);

        // Calculate the checksum using the Luhn algorithm
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            let num = idArray[i];
            if (i % 2 === 0) { // Even index (0-based), representing odd positions in 1-based
                num *= 2;
                if (num > 9) {
                    num -= 9; // Sum the digits
                }
            }
            sum += num;
        }

        // Calculate the checksum
        const checksum = (10 - (sum % 10)) % 10;

        // Check if the checksum matches the last digit
        return checksum === idArray[9];
    }


    const _handleRequest = async () => {

        if (validateSaudiNationalId(nationalID)) {
            try {
                const _uuid = uuid.v4();
                const url = 'https://nafath.api.elm.sa/api/v1/mfa/request?local=en&requestId=' + _uuid;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'APP-ID': '7d7171dc',
                        'APP-KEY': '1f1f99024cb6a4018efb0622a6b4f5a6',
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify({
                        "nationalId": nationalID,
                        "service": "DigitalServiceEnrollmentWithoutBio",
                    }),
                });

                // Valid Json Body
                // Status Code 201
                // {"random": "29", "transId": "b653774b-95c6-4073-bc6c-596f4a8b3b6c"}
                // console.log('Status Code:', statusCode);
                //console.log('Response:', jsonResponse);


                const statusCode = response.status;

                if (statusCode == '201') {
                    const jsonResponse = await response.json();
                    setWaitingModal(true);
                    setConfirmNumber(jsonResponse.random);
                    setTransId(jsonResponse.transId);
                }

                else {
                    Toast.show({
                        type: "erorrToast",
                        text1: 'ناسف هناك مشكله في توثيق نفاذ الان',
                        bottomOffset: 80,
                        visibilityTime: 2000
                    });

                }



            } catch (error) {
                console.error('Error:', error);
            }
        }

        else {
            Toast.show({
                type: "erorrToast",
                text1: 'لابد من إدخال رقم هوية صحيح',
                bottomOffset: 80,
                visibilityTime: 2000
            });
        }

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
            <CustomHeader text={screenTitle} />
            <View style={styles.rootContainer}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={waiting_modal}
                // onRequestClose={() => {
                //   SetFailedAlert(!failed_alert);
                // }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View
                                style={{
                                    backgroundColor: "#fe7e25",
                                    width: 50,
                                    height: 50,
                                    marginTop: -25,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 25
                                }}
                            >
                                <Image source={require('./../../../assets/wd_white.png')} style={{
                                    width: 50,
                                    height: 50
                                }} />

                            </View>

                            <TouchableOpacity
                                onPress={() => setWaitingModal(false)}
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    paddingHorizontal: 20
                                }}
                            >
                                <FontAwesome name="close" size={24} color="black" />
                            </TouchableOpacity>

                            <Text style={{
                                fontFamily: 'Regular',
                                fontSize: 15,
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                marginVertical: 20
                            }}>
                                تم ارسال الاشعار الى حسابك في تطبيق نفاذ المرتبط برقم الهاتف                            </Text>
                            <View>

                                <View style={{
                                    width: 250,
                                    height: 250,
                                    position: 'absolute',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10000
                                }}>
                                    <Text style={{
                                        fontFamily: 'bold',
                                        fontSize: 40
                                    }}>
                                        {confirm_number}
                                    </Text>
                                </View>
                                <LottieView
                                    autoPlay
                                    ref={animation}
                                    style={{
                                        width: 250,
                                        height: 250,
                                        backgroundColor: '#FFF',
                                    }}
                                    source={require('./../../../assets/lottie.json')}
                                />
                            </View>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#fe7e25",
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    marginVertical: 20,
                                    borderRadius: 10,
                                    width: "90%"
                                }}
                                onPress={() => _navigate()}
                            >
                                <Text style={styles.textStyle}>
                                    متابعه
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}
                    contentContainerStyle={{
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            marginTop: 20,
                            paddingHorizontal: 20,
                            alignItems: "center"
                        }}>

                        <View
                            style={{
                                borderBottomColor: "#fe7e25",
                                borderBottomWidth: 10,
                                alignItems: "center",
                                marginVertical: 20,
                                paddingHorizontal: 10
                            }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Bold",
                                    fontSize: 25,
                                    marginBottom: -10
                                }}
                            >
                                رقم الهوية الشخصي
                            </Text>
                        </View>

                        <View style={{
                            margninVertical: 100
                        }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "Regular",
                                    fontSize: 14,
                                }}
                            >
                                من فضلك أدخل رقم هوية صالح مسجل في نفاذ لإرسال طلب التسجيل إلي حسابك في نفاذ
                            </Text>
                        </View>


                        {/* Mobile Input */}
                        <View
                            style={{
                                flexDirection: "row-reverse",
                                borderColor: "#fe7e25",
                                width: "100%",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                marginVertical: 5,
                                height: 58,
                                marginTop: 40
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    alignItems: "flex-end",
                                    position: "absolute",
                                    marginTop: -10
                                }}
                            >
                                <Text
                                    style={{
                                        color: "grey",
                                        fontFamily: "Regular",
                                        backgroundColor: "#FFF",
                                        textAlign: "right",
                                        paddingHorizontal: 10
                                    }}
                                >
                                    أدخل رقم الهوية
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <TextInput
                                    selectionColor={"#fe7e25"}
                                    onChangeText={nationalID => setNationalID(nationalID)}
                                    keyboardType="numeric"
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
                                        padding: 17,
                                        flexDirection: "row-reverse"
                                    }}
                                >
                                    <AntDesign name="idcard" size={24} color={"#fe7e25"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => _handleRequest()}
                        style={{
                            backgroundColor: "#fe7e25",
                            marginBottom: 40,
                            padding: 10,
                            borderRadius: 10,
                            width: "80%",
                            flexDirection: "row-reverse",
                            justifyContent: "center",
                            alignItems: "space-around",
                            marginTop: 40
                        }}
                    >
                        {loading == false
                            ? <View
                                style={{
                                    flexDirection: "row-reverse",
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontFamily: "Bold"
                                    }}
                                >
                                    متابعة
                                </Text>
                                <MaterialIcons
                                    name="keyboard-arrow-left"
                                    size={24}
                                    color="#FFF"
                                />
                            </View>
                            : <ActivityIndicator size="large" color="#FFF" />}
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
}
