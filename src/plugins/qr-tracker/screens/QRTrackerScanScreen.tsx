
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Modal, TouchableOpacity } from 'react-native';
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

type ScanState = 'scanning' | 'verifying' | 'verified';

const QRTrackerScanScreen: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params;
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (scanState === 'verifying') {
      const timer = setTimeout(() => {
        setScanState('verified');
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (scanState === 'verified') {
      navigationTimer.current = setTimeout(() => {
        handleNavigation();
      }, 3000);
      return () => {
        if (navigationTimer.current) {
          clearTimeout(navigationTimer.current);
        }
      };
    }
  }, [scanState]);

  const handleNavigation = () => {
    if (navigationTimer.current) {
      clearTimeout(navigationTimer.current);
    }
    setBottomSheetVisible(false);
    if (scannedCode) {
      navigation.navigate('CFReportProduct', {
        product: product,
        scannedBarcode: scannedCode,
        timestamp: new Date().getTime(),
      });
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
                <Text style={styles.infoText}>QR is varified</Text>
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
    height: 200,
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
