import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type CFScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CFScan'>;
type CFScanScreenRouteProp = RouteProp<RootStackParamList, 'CFScan'>;

type Props = {
  navigation: CFScanScreenNavigationProp;
  route: CFScanScreenRouteProp;
};

const CFScanScreen: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params;
  const cameraRef = useRef<Camera>(null);

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
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            cameraType={CameraType.Back}
            scanBarcode={true}
            showFrame={true}
            laserColor="red"
            frameColor="white"
            onReadCode={onReadCode}
            style={styles.camera}
          />
        </View>
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
});

export default CFScanScreen;
