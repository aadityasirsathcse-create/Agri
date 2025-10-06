
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CFProduct } from '../../../../App'; // Adjust path as needed

interface ProductDetailCardProps {
  product: CFProduct;
  onReportSale: () => void;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product, onReportSale }) => {
  return (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.productDetails}>
        <Text style={styles.productInfo}>Batch No. {product.batch}</Text>
        <Text style={styles.productInfo}>Pack Size {product.size}</Text>
        <Text style={styles.productInfo}>No. of shipper/Bag {product.shippers}</Text>
      </View>
      <View style={styles.scanDetails}>
        <Text>{product.scanned}/{product.shippers} scanned</Text>
        {product.scanned < product.shippers && (
          <TouchableOpacity onPress={onReportSale}>
            <Text style={styles.reportSaleLink}>Report Sale</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProductDetailCard;
