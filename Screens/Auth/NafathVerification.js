

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
    Modal,
    KeyboardAvoidingView
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import styles from "../../theme/style";
import CustomHeader from "../../components/CustomHeader";
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/constants";

import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from "react-native-toast-message";
import toastConfig from "../../components/Toast";
import LottieView from 'lottie-react-native';

export default function NafathVerification({ route, navigation }) {
    const screenTitle = "أدخل رقم الهوية الشخصية";
    const [loading, setLoading] = useState(false);
    const [nationalID, setNationalID] = useState('');
    const [waiting_modal, setWaitingModal] = useState(false);
    const [success_modal, setSuccessModal] = useState(false);
    const [confirm_number, setConfirmNumber] = useState(false);
    const [trans_id, setTransId] = useState(false);
    const animation = useRef();


    const _updateUserInfo = () => {
        setSuccessModal(false);
        navigation.replace('UserFlow');
    }
    function validateSaudiNationalId(id) {
        if (id.length !== 10 || id == null) {
            return false;
        }
        if (id[0] !== '1' && id[0] !== '2') {
            return false;
        }

        const idArray = id.split('').map(Number);
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            let num = idArray[i];
            if (i % 2 === 0) {
                num *= 2;
                if (num > 9) {
                    num -= 9;
                }
            }
            sum += num;
        }
        const checksum = (10 - (sum % 10)) % 10;
        return checksum === idArray[9];
    }


    const _verifyUser = async (transId) => {
        const user_token = await AsyncStorage.getItem("user_token");
        let formData = new FormData();
        formData.append("user_token", user_token);
        formData.append("transId", transId);
        fetch(url.base_url + "profile/nafath_verify.php", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-type": "multipart/form-data;",
                "Accept-Encoding": "gzip, deflate, br",
                "cache-control": "no-cache"
            },
            body: formData
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success == true) {
                    setWaitingModal(false);
                    setSuccessModal(true);
                } else {
                    alert("نأسف هناك عطل من طرفنا");
                }
                setLoading(false);
            });
    }


    const checkUserAcceptance = async (transId) => {
        if (!transId) {
            console.error('Transaction ID is required.');
            return;
        }

        const intervalId = setInterval(async () => {
            try {
                const response = await fetch(`https://wdapp.sa/api/nafath/validate/index.php?transId=${transId}`, {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonResponse = await response.json();

                if (jsonResponse.success === true) {
                    // alert('User acceptance confirmed');
                    clearInterval(intervalId); // Stop polling
                    _verifyUser(transId);

                } else {
                    console.log('User acceptance not confirmed yet.');
                }
            } catch (error) {
                console.error('Error checking user acceptance:', error);
                clearInterval(intervalId); // Stop polling in case of an error
            }
        }, 5000); // Poll every 5 seconds
    };


    const _handleRequest = async () => {

        if (validateSaudiNationalId(nationalID)) {
            try {
                // setTransId('2b8e531a-c8d2-44c4-ba70-47394e88fc3f');
                // setWaitingModal(true);
                // setConfirmNumber('55');
                // checkUserAcceptance('2b8e531a-c8d2-44c4-ba70-47394e88fc3f');
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

                const statusCode = response.status;

                if (statusCode == '201') {
                    const jsonResponse = await response.json();
                    setWaitingModal(true);
                    setConfirmNumber(jsonResponse.random);
                    setTransId(jsonResponse.transId);
                    checkUserAcceptance(jsonResponse.transId);
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

        <KeyboardAvoidingView
            style={{
                flex: 1,
                width: "100%",
                backgroundColor: "#FFF"
            }}
            keyboardVerticalOffset={10}
            behavior={Platform.OS === "ios" ? "padding" : null}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#F9F9F9",
                    width: "100%",
                    justifyContent: 'center'
                }}
            >
                <ScrollView contentContainerStyle={{
                    alignItems: 'center'
                }}>
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
                                }}
                            >
                                رقم الهوية الشخصي
                            </Text>
                        </View>
                        <Image
                            source={require("./../../assets/id.png")}
                            style={{ width: 150, height: 150, resizeMode: "cover", marginVertical: 30 }}
                        />
                        <View style={{
                            margninVertical: 50
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



                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={waiting_modal}>
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
                                    <Image source={require('./../../assets/wd_white.png')} style={{
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
                                            fontFamily: 'Bold',
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
                                        source={require('../../assets/lottie.json')}
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



                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={success_modal}
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
                                    <Image source={require('./../../assets/wd_white.png')} style={{
                                        width: 50,
                                        height: 50
                                    }} />

                                </View>

                                <TouchableOpacity
                                    onPress={() => setSuccessModal(false)}
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
                                    fontFamily: 'Bold',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    marginVertical: 10,
                                    paddingHorizontal: 10,
                                }}>
                                    مبروك , تم توثيق هويتك بنجاح
                                </Text>

                                <Image source={require('./../../assets/verified.png')} style={{
                                    width: 150,
                                    height: 150
                                }} />

                                <Text style={{
                                    fontFamily: 'Regular',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    marginVertical: 10,
                                    paddingHorizontal: 10,
                                }}>
                                    يمكنك الأن الإستمتاع بكل مميزات تطبيقنا
                                </Text>

                                <TouchableOpacity
                                    onPress={() => _updateUserInfo()}
                                    style={{
                                        backgroundColor: "#fe7e25",
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        marginVertical: 20,
                                        borderRadius: 10,
                                        width: "90%"
                                    }}
                                >
                                    <Text style={styles.textStyle}>
                                        إغلاق
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>


                    <Toast config={toastConfig} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
