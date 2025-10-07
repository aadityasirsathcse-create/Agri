import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type DealerScanScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DealerScan'
>;

type Props = {
  navigation: DealerScanScreenNavigationProp;
};

const DealerScanScreen: React.FC<Props> = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    if (event?.nativeEvent?.codeStringValue) {
      setIsScanning(false);
      setIsLoading(true);
      console.log('Scanned QR Code:', event.nativeEvent.codeStringValue);

      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('DealerQRDetail');
      }, 1000);
    }
  };

  const handleScanAgain = () => {
    setIsScanning(true);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.infoText}>Processing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <View style={styles.cameraContainer}>
          <Camera
            cameraType={CameraType.Back}
            scanBarcode={true}
            showFrame={true}
            laserColor="red"
            frameColor="white"
            onReadCode={onReadCode}
            style={styles.camera}
          />
        </View>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.infoText}>Scan completed!</Text>
          <TouchableOpacity
            onPress={handleScanAgain}
            style={styles.buttonTouchable}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  infoText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default DealerScanScreen;
