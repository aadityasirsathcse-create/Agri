
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ScanResultCardProps {
  scannedData: string | null;
}

const ScanResultCard: React.FC<ScanResultCardProps> = ({ scannedData }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Scanned QR Code Data:</Text>
      <Text style={styles.data}>{scannedData || 'No data scanned yet'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  data: {
    fontSize: 16,
  },
});

export default ScanResultCard;
