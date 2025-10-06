
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  scanned: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ scanned, total }) => {
  const progress = total > 0 ? (scanned / total) * 100 : 0;

  return (
    <View>
      <View style={styles.progressContainer}>
        <Text>Item scanned</Text>
        <Text>{scanned}/{total}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginBottom: 20,
  },
  progress: {
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
});

export default ProgressBar;
