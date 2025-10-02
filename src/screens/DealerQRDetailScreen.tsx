import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type DealerQRDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DealerQRDetail'
>;

type Props = {
  navigation: DealerQRDetailScreenNavigationProp;
};

const DealerQRDetailScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QR Details</Text>
          <Icon name="bell-outline" size={24} />
        </View>
      <ScrollView style={styles.content}>
        <Text style={styles.orderId}>Order #IE0039DN30</Text>
        <View style={styles.reportTypeContainer}>
          <Text style={styles.reportType}>Inventory Report</Text>
        </View>

        <View style={styles.rewardContainer}>
          <Icon name="trophy-award" size={30} color="green" />
          <Text style={styles.rewardText}>120 Reward points will be added to your account!</Text>
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.productTitle}>Product 1</Text>
          <View style={styles.productDetailRow}>
            <Text>Batch No.</Text>
            <Text>003282919</Text>
          </View>
          <View style={styles.productDetailRow}>
            <Text>Pack Size</Text>
            <Text>1 Ltr.</Text>
          </View>
          <View style={styles.productDetailRow}>
            <Text>No. of shipper/Bag</Text>
            <Text>5</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('DealerSuccess')}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9e5ff',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: 'bold'
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportTypeContainer: {
    marginBottom: 20,
  },
  reportType: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 14,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4EDDA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  rewardText: {
    marginLeft: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  productDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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

export default DealerQRDetailScreen;
