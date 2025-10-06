import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type CFSuccessScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFSuccess'
>;

type Props = {
  navigation: CFSuccessScreenNavigationProp;
};

const CFSuccessScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/success.png')}/>
      <Text style={styles.title}>Sales report updated</Text>
      <Text style={styles.message}>Sales report successfully updated for the order number IE0039UE83.</Text>
      <TouchableOpacity style={styles.button} onPress={() =>
    navigation.reset({
      index: 4,
      routes: [{ name: 'CFSales' }], // 👈 this will be the only screen
    })
  }>
        <Text style={styles.buttonText}>Okay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CFSuccessScreen;
