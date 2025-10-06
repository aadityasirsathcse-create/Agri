
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, CFProduct } from '../../App';

type CFOrderDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFOrderDetail'
>;

type Props = {
  navigation: CFOrderDetailScreenNavigationProp;
  products: CFProduct[];
};

const CFOrderDetailScreen: React.FC<Props> = ({ navigation, products }) => {

  const allScanned = products.every(p => p.scanned === p.shippers);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <Icon name="bell-outline" size={24} />
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.orderId}>Order #IE0039UE83</Text>
        <Text style={styles.distributor}>Distributor: Netafim</Text>

        <Text style={styles.productsTitle}>Products details</Text>
        {products.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.productDetails}>
                <Text style={styles.productInfo}>Batch No. {product.batch}</Text>
                <Text style={styles.productInfo}>Pack Size {product.size}</Text>
                <Text style={styles.productInfo}>No. of shipper/Bag {product.shippers}</Text>
            </View>
            <View style={styles.scanDetails}>
              <Text>{product.scanned}/{product.shippers} scanned</Text>
              {product.scanned < product.shippers && (
                <TouchableOpacity onPress={() => navigation.navigate('CFReportProduct', { product })}>
                  <Text style={styles.reportSaleLink}>Report Sale</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      {allScanned && (
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('CFSuccess')}>
          <Text style={styles.submitButtonText}>Submit Order</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9e5ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  distributor: {
    color: 'gray',
    marginBottom: 20,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  productDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productInfo: {
    color: 'gray',
  },
  scanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportSaleLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CFOrderDetailScreen;
