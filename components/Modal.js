// CustomModal.js
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const CustomModal = ({ isVisible, closeModal, title, content }) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View>
        <Text>{title}</Text>
        <Text>{content}</Text>
        <Button title="Close" onPress={closeModal} />
      </View>
    </Modal>
  );
};

export default CustomModal;