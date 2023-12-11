import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

  return (
    <TouchableOpacity onPress={toggleButton} style={styles.toggleButton}>
      <View style={[styles.toggleContainer, isToggled ? styles.toggled : null]}>
        <Text style={styles.toggleText}>{isToggled ? 'ON' : 'OFF'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    alignItems: 'center',
  },
  toggleContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 25,
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  toggled: {
    backgroundColor: 'green', // Customize the background color when toggled
    borderColor: 'green', // Customize the border color when toggled
  },
  toggleText: {
    color: '#333',
    marginRight: 5,
  },
});

export default CustomToggleButton;