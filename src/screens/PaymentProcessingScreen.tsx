import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type PaymentProcessingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PaymentProcessing'
>;

type Props = {
  navigation: PaymentProcessingScreenNavigationProp;
};

const PaymentProcessingScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OrderPlaced');
    }, 3000); // Navigate after 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
        <Image source={require('../assets/processing.png')} style={styles.image} />
        <Text style={styles.title}>Processing Payment...</Text>
        <Text style={styles.subtitle}>Order will be placed after successful payment.</Text>
        <Text style={styles.subtitle}>Please stay on the page.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default PaymentProcessingScreen;
