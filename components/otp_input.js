import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);
  
  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input field when a digit is entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete and call the onComplete callback
    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleInputChange(text, index)}
          value={digit}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 60,
    height: 60,
    margin: 5,
    borderWidth: 1.5,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    fontFamily:"Bold",
    fontSize:20
  },
});

export default OtpInput;