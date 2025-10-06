
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';

interface QRScannerViewProps {
  onReadCode: (event: { nativeEvent: { codeStringValue: string } }) => void;
}

const QRScannerView: React.FC<QRScannerViewProps> = ({ onReadCode }) => {
  return (
    <View style={styles.container}>
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
});

export default QRScannerView;
