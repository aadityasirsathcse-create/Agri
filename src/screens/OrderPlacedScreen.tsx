import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type OrderPlacedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderPlaced'
>;

type Props = {
  navigation: OrderPlacedScreenNavigationProp;
};

const OrderPlacedScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon name="check-decagram" size={100} color="#4CAF50" />
        <Text style={styles.title}>Order Placed Successfully...</Text>
        <Text style={styles.subtitle}>Your order has been placed successfully. You can track your order status in order details.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.pop(4)}>
          <Text style={styles.outlineButtonText}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.solidButton}  onPress={() => navigation.navigate('OrdersHistory')}>
          <Text style={styles.solidButtonText}>View Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  outlineButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 10,
  },
  outlineButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  solidButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 10,
  },
  solidButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderPlacedScreen;
