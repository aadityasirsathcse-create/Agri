
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ScanButtonProps {
  onPress: () => void;
}

const ScanButton: React.FC<ScanButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.scanButton} onPress={onPress}>
      <Icon name="camera-outline" size={40} color="#4CAF50" />
      <Text style={styles.scanText}>Scan using Camera</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scanText: {
    marginTop: 5,
    color: '#4CAF50',
  },
});

export default ScanButton;
