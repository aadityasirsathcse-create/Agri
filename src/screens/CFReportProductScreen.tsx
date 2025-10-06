import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type CFReportProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFReportProduct'
>;

type CFReportProductScreenRouteProp = RouteProp<
    RootStackParamList,
    'CFReportProduct'
  >;

type Props = {
  navigation: CFReportProductScreenNavigationProp;
  route: CFReportProductScreenRouteProp;
};

const CFReportProductScreen: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params;
  const [barcode, setBarcode] = useState('');

  const progress = product.shippers > 0 ? (product.scanned / product.shippers) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Report Product</Text>
            <Icon name="bell-outline" size={24} />
        </View>
      <ScrollView style={styles.content}>
        <Text style={styles.orderId}>Order #IE0039UE83</Text>
        
        <View style={styles.progressContainer}>
          <Text>Item scanned</Text>
          <Text>{product.scanned}/{product.shippers}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>

        <View style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.productDetails}>
                <Text style={styles.productInfo}>Batch No. {product.batch}</Text>
                <Text style={styles.productInfo}>Pack Size {product.size}</Text>
                <Text style={styles.productInfo}>No. of shipper/Bag {product.shippers}</Text>
            </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Barcode..."
          value={barcode}
          onChangeText={setBarcode}
        />

        <Text style={styles.orText}>(OR)</Text>

        <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('CFScan')}>
          <Icon name="camera-outline" size={40} color="#4CAF50" />
          <Text style={styles.scanText}>Scan using Camera</Text>
        </TouchableOpacity>

        
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('CFSubmitOrder')}>
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
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginBottom: 20,
    },
    progress: {
        height: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    productDetails: {
        marginBottom: 15,
    },
    productInfo: {
        color: 'gray',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
    },
    orText: {
        textAlign: 'center',
        color: 'gray',
        marginBottom: 20,
    },
    scanButton: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scanText: {
        marginTop: 5,
        color: '#4CAF50',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        alignItems: 'center',
        margin: 20,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CFReportProductScreen;
