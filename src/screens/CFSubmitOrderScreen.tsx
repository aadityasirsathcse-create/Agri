import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type CFSubmitOrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFSubmitOrder'
>;

type Props = {
  navigation: CFSubmitOrderScreenNavigationProp;
};

const products = [
  { id: '1', name: 'Product 1', batch: '003282919', size: '1 Ltr.', shippers: 5, scanned: 5 },
  { id: '2', name: 'Product 2', batch: '003282919', size: '500 ml', shippers: 2, scanned: 2 },
  { id: '3', name: 'Product 3', batch: '003282919', size: '1 Ltr.', shippers: 5, scanned: 5 },
  { id: '4', name: 'Product 4', batch: '003282919', size: '1 Ltr.', shippers: 5, scanned: 5 },
];

const CFSubmitOrderScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order details</Text>
            <Icon name="bell-outline" size={24} />
        </View>
      <ScrollView style={styles.content}>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderId}>Order #IE0039UE83</Text>
          <View style={styles.customerInfo}>
            <Icon name="account-circle-outline" size={20} color="gray" />
            <Text style={styles.customerText}>Ajay Kumar</Text>
            <Text style={styles.customerText}>SAP code: 1000383</Text>
            <Text style={styles.customerText}>Order date: 14 Sept 2025</Text>
          </View>
        </View>

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
                <Icon name="check-circle" size={24} color="#4CAF50" />
                <Text>{product.scanned}/{product.shippers} scanned</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('CFSuccess')}>
          <Text style={styles.submitButtonText}>Submit Order</Text>
      </TouchableOpacity>
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
        paddingVertical: 40,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    orderDetailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    customerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    customerText: {
        color: 'gray',
    },
    productsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    productInfo: {
        color: 'gray',
    },
    scanDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
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

export default CFSubmitOrderScreen;
