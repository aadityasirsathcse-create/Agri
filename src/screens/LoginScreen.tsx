import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Otp: { mobileNumber: string };
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = () => {
    if (mobileNumber.length === 10) {
      navigation.navigate('Otp', { mobileNumber });
    } else {
      alert('Please enter a valid 10-digit mobile number.');
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
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="10 digit mobile Number here..."
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
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
    backgroundColor: '#E9F5E9',
  },
  upperContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    // backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
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
    // textDecorationLine: 'underline', // As per the image, it's not underlined
  },
});

export default LoginScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

