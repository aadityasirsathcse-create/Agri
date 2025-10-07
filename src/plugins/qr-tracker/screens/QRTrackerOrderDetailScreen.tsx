
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootStackParamList, CFProduct } from '../../../../App'; // Adjust if needed
import { QRTrackerState } from '../reducers/qrTrackerReducer';
import { orderDetailMessages } from '../constants/messages';
import OrderDetailHeader from '../components/OrderDetailHeader';
import ProductDetailCard from '../components/ProductDetailCard';
import { submitOrder, scan } from '../actions/qrTrackerThunks';

type QRTrackerOrderDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFOrderDetail'
>;

type Props = {
  navigation: QRTrackerOrderDetailScreenNavigationProp;
};

const QRTrackerOrderDetailScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { products } = useSelector((state: { qrTracker: QRTrackerState }) => state.qrTracker);

  const allScanned = products.every((p: CFProduct) => p.scanned === p.shippers);

  const handleSubmitOrder = () => {
    dispatch(submitOrder(navigation));
  };

  const handleReportSale = (product: CFProduct) => {
    navigation.navigate('CFReportProduct', { product });
  }

  return (
    <SafeAreaView style={styles.container}>
      <OrderDetailHeader title={orderDetailMessages.headerTitle} onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.orderId}>{orderDetailMessages.orderId}</Text>
        <Text style={styles.distributor}>{orderDetailMessages.distributor}</Text>

        <Text style={styles.productsTitle}>{orderDetailMessages.productsTitle}</Text>
        {products.map((product: CFProduct) => (
            <ProductDetailCard product={product} onReportSale={() => handleReportSale(product)} />
        ))}
      </ScrollView>
      {allScanned && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOrder}>
          <Text style={styles.submitButtonText}>{orderDetailMessages.submitButtonText}</Text>
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

export default QRTrackerOrderDetailScreen;
