
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Modal, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import * as Animatable from 'react-native-animatable';

import { RootStackParamList } from '../../../../App';
import QRScanner from '../components/QRScanner';
import { addScannedCode } from '../actions/qrTrackerThunks';

type QRTrackerScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CFScan'>;
type QRTrackerScanScreenRouteProp = RouteProp<RootStackParamList, 'CFScan'>;

type Props = {
  navigation: QRTrackerScanScreenNavigationProp;
  route: QRTrackerScanScreenRouteProp;
};

type ScanState = 'scanning' | 'verifying' | 'verified';

const QRTrackerScanScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { product } = route.params;
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    if (scanState === 'verifying') {
      const timer = setTimeout(() => {
        setScanState('verified');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [scanState]);

  const handleNavigation = () => {
    setBottomSheetVisible(false);
    if (scannedCode) {
      dispatch(addScannedCode(product.id, scannedCode));
      navigation.goBack();
    }
  };

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    if (scanState === 'scanning' && event?.nativeEvent?.codeStringValue) {
      setScannedCode(event.nativeEvent.codeStringValue);
      setScanState('verifying');
      setBottomSheetVisible(true);
    }
  };

  const handleOkPress = () => {
    handleNavigation();
  };

  return (
    <View style={styles.container}>
      <QRScanner onReadCode={onReadCode} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetVisible}
        onRequestClose={() => {
          setBottomSheetVisible(false);
          setScanState('scanning');
        }}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            {scanState === 'verifying' && (
              <>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.infoText}>Verifying...</Text>
              </>
            )}
            {scanState === 'verified' && (
              <>
                <Animatable.View animation="zoomIn" duration={1500} style={styles.animationContainer}>
                  <Text style={styles.checkmark}>✓</Text>
                </Animatable.View>
                <Text style={styles.infoText}>QR is verified</Text>
                <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default QRTrackerScanScreen;
