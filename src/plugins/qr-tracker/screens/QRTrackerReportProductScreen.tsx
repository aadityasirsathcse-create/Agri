
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { RootStackParamList, CFProduct } from '../../../../App'; // Adjust if needed
import { reportProductMessages } from '../constants/messages';
import ReportProductHeader from '../components/ReportProductHeader';
import ProgressBar from '../components/ProgressBar';
import ScanButton from '../components/ScanButton';
import ProductDetailCard from '../components/ProductDetailCard';
import { reportProduct, scan } from '../actions/qrTrackerThunks';

type QRTrackerReportProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFReportProduct'
>;

type QRTrackerReportProductScreenRouteProp = RouteProp<
  RootStackParamList,
  'CFReportProduct'
>;

type Props = {
  navigation: QRTrackerReportProductScreenNavigationProp;
  route: QRTrackerReportProductScreenRouteProp;
};

const QRTrackerReportProductScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const productDetailsRef = useRef(route.params.product);
  const [barcode, setBarcode] = useState('');
  const [scannedCount, setScannedCount] = useState(route.params.product.scanned);

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      setScannedCount(prevCount => {
        if (prevCount < productDetailsRef.current.shippers) {
          return prevCount + 1;
        }
        return prevCount;
      });
    }
  }, [route.params?.scannedBarcode, route.params?.timestamp]);

  const isComplete = scannedCount === productDetailsRef.current.shippers;

  const handleConfirm = () => {
    if (isComplete) {
      const updatedProduct = { ...productDetailsRef.current, scanned: scannedCount };
      dispatch(reportProduct(updatedProduct, navigation));
    }
  };

  const handleScan = () => {
    const updatedProduct = { ...productDetailsRef.current, scanned: scannedCount };
    dispatch(scan(updatedProduct, navigation));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ReportProductHeader
        title={reportProductMessages.headerTitle}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content}>
        <ProgressBar scanned={scannedCount} total={productDetailsRef.current.shippers} />
        <ProductDetailCard product={productDetailsRef.current} onReportSale={() => {}} />
        <TextInput
          style={styles.input}
          placeholder={reportProductMessages.barcodePlaceholder}
          value={barcode}
          onChangeText={setBarcode}
        />
        <Text style={styles.orText}>{reportProductMessages.orText}</Text>
        <ScanButton onPress={handleScan} />
      </ScrollView>
      <TouchableOpacity
        style={[styles.confirmButton, !isComplete && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={!isComplete}
      >
        <Text style={styles.confirmButtonText}>{reportProductMessages.confirmButtonText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9e5ff',
  },
  content: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
  },
});

export default QRTrackerReportProductScreen;
