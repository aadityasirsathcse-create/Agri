
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import QRScanner from '../components/QRScanner';

type QRTrackerScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CFScan'>;
type QRTrackerScanScreenRouteProp = RouteProp<RootStackParamList, 'CFScan'>;

type Props = {
  navigation: QRTrackerScanScreenNavigationProp;
  route: QRTrackerScanScreenRouteProp;
};

const QRTrackerScanScreen: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    if (isLoading) {
      return;
    }

    if (event?.nativeEvent?.codeStringValue) {
      const scannedBarcode = event.nativeEvent.codeStringValue;
      setIsLoading(true);
      setTimeout(() => {
        navigation.navigate('CFReportProduct', {
          product: product,
          scannedBarcode: scannedBarcode,
          timestamp: new Date().getTime(),
        });
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.infoText}>Processing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <QRScanner onReadCode={onReadCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    marginTop: 16,
  },
});

export default QRTrackerScanScreen;
