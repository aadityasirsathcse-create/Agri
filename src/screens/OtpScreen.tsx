import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Otp: { mobileNumber: string };
};

type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;
type OtpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;

type Props = {
  route: OtpScreenRouteProp;
  navigation: OtpScreenNavigationProp;
};

const OtpScreen: React.FC<Props> = ({ route, navigation }) => {
  const { mobileNumber } = route.params;
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text.length === 1 && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E9F5E9" />
      <View style={styles.upperContainer}>
        <View style={styles.imagePlaceholder}>
          <Image source={require('../assets/farmer.png')} style={styles.image} />
        </View>
        <Text style={styles.title}>Friendly to Nature</Text>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.loginTitle}>Login to your account</Text>
        <Text style={styles.otpSentText}>
          OTP has been successfully sent to the below number
        </Text>
        <View style={styles.mobileNumberContainer}>
          <Text style={styles.mobileNumber}>{mobileNumber}</Text>
          <TouchableOpacity>
            {/* Replace with an actual pencil icon */}
            <Text style={styles.editIcon}> ✎</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>Enter OTP</Text>
        <View style={styles.otpInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={text => handleOtpChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              value={digit}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
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
    backgroundColor: '#E9F5E9',
  },
  upperContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A5D6A7',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
    image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  otpSentText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  mobileNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mobileNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  editIcon: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 5,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: 40,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
  },
  resendContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  resendText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#66BB6A',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
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

export default OtpScreen;
