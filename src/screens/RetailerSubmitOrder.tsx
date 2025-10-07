
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type RetailerSubmitOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RetailerSubmitOrder'>;

type Props = {
  navigation: RetailerSubmitOrderScreenNavigationProp;
};

const RetailerSubmitOrderScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <ScrollView >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order #IE0039DN30</Text>
      </View>

      <View style={styles.rewardCard}>
        <Text style={styles.rewardText}>120 Reward points will be added to your account!</Text>
      </View>

      <View style={styles.productCard}>
        <Text style={styles.productTitle}>Product 1</Text>
        <View style={styles.productDetailRow}>
          <Text style={styles.productDetailLabel}>Batch No.</Text>
          <Text style={styles.productDetailValue}>003282919</Text>
        </View>
        <View style={styles.productDetailRow}>
          <Text style={styles.productDetailLabel}>Pack Size</Text>
          <Text style={styles.productDetailValue}>1 Ltr.</Text>
        </View>
        <View style={styles.productDetailRow}>
          <Text style={styles.productDetailLabel}>No. of shipper/Bag</Text>
          <Text style={styles.productDetailValue}>5</Text>
        </View>
      </View>
    </ScrollView>
    <TouchableOpacity 
        style={styles.confirmButton}
        onPress={() => navigation.navigate('Success')}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rewardCard: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  rewardText: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: '500',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  productDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productDetailLabel: {
    fontSize: 16,
    color: '#666',
  },
  productDetailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RetailerSubmitOrderScreen;
