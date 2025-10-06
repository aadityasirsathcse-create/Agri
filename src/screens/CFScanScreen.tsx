
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import QRScanner from '../plugins/qr-tracker/QRScanner';

type CFScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CFScan'>;
type CFScanScreenRouteProp = RouteProp<RootStackParamList, 'CFScan'>;

type Props = {
  navigation: CFScanScreenNavigationProp;
  route: CFScanScreenRouteProp;
};

const CFScanScreen: React.FC<Props> = ({ navigation, route }) => {
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

export default CFScanScreen;
