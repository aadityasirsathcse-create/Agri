
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

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
  const dispatch: Dispatch<any> = useDispatch();
  const [productDetails, setProductDetails] = useState(route.params.product);
  const [barcode, setBarcode] = useState('');
  const [scannedCount, setScannedCount] = useState(route.params.product.scanned);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      setScannedCount(prevCount => {
        if (prevCount < productDetails.shippers) {
          const newCount = prevCount + 1;
          setProductDetails(prevDetails => ({...prevDetails, scanned: newCount}));
          return newCount;
        }
        return prevCount;
      });
    }
  }, [route.params?.scannedBarcode, route.params?.timestamp]);

  const isComplete = scannedCount === productDetails.shippers;

  const handleConfirm = () => {
    if (isComplete) {
      const updatedProduct = { ...productDetails, scanned: scannedCount };
      dispatch(reportProduct(updatedProduct, navigation));
    }
  };

  const handleScan = () => {
    const updatedProduct = { ...productDetails, scanned: scannedCount };
    dispatch(scan(updatedProduct, navigation));
  };

  const handleAddBarcode = () => {
    if (barcode.trim() !== '' && scannedCount < productDetails.shippers) {
      setIsLoading(true);
      setTimeout(() => {
        const newScannedCount = scannedCount + 1;
        setScannedCount(newScannedCount);
        setProductDetails({ ...productDetails, scanned: newScannedCount });
        setBarcode('');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ReportProductHeader
        title={reportProductMessages.headerTitle}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content}>
        <ProgressBar scanned={scannedCount} total={productDetails.shippers} />
        <ProductDetailCard product={productDetails} onReportSale={() => {}} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={reportProductMessages.barcodePlaceholder}
            value={barcode}
            onChangeText={setBarcode}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddBarcode} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.addButtonText}>Add</Text>}
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'left',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 50,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
