import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type RetailerScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RetailerScan'>;

type Props = {
  navigation: RetailerScanScreenNavigationProp;
};

const RetailerScanScreen: React.FC<Props> = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(true);

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    if (event?.nativeEvent?.codeStringValue) {
      setIsScanning(false); // stop scanning
      console.log('Scanned QR Code:', event.nativeEvent.codeStringValue);
      Alert.alert('Scanned!', event.nativeEvent.codeStringValue, [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('RetailerSubmitOrder') 
        },
      ]);
    }
  };

  const handleScanAgain = () => {
    setIsScanning(true);
  };

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
    flex: 1 
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
    backgroundColor: 'black' 
  },
  infoText: { 
    color: '#fff', 
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 16 
  },
  buttonText: { 
    fontSize: 18, 
    color: 'rgb(0,122,255)' 
  },
  buttonTouchable: { 
    padding: 12, 
    backgroundColor: '#fff', 
    borderRadius: 8 
  },
});

export default RetailerScanScreen;