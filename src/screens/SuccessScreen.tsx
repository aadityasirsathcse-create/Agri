
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type SuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Success'>;

type Props = {
  navigation: SuccessScreenNavigationProp;
};

const SuccessScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/success.png')} style={styles.successIcon} />
      <Text style={styles.title}>Usage report updated</Text>
      <Text style={styles.subtitle}>
        Usage report successfully updated for the order number IE0039DN30.
      </Text>
      <TouchableOpacity onPress={() => navigation.pop(4)} style={styles.button}>
        <Text style={styles.buttonText}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessScreen;
