import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type CheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

type Props = {
  navigation: CheckoutScreenNavigationProp;
};

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedAddress, setSelectedAddress] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Choose Address</Text>
          <View style={styles.addressContainer}>
            <TouchableOpacity style={styles.addressOption} onPress={() => setSelectedAddress(1)}>
              <Icon name={selectedAddress === 1 ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#4CAF50" />
              <Text style={styles.addressText}>#916, Gera's imperium rise, hinjewadi phase 2, Pune, Maharashtra - 400057</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addressOption} onPress={() => setSelectedAddress(2)}>
              <Icon name={selectedAddress === 2 ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#4CAF50" />
              <Text style={styles.addressText}>#916, Gera's imperium rise, hinjewadi phase 2, Pune, Maharashtra - 400057</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addAddress}>
              <Icon name="plus-circle-outline" size={20} color="#4CAF50" />
              <Text style={styles.addAddressText}>Add new address</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Payment Options</Text>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentOption}>
              <Icon name='radiobox-marked' size={24} color="#4CAF50" />
              <Text style={styles.paymentText}>REAP Wallet</Text>
              <Icon name="reload" size={20} color="#4CAF50" style={{ marginLeft: 'auto' }} />
            </View>
            <Text style={styles.balanceText}>Current Balance : XXXXXX</Text>
          </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate('PaymentProcessing')}>
            <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FEF9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addressContainer: {
        marginBottom: 20,
    },
    addressOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    addressText: {
        marginLeft: 10,
        fontSize: 14,
    },
    addAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addAddressText: {
        marginLeft: 5,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    paymentContainer: {
        marginBottom: 20,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    paymentText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    balanceText: {
        marginTop: 5,
        marginLeft: 35,
        color: 'gray',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#fff',
    },
    proceedButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;
