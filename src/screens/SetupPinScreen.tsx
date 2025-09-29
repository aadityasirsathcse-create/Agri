import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type SetupPinScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetupPin'>;

type Props = {
  navigation: SetupPinScreenNavigationProp;
};

const SetupPinScreen: React.FC<Props> = ({ navigation }) => {
  const [pin, setPin] = useState(Array(4).fill(''));
  const [confirmPin, setConfirmPin] = useState(Array(4).fill(''));
  const pinInputRefs = useRef<(TextInput | null)[]>([]);
  const confirmPinInputRefs = useRef<(TextInput | null)[]>([]);

  const handlePinChange = (text: string, index: number) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text.length === 1 && index < pin.length - 1) {
        pinInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleConfirmPinChange = (text: string, index: number) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newConfirmPin = [...confirmPin];
      newConfirmPin[index] = text;
      setConfirmPin(newConfirmPin);

      if (text.length === 1 && index < confirmPin.length - 1) {
        confirmPinInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePinKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmPinKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !confirmPin[index] && index > 0) {
      confirmPinInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const isPinComplete = pin.every(digit => digit !== '');
    const isConfirmPinComplete = confirmPin.every(digit => digit !== '');
    if (isPinComplete && isConfirmPinComplete) {
      if (pin.join('') === confirmPin.join('')) {
        // PINs match, proceed with navigation
        navigation.navigate('Loyalty');
      } else {
        alert('PINs do not match.');
      }
    } else {
      alert('Please fill out both PIN and Confirm PIN fields.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.content}>
        <Text style={styles.title}>Setup PIN</Text>
        <Text style={styles.subtitle}>OTP has been successfully sent to the below number</Text>

        <Text style={styles.inputLabel}>PIN</Text>
        <View style={styles.pinInputContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                pinInputRefs.current[index] = ref;
              }}
              style={styles.pinInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handlePinChange(text, index)}
              onKeyPress={(e) => handlePinKeyPress(e, index)}
              value={digit ? '*' : ''} // Show asterisk if there's a digit
              secureTextEntry={true} // Hides the actual input
            />
          ))}
        </View>

        <Text style={styles.inputLabel}>Confirm PIN</Text>
        <View style={styles.pinInputContainer}>
          {confirmPin.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                confirmPinInputRefs.current[index] = ref;
              }}
              style={styles.pinInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleConfirmPinChange(text, index)}
              onKeyPress={(e) => handleConfirmPinKeyPress(e, index)}
              value={digit ? '*' : ''} // Show asterisk if there's a digit
              secureTextEntry={true} // Hides the actual input
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By login lorem ipsum sit amet dolor{' '}
          <Text style={styles.linkText}>terms & conditions</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 60,
    height: 60,
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
  },
  button: {
    backgroundColor: '#66BB6A',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
  linkText: {
    color: '#4CAF50',
  },
});

export default SetupPinScreen;


function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

