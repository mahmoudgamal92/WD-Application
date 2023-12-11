import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MarkerLikeView = () => (
  <View style={styles.markerContainer}>
    <View style={styles.markerBody}>
      <View style={styles.markerTail} />
    </View>
    <Text style={styles.label}>A</Text>
  </View>
);

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  markerBody: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
  },
  label: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default MarkerLikeView;