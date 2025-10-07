
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Modal, BackHandler } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as Animatable from 'react-native-animatable';

import { RootStackParamList } from '../../../../App';
import { reportProductMessages } from '../constants/messages';
import ReportProductHeader from '../components/ReportProductHeader';
import ProgressBar from '../components/ProgressBar';
import ScanButton from '../components/ScanButton';
import ProductDetailCard from '../components/ProductDetailCard';
import { addBarcode, reportProduct, scan } from '../actions/qrTrackerThunks';
import { QRTrackerState } from '../reducers/qrTrackerReducer';

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

type AddState = 'idle' | 'verifying' | 'verified';

const QRTrackerReportProductScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { product: initialProduct } = route.params;

  const productDetails = useSelector((state: { qrTracker: QRTrackerState }) => 
    state.qrTracker.products.find(p => p.id === initialProduct.id)
  ) || initialProduct;

  const scannedCount = productDetails.scanned;

  const [barcode, setBarcode] = useState('');
  const [addState, setAddState] = useState<AddState>('idle');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [navigation])
  );

  useEffect(() => {
    if (addState === 'verifying') {
      const timer = setTimeout(() => {
        setAddState('verified');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [addState]);

  const isComplete = scannedCount === productDetails.shippers;

  const handleConfirm = () => {
    if (isComplete) {
      dispatch(reportProduct(productDetails, navigation));
    }
  };

  const handleScan = () => {
    dispatch(scan(productDetails, navigation));
  };

  const handleAddBarcode = () => {
    if (barcode.trim() !== '' && scannedCount < productDetails.shippers) {
      setAddState('verifying');
      setBottomSheetVisible(true);
    }
  };

  const handleOkPress = () => {
    dispatch(addBarcode(productDetails.id, barcode));
    setBarcode('');
    setBottomSheetVisible(false);
    setAddState('idle');
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
          <TouchableOpacity style={styles.addButton} onPress={handleAddBarcode} disabled={addState !== 'idle'}>
            {addState !== 'idle' ? <ActivityIndicator color="#fff" /> : <Text style={styles.addButtonText}>Add</Text>}
          </TouchableOpacity>
        </View>
        <Text style={styles.orText}>{reportProductMessages.orText}</Text>
        <ScanButton onPress={handleScan} />
      </ScrollView>
      <TouchableOpacity
        style={[styles.confirmButton, !isComplete && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={!isComplete}>
        <Text style={[styles.confirmButtonText, !isComplete && styles.disabledButtonText]}>{reportProductMessages.confirmButtonText}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetVisible}
        onRequestClose={() => {
          setBottomSheetVisible(false);
          setAddState('idle');
        }}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            {addState === 'verifying' && (
              <>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.infoText}>Verifying...</Text>
              </>
            )}
            {addState === 'verified' && (
              <>
                <Animatable.View animation="zoomIn" duration={1500} style={styles.animationContainer}>
                  <Text style={styles.checkmark}>✓</Text>
                </Animatable.View>
                <Text style={styles.infoText}>Barcode added</Text>
                <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  animationContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 50,
  },
  checkmark: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
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
  disabledButtonText: {
    color: '#c0c0c0',
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    height: 250,
  },
  infoText: {
    marginTop: 16,
    fontSize: 18,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QRTrackerReportProductScreen;
