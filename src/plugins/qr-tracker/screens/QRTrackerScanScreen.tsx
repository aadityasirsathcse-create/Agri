
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App'; // Adjust if needed
import QRScanner from '../components/QRScanner';

type QRTrackerScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CFScan'>;
type QRTrackerScanScreenRouteProp = RouteProp<RootStackParamList, 'CFScan'>;

type Props = {
  navigation: QRTrackerScanScreenNavigationProp;
  route: QRTrackerScanScreenRouteProp;
};

const QRTrackerScanScreen: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params;

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    if (event?.nativeEvent?.codeStringValue) {
      navigation.navigate({
        name: 'CFReportProduct',
        params: { 
          product: product,
          scannedBarcode: event.nativeEvent.codeStringValue,
          timestamp: new Date().getTime() 
        },
        merge: true,
      });
    }
  };

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
});

export default QRTrackerScanScreen;
