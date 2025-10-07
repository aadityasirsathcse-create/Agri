
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import { RootStackParamList } from '../../App';

type RetailerScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RetailerScan'>;

type Props = {
  navigation: RetailerScanScreenNavigationProp;
};

type ScanState = 'scanning' | 'verifying' | 'verified';

const RetailerScanScreen: React.FC<Props> = ({ navigation }) => {
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    if (scanState === 'verifying') {
      const timer = setTimeout(() => {
        setScanState('verified');
      }, 1000); // Simulate verification time
      return () => clearTimeout(timer);
    }
  }, [scanState]);

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    if (scanState === 'scanning' && event?.nativeEvent?.codeStringValue) {
      console.log('Scanned QR Code:', event.nativeEvent.codeStringValue);
      setScanState('verifying');
      setBottomSheetVisible(true);
    }
  };

  const handleOkPress = () => {
    setBottomSheetVisible(false);
    setScanState('scanning');
    navigation.navigate('RetailerSubmitOrder');
  };

  return (
    <View style={styles.container}>
      <Camera
        cameraType={CameraType.Back}
        scanBarcode={true}
        showFrame={true}
        laserColor="red"
        frameColor="white"
        onReadCode={onReadCode}
        style={styles.camera}
      />
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
                <Animatable.View animation="zoomIn" duration={500} style={styles.animationContainer}>
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
  camera: {
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
});

export default RetailerScanScreen;
