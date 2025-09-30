import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetail'>;

type OrderDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderDetail'
>;

type Props = {
  route: OrderDetailScreenRouteProp;
  navigation: OrderDetailScreenNavigationProp;
};

const order = {
  id: '0007288877',
  lastUpdate: '12 Mar, 2023',
  status: 'Delivered',
  items: [
    { name: 'Probor (500g)', quantity: 1, price: 899, image: require('../assets/product.png') },
    { name: 'EMERALD Z+ (50ml)', quantity: 2, price: 650, image: require('../assets/product.png') },
    { name: 'Probor (500g)', quantity: 1, price: 899, image: require('../assets/product.png') },
    { name: 'EMERALD Z+ (50ml)', quantity: 2, price: 650, image: require('../assets/product.png') },
    { name: 'Probor (500g)', quantity: 1, price: 899, image: require('../assets/product.png') },
    { name: 'EMERALD Z+ (50ml)', quantity: 2, price: 650, image: require('../assets/product.png') },
  ],
};

const OrderDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order No. {orderId}</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
            <Icon name="magnify" size={24} />
            <Icon name="bell-outline" size={24} />
        </View>
      </View>

      <ScrollView>
        <View style={styles.statusSection}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Icon name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.statusText}>{order.status}</Text>
                <Text style={styles.statusDate}>Last updated on {order.lastUpdate}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="download" size={20} color="#4CAF50" />
                    <Text style={styles.actionText}>Download Invoice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="alert-circle-outline" size={20} color="#FF6347" />
                    <Text style={[styles.actionText, {color: '#FF6347'}]}>Report Order</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.acknowledgementButton} onPress={() => navigation.navigate('Acknowledgement', { orderId: order.id })}>
                <Icon name="pencil" size={20} color="#4CAF50" />
                <Text style={[styles.actionText]}>Submit Acknowledgement</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity : {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingVertical: 40,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statusDate: {
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionText: {
    marginLeft: 5,
    color: '#4CAF50'
  },
  acknowledgementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  summarySection: {
    padding: 16,
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemQuantity: {
    color: 'gray',
  },
  itemPrice: {
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;
