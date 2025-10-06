
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import { successScreenMessages } from '../constants/messages';

type QRTrackerSuccessScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFSuccess'
>;

type Props = {
  navigation: QRTrackerSuccessScreenNavigationProp;
};

const QRTrackerSuccessScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../../assets/success.png')}/>
      <Text style={styles.title}>{successScreenMessages.title}</Text>
      <Text style={styles.message}>{successScreenMessages.message}</Text>
      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    const state = navigation.getState();
    const firstFive = state.routes.slice(0, 4);

    navigation.dispatch(
      CommonActions.reset({
        index: firstFive.length, 
        routes: [
          ...firstFive.map(r => ({
            name: r.name as keyof RootStackParamList,
            params: r.params,
          })),
          { name: 'CFSales' as keyof RootStackParamList },
        ],
      })
    );
  }}
>
  <Text style={styles.buttonText}>{successScreenMessages.buttonText}</Text>
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

export default QRTrackerSuccessScreen;
