import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type RetailerHomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RetailerHome'
>;

type Props = {
  navigation: RetailerHomeScreenNavigationProp;
};

const RetailerHomeScreen: React.FC<Props> = ({ navigation }) => {
  const orders = ['IE0039DN30', 'IE0039DN30', 'IE0039DN30'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerName}>Harish Ramu</Text>
        <Text style={styles.headerRole}>Retailer</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.historyTitle}>Report History</Text>
        {orders.map((orderId, index) => (
          <View key={index} style={styles.orderCard}>
            <Text style={styles.orderId}>Order #{orderId}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RetailerSubmitOrder')}
            >
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('RetailerScan')}
      >
        <Text style={styles.scanButtonText}>Start Scanning</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#E9F5E9',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRole: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderId: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 24,
    color: '#4CAF50',
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RetailerHomeScreen;
